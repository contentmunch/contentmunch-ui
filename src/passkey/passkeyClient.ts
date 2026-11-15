import {createPasskey, getPasskey, type ServerOptions} from "./webauthn.ts";

/** The few calls the client makes, so any app can hand over its own HTTP client (an axios instance already pointed at its API). */
export interface PasskeyHttp {
    get<T = unknown>(url: string): Promise<{ data: T }>;
    post<T = unknown>(url: string, body?: unknown): Promise<{ data: T }>;
    delete(url: string): Promise<unknown>;
}

export interface PasskeySummary {
    id: string;
    name: string;
    createdAt: string;
    lastUsedAt?: string | null;
    /** The domain the passkey belongs to, where it can be used. */
    rpId?: string;
}

interface Started {
    ceremonyId: string;
    options: ServerOptions;
}

/** What the person can do with passkeys, against the contentmunch auth starter's `/api/auth/passkeys` endpoints. */
export interface PasskeyClient {
    /** Whether the server has passkeys switched on (a screen offers only what works). */
    enabled(): Promise<boolean>;
    list(): Promise<PasskeySummary[]>;
    remove(id: string): Promise<void>;
    /** Makes a passkey on this device and registers it; the device asks the person to prove who they are. */
    register(name: string): Promise<PasskeySummary>;
    /** Signs in with a passkey, no username to type. The server sets the session cookies; the caller then reads who signed in. */
    signIn(): Promise<void>;
}

/** @param http the app's own HTTP client, with the API's address and credentials already set. Paths are relative to `/api/`. */
export const createPasskeyClient = (http: PasskeyHttp): PasskeyClient => ({
    enabled: async () => {
        try {
            return !!(await http.get<{ passkeys?: boolean }>("auth/features")).data.passkeys;
        } catch {
            return false;
        }
    },
    list: async () => (await http.get<PasskeySummary[]>("auth/passkeys")).data,
    remove: async (id) => {
        await http.delete(`auth/passkeys/${encodeURIComponent(id)}`);
    },
    register: async (name) => {
        const started = (await http.post<Started>("auth/passkeys/register/start", {name})).data;
        const credential = await createPasskey(started.options);
        return (await http.post<PasskeySummary>("auth/passkeys/register/finish", {ceremonyId: started.ceremonyId, name, credential})).data;
    },
    signIn: async () => {
        const started = (await http.post<Started>("auth/passkeys/sign-in/start")).data;
        const credential = await getPasskey(started.options);
        await http.post("auth/passkeys/sign-in/finish", {ceremonyId: started.ceremonyId, credential});
    },
});
