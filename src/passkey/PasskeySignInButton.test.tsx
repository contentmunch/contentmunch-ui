import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {PasskeySignInButton} from './PasskeySignInButton.tsx';
import {PasskeyCancelled} from './webauthn.ts';
import type {PasskeyClient} from './passkeyClient.ts';

const supported = () => Object.defineProperty(window, 'PublicKeyCredential', {value: class {}, configurable: true});

const client = (over: Partial<PasskeyClient> = {}): PasskeyClient => ({
    enabled: vi.fn(async () => true), list: vi.fn(), remove: vi.fn(), register: vi.fn(), signIn: vi.fn(async () => undefined), ...over,
} as PasskeyClient);

beforeEach(() => {
    supported();
    Object.defineProperty(navigator, 'credentials', {value: {}, configurable: true});
});
afterEach(() => {
    delete (window as unknown as Record<string, unknown>).PublicKeyCredential;
    Object.defineProperty(navigator, 'credentials', {value: undefined, configurable: true});
});

describe('PasskeySignInButton', () => {
    it('is not there when the server has passkeys off', async () => {
        render(<PasskeySignInButton client={client({enabled: vi.fn(async () => false)})} onSignedIn={() => undefined}/>);

        await waitFor(() => expect(screen.queryByRole('button')).not.toBeInTheDocument());
    });

    it('is not there in a browser that cannot do passkeys', () => {
        delete (window as unknown as Record<string, unknown>).PublicKeyCredential;
        render(<PasskeySignInButton client={client()} onSignedIn={() => undefined}/>);

        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('signs in and tells the app, so it can read who signed in', async () => {
        const onSignedIn = vi.fn();
        const c = client();
        render(<PasskeySignInButton client={c} onSignedIn={onSignedIn}/>);

        await userEvent.click(await screen.findByRole('button', {name: /Sign in with a passkey/}));

        await waitFor(() => expect(onSignedIn).toHaveBeenCalled());
        expect(c.signIn).toHaveBeenCalled();
    });

    it('says nothing when the person closes the device prompt', async () => {
        const c = client({signIn: vi.fn(async () => { throw new PasskeyCancelled(); })});
        const onSignedIn = vi.fn();
        render(<PasskeySignInButton client={c} onSignedIn={onSignedIn}/>);

        await userEvent.click(await screen.findByRole('button'));

        await waitFor(() => expect(c.signIn).toHaveBeenCalled());
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        expect(onSignedIn).not.toHaveBeenCalled();
    });

    it('tells the person when it did not work, and offers the password instead', async () => {
        const c = client({signIn: vi.fn(async () => { throw new Error('no such passkey'); })});
        render(<PasskeySignInButton client={c} onSignedIn={() => undefined}/>);

        await userEvent.click(await screen.findByRole('button'));

        expect(await screen.findByRole('alert')).toHaveTextContent(/did not work.*password/);
    });
});
