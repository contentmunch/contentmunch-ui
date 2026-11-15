import {afterEach, describe, expect, it, vi} from 'vitest';
import {createPasskey, fromBase64Url, getPasskey, PasskeyCancelled, passkeysSupported, toBase64Url} from './webauthn.ts';

const buffer = (...bytes: number[]) => new Uint8Array(bytes).buffer;
const asBytes = (b: ArrayBuffer) => Array.from(new Uint8Array(b));

const setCredentials = (value: unknown) =>
    Object.defineProperty(navigator, 'credentials', {value, configurable: true});

afterEach(() => {
    setCredentials(undefined);
    delete (window as unknown as Record<string, unknown>).PublicKeyCredential;
});

describe('base64url', () => {
    it.each([[[]], [[0]], [[251, 255, 254]], [[1, 2, 3, 4, 5]], [Array.from({length: 40}, (_, i) => i * 6)]])('round trips %j', (bytes) => {
        expect(asBytes(fromBase64Url(toBase64Url(buffer(...bytes))))).toEqual(bytes);
    });

    it('uses the url alphabet and no padding', () => {
        expect(toBase64Url(buffer(251, 255, 254))).toBe('-__-');
        expect(toBase64Url(buffer(1))).toBe('AQ');
        expect(asBytes(fromBase64Url('AQ'))).toEqual([1]);
    });
});

describe('passkeysSupported', () => {
    it('is false without the browser API and true with it', () => {
        expect(passkeysSupported()).toBe(false);
        (window as unknown as Record<string, unknown>).PublicKeyCredential = function () {};
        setCredentials({});
        expect(passkeysSupported()).toBe(true);
    });
});

const creationOptions = {
    publicKey: {
        challenge: 'AQID', rp: {id: 'x.test', name: 'X'},
        user: {id: 'BAUG', name: 'asik', displayName: 'Asik'},
        excludeCredentials: [{type: 'public-key', id: 'Bw'}],
    },
};

describe('createPasskey', () => {
    it('hands the device the options as bytes and returns what it made as text', async () => {
        const create = vi.fn().mockResolvedValue({
            type: 'public-key', id: 'abc', rawId: buffer(9, 9),
            authenticatorAttachment: 'platform',
            response: {clientDataJSON: buffer(1), attestationObject: buffer(2), getTransports: () => ['internal']},
            getClientExtensionResults: () => ({}),
        });
        setCredentials({create});

        const result = await createPasskey(creationOptions as never);

        const sent = create.mock.calls[0][0].publicKey;
        expect(asBytes(sent.challenge)).toEqual([1, 2, 3]);
        expect(asBytes(sent.user.id)).toEqual([4, 5, 6]);
        expect(asBytes(sent.excludeCredentials[0].id)).toEqual([7]);
        expect(result).toMatchObject({
            type: 'public-key', id: 'abc', rawId: 'CQk',
            response: {clientDataJSON: 'AQ', attestationObject: 'Ag', transports: ['internal']},
        });
    });

    it.each([
        ['the person closes the prompt', () => Promise.reject(new DOMException('no', 'NotAllowedError'))],
        ['it times out', () => Promise.reject(new DOMException('slow', 'AbortError'))],
        ['nothing comes back', () => Promise.resolve(null)],
    ])('is cancelled when %s', async (_name, outcome) => {
        setCredentials({create: vi.fn(outcome)});

        await expect(createPasskey(creationOptions as never)).rejects.toBeInstanceOf(PasskeyCancelled);
    });

    it('lets any other failure through', async () => {
        setCredentials({create: vi.fn().mockRejectedValue(new Error('boom'))});

        await expect(createPasskey(creationOptions as never)).rejects.toThrow('boom');
    });
});

describe('getPasskey', () => {
    it('asks with the challenge and the allowed passkeys as bytes, and returns the signed answer as text', async () => {
        const get = vi.fn().mockResolvedValue({
            type: 'public-key', id: 'abc', rawId: buffer(9),
            response: {clientDataJSON: buffer(1), authenticatorData: buffer(2), signature: buffer(3), userHandle: buffer(4)},
            getClientExtensionResults: () => ({}),
        });
        setCredentials({get});

        const result = await getPasskey({publicKey: {challenge: 'AQID', allowCredentials: [{type: 'public-key', id: 'Bw'}]}} as never);

        const sent = get.mock.calls[0][0].publicKey;
        expect(asBytes(sent.challenge)).toEqual([1, 2, 3]);
        expect(asBytes(sent.allowCredentials[0].id)).toEqual([7]);
        expect(result).toMatchObject({response: {authenticatorData: 'Ag', signature: 'Aw', userHandle: 'BA'}});
    });

    it('leaves the user handle out when the device gives none, and is cancelled when closed', async () => {
        setCredentials({get: vi.fn().mockResolvedValue({
            type: 'public-key', id: 'a', rawId: buffer(1),
            response: {clientDataJSON: buffer(1), authenticatorData: buffer(2), signature: buffer(3), userHandle: null},
            getClientExtensionResults: () => ({}),
        })});
        expect(((await getPasskey({publicKey: {challenge: 'AQ'}} as never)) as { response: { userHandle?: string } }).response.userHandle).toBeUndefined();

        setCredentials({get: vi.fn().mockRejectedValue(new DOMException('no', 'NotAllowedError'))});
        await expect(getPasskey({publicKey: {challenge: 'AQ'}} as never)).rejects.toBeInstanceOf(PasskeyCancelled);
    });
});
