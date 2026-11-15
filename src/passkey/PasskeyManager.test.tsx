import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {PasskeyManager} from './PasskeyManager.tsx';
import {PasskeyCancelled} from './webauthn.ts';
import type {PasskeyClient, PasskeySummary} from './passkeyClient.ts';

const mac: PasskeySummary = {id: 'a1', name: 'Safari on Mac', createdAt: '2026-10-01T10:00:00Z', lastUsedAt: '2026-11-01T10:00:00Z'};

const client = (over: Partial<PasskeyClient> = {}): PasskeyClient => ({
    enabled: vi.fn(async () => true), list: vi.fn(async () => [mac]), remove: vi.fn(async () => undefined),
    register: vi.fn(async () => mac), signIn: vi.fn(), ...over,
} as PasskeyClient);

beforeEach(() => {
    Object.defineProperty(window, 'PublicKeyCredential', {value: class {}, configurable: true});
    Object.defineProperty(navigator, 'credentials', {value: {}, configurable: true});
});
afterEach(() => {
    delete (window as unknown as Record<string, unknown>).PublicKeyCredential;
    Object.defineProperty(navigator, 'credentials', {value: undefined, configurable: true});
});

describe('PasskeyManager', () => {
    it('renders nothing where the server has passkeys off', async () => {
        const {container} = render(<PasskeyManager client={client({enabled: vi.fn(async () => false)})}/>);

        await waitFor(() => expect(container).toBeEmptyDOMElement());
    });

    it('lists the passkeys the person has, with when each was added and last used', async () => {
        render(<PasskeyManager client={client()}/>);

        expect(await screen.findByText('Safari on Mac')).toBeInTheDocument();
        expect(screen.getByText(/Added .*last used/)).toBeInTheDocument();
    });

    it('says so when there are none', async () => {
        render(<PasskeyManager client={client({list: vi.fn(async () => [])})}/>);

        expect(await screen.findByText('You have no passkeys yet.')).toBeInTheDocument();
    });

    it('adds a passkey under the name given, then shows the new list', async () => {
        const c = client();
        render(<PasskeyManager client={c}/>);
        await screen.findByText('Safari on Mac');

        const name = screen.getByLabelText('Name this device');
        await userEvent.clear(name);
        await userEvent.type(name, 'Work laptop');
        await userEvent.click(screen.getByRole('button', {name: 'Add a passkey'}));

        await waitFor(() => expect(c.register).toHaveBeenCalledWith('Work laptop'));
        expect(await screen.findByText('Passkey added.')).toBeInTheDocument();
    });

    it('does not complain when the person closes the device prompt', async () => {
        const c = client({register: vi.fn(async () => { throw new PasskeyCancelled(); })});
        render(<PasskeyManager client={c}/>);
        await screen.findByText('Safari on Mac');

        await userEvent.click(screen.getByRole('button', {name: 'Add a passkey'}));

        await waitFor(() => expect(c.register).toHaveBeenCalled());
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('asks twice before removing, and can be told to keep it', async () => {
        const c = client();
        render(<PasskeyManager client={c}/>);
        await screen.findByText('Safari on Mac');

        await userEvent.click(screen.getByRole('button', {name: 'Remove'}));
        await userEvent.click(screen.getByRole('button', {name: 'Keep it'}));
        expect(c.remove).not.toHaveBeenCalled();

        await userEvent.click(screen.getByRole('button', {name: 'Remove'}));
        await userEvent.click(screen.getByRole('button', {name: 'Remove passkey'}));

        await waitFor(() => expect(c.remove).toHaveBeenCalledWith('a1'));
        expect(await screen.findByText('Passkey removed.')).toBeInTheDocument();
    });

    it('says a browser that cannot make passkeys cannot', async () => {
        delete (window as unknown as Record<string, unknown>).PublicKeyCredential;
        render(<PasskeyManager client={client()}/>);

        expect(await screen.findByText('This browser cannot make passkeys.')).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Add a passkey'})).not.toBeInTheDocument();
    });
});
