import {afterEach, describe, expect, it, vi} from 'vitest';
import {createPasskeyClient, type PasskeyHttp} from './passkeyClient.ts';

vi.mock('./webauthn.ts', async (original) => ({
    ...(await original<typeof import('./webauthn.ts')>()),
    createPasskey: vi.fn(async () => ({id: 'made'})),
    getPasskey: vi.fn(async () => ({id: 'got'})),
}));

const http = (over: Partial<PasskeyHttp> = {}): PasskeyHttp => ({
    get: vi.fn(async () => ({data: {}})) as unknown as PasskeyHttp['get'],
    post: vi.fn(async () => ({data: {}})) as unknown as PasskeyHttp['post'],
    delete: vi.fn(async () => ({})),
    ...over,
});

afterEach(() => vi.clearAllMocks());

describe('createPasskeyClient', () => {
    it('is enabled only when the server says passkeys are on, and not when the question fails', async () => {
        expect(await createPasskeyClient(http({get: (async () => ({data: {passkeys: true}})) as never})).enabled()).toBe(true);
        expect(await createPasskeyClient(http({get: (async () => ({data: {passkeys: false}})) as never})).enabled()).toBe(false);
        expect(await createPasskeyClient(http({get: (async () => { throw new Error('down'); }) as never})).enabled()).toBe(false);
    });

    it('lists and removes passkeys at the starter paths, escaping the id', async () => {
        const client = http({get: (async () => ({data: [{id: 'a', name: 'Mac', createdAt: 'x'}]})) as never});

        expect(await createPasskeyClient(client).list()).toHaveLength(1);
        await createPasskeyClient(client).remove('a/b+c');

        expect(client.delete).toHaveBeenCalledWith('auth/passkeys/a%2Fb%2Bc');
    });

    it('registers in two steps: start, then finish with what the device made', async () => {
        const post = vi.fn(async (url: string) => url.endsWith('/start')
            ? {data: {ceremonyId: 'c1', options: {publicKey: {challenge: 'x'}}}}
            : {data: {id: 'new', name: 'Mac', createdAt: 'now'}});
        const client = createPasskeyClient(http({post: post as never}));

        const made = await client.register('Mac');

        expect(post).toHaveBeenNthCalledWith(1, 'auth/passkeys/register/start', {name: 'Mac'});
        expect(post).toHaveBeenNthCalledWith(2, 'auth/passkeys/register/finish', {ceremonyId: 'c1', name: 'Mac', credential: {id: 'made'}});
        expect(made.id).toBe('new');
    });

    it('signs in in two steps with the answer the device gives', async () => {
        const post = vi.fn(async (url: string) => ({data: url.endsWith('/start') ? {ceremonyId: 'c2', options: {publicKey: {challenge: 'y'}}} : {}}));

        await createPasskeyClient(http({post: post as never})).signIn();

        expect(post).toHaveBeenNthCalledWith(1, 'auth/passkeys/sign-in/start');
        expect(post).toHaveBeenNthCalledWith(2, 'auth/passkeys/sign-in/finish', {ceremonyId: 'c2', credential: {id: 'got'}});
    });
});
