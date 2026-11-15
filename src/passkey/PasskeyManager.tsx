import React, {useCallback, useEffect, useState} from "react";
import {Button} from "../button/Button";
import {Icon} from "../icon/Icon";
import {Input} from "../input/Input";
import {deviceLabel} from "./deviceLabel.ts";
import type {PasskeyClient, PasskeySummary} from "./passkeyClient.ts";
import {PasskeyCancelled, passkeysSupported} from "./webauthn.ts";
import "./assets/passkey.css";

const when = (iso?: string | null) =>
    iso ? new Date(iso).toLocaleDateString(undefined, {year: "numeric", month: "short", day: "numeric"}) : "";

export interface PasskeyManagerProps {
    client: PasskeyClient;
    className?: string;
}

/**
 * A person's own passkeys: what they have, add one on this device, remove one. It renders nothing where the server has passkeys off, and
 * says so plainly in a browser that cannot make them.
 */
export const PasskeyManager: React.FC<PasskeyManagerProps> = ({client, className}) => {
    const [enabled, setEnabled] = useState<boolean | null>(null);
    const [passkeys, setPasskeys] = useState<PasskeySummary[]>([]);
    const [name, setName] = useState(() => deviceLabel());
    const [busy, setBusy] = useState(false);
    const [notice, setNotice] = useState("");
    const [error, setError] = useState("");
    const [removing, setRemoving] = useState<string | null>(null);

    const load = useCallback(() => client.list().then(setPasskeys).catch(() => setError("Your passkeys could not be loaded.")), [client]);

    useEffect(() => {
        let live = true;
        client.enabled().then(on => {
            if (!live) return;
            setEnabled(on);
            if (on) load();
        });
        return () => {
            live = false;
        };
    }, [client, load]);

    if (!enabled) return null;

    const add = async () => {
        setBusy(true);
        setError("");
        setNotice("");
        try {
            await client.register(name.trim() || deviceLabel());
            setNotice("Passkey added.");
            await load();
        } catch (failure) {
            if (!(failure instanceof PasskeyCancelled)) setError("The passkey could not be added. Try again.");
        } finally {
            setBusy(false);
        }
    };

    const remove = async (id: string) => {
        setBusy(true);
        setError("");
        setNotice("");
        try {
            await client.remove(id);
            setRemoving(null);
            setNotice("Passkey removed.");
            await load();
        } catch {
            setError("The passkey could not be removed. Try again.");
        } finally {
            setBusy(false);
        }
    };

    return (
        <section className={`passkey-manager${className ? " " + className : ""}`} aria-label="Passkeys">
            <h3 className="passkey-title"><Icon name="key" size="small"/> Passkeys</h3>
            <p className="passkey-hint">Sign in with your fingerprint, face or device PIN instead of a password.</p>

            {passkeys.length === 0
                ? <p className="passkey-hint">You have no passkeys yet.</p>
                : (
                    <ul className="passkey-list">
                        {passkeys.map(passkey => (
                            <li key={passkey.id} className="passkey-item">
                                <span className="passkey-name">{passkey.name}</span>
                                <span className="passkey-meta">
                                    Added {when(passkey.createdAt)}{passkey.lastUsedAt ? `, last used ${when(passkey.lastUsedAt)}` : ", not used yet"}
                                </span>
                                {removing === passkey.id
                                    ? (
                                        <span className="passkey-confirm">
                                            <Button variant="danger" size="small" disabled={busy} onClick={() => remove(passkey.id)}>
                                                Remove passkey
                                            </Button>
                                            <Button variant="tertiary" size="small" onClick={() => setRemoving(null)}>Keep it</Button>
                                        </span>
                                    )
                                    : <Button variant="tertiary" size="small" onClick={() => setRemoving(passkey.id)}>Remove</Button>}
                            </li>
                        ))}
                    </ul>
                )}

            {passkeysSupported()
                ? (
                    <div className="passkey-add">
                        <Input name="passkey-name" label="Name this device" value={name} onChange={event => setName(event.target.value)}
                               maxLength={100}/>
                        <Button variant="primary" disabled={busy} onClick={add}>Add a passkey</Button>
                    </div>
                )
                : <p className="passkey-hint">This browser cannot make passkeys.</p>}

            {notice && <p className="passkey-notice" role="status">{notice}</p>}
            {error && <p className="passkey-error" role="alert">{error}</p>}
        </section>
    );
};
