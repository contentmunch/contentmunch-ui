/**
 * The browser half of passkeys. The server speaks JSON with base64url text where the browser's API wants byte buffers, so
 * the options are converted on the way in and the device's answer on the way out.
 */

export class PasskeyCancelled extends Error {
    constructor() {
        super("The passkey prompt was closed or timed out.");
        this.name = "PasskeyCancelled";
    }
}

/** Whether this browser can create and use passkeys at all. */
export const passkeysSupported = (): boolean =>
    typeof window !== "undefined" && "PublicKeyCredential" in window && !!navigator.credentials;

export const fromBase64Url = (text: string): ArrayBuffer => {
    const padded = text.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(text.length / 4) * 4, "=");
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes.buffer;
};

export const toBase64Url = (buffer: ArrayBuffer): string => {
    let binary = "";
    new Uint8Array(buffer).forEach(byte => (binary += String.fromCharCode(byte)));
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

interface Descriptor {
    id: string;
    type: string;
    transports?: string[];
}

/** What the server sends for navigator.credentials.create / get: {publicKey: {...}}. */
export interface ServerOptions {
    publicKey: Record<string, unknown> & {
        challenge: string;
        user?: { id: string; name: string; displayName: string };
        excludeCredentials?: Descriptor[];
        allowCredentials?: Descriptor[];
    };
}

const descriptors = (list?: Descriptor[]) =>
    list?.map(d => ({...d, id: fromBase64Url(d.id)})) as PublicKeyCredentialDescriptor[] | undefined;

const attempt = async <T>(call: () => Promise<T | null>): Promise<T> => {
    try {
        const result = await call();
        if (!result) throw new PasskeyCancelled();
        return result;
    } catch (error) {
        // the person closed the prompt, or it timed out
        if (error instanceof DOMException && (error.name === "NotAllowedError" || error.name === "AbortError")) {
            throw new PasskeyCancelled();
        }
        throw error;
    }
};

/** Asks the device to make a passkey. The answer is the JSON the server expects back. */
export const createPasskey = async (options: ServerOptions): Promise<object> => {
    const {publicKey} = options;
    const credential = await attempt(() => navigator.credentials.create({
        publicKey: {
            ...publicKey,
            challenge: fromBase64Url(publicKey.challenge),
            user: {...publicKey.user!, id: fromBase64Url(publicKey.user!.id)},
            excludeCredentials: descriptors(publicKey.excludeCredentials),
        } as unknown as PublicKeyCredentialCreationOptions,
    })) as PublicKeyCredential;
    const response = credential.response as AuthenticatorAttestationResponse;
    return {
        type: credential.type,
        id: credential.id,
        rawId: toBase64Url(credential.rawId),
        authenticatorAttachment: credential.authenticatorAttachment ?? undefined,
        response: {
            clientDataJSON: toBase64Url(response.clientDataJSON),
            attestationObject: toBase64Url(response.attestationObject),
            transports: response.getTransports?.() ?? [],
        },
        clientExtensionResults: credential.getClientExtensionResults(),
    };
};

/** Asks the device to prove it holds a passkey (the device checks the person: fingerprint, face or PIN). */
export const getPasskey = async (options: ServerOptions): Promise<object> => {
    const {publicKey} = options;
    const credential = await attempt(() => navigator.credentials.get({
        publicKey: {
            ...publicKey,
            challenge: fromBase64Url(publicKey.challenge),
            allowCredentials: descriptors(publicKey.allowCredentials),
        } as unknown as PublicKeyCredentialRequestOptions,
    })) as PublicKeyCredential;
    const response = credential.response as AuthenticatorAssertionResponse;
    return {
        type: credential.type,
        id: credential.id,
        rawId: toBase64Url(credential.rawId),
        authenticatorAttachment: credential.authenticatorAttachment ?? undefined,
        response: {
            clientDataJSON: toBase64Url(response.clientDataJSON),
            authenticatorData: toBase64Url(response.authenticatorData),
            signature: toBase64Url(response.signature),
            userHandle: response.userHandle ? toBase64Url(response.userHandle) : undefined,
        },
        clientExtensionResults: credential.getClientExtensionResults(),
    };
};
