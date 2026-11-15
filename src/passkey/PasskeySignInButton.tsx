import React, {useEffect, useState} from "react";
import {Button} from "../button/Button";
import {Icon} from "../icon/Icon";
import type {PasskeyClient} from "./passkeyClient.ts";
import {PasskeyCancelled, passkeysSupported} from "./webauthn.ts";
import "./assets/passkey.css";

export interface PasskeySignInButtonProps {
    client: PasskeyClient;
    /** Called once the server has signed the person in (the cookies are set): read who they are and move on. */
    onSignedIn: () => void | Promise<void>;
    label?: string;
    className?: string;
}

/**
 * "Sign in with a passkey". It renders nothing where the browser cannot do passkeys or the server has them off, says nothing when the
 * person simply closes the device prompt, and otherwise tells them it did not work.
 */
export const PasskeySignInButton: React.FC<PasskeySignInButtonProps> = ({client, onSignedIn, label = "Sign in with a passkey", className}) => {
    const [enabled, setEnabled] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let live = true;
        if (passkeysSupported()) client.enabled().then(on => live && setEnabled(on));
        return () => {
            live = false;
        };
    }, [client]);

    if (!enabled) return null;

    const signIn = async () => {
        setBusy(true);
        setError("");
        try {
            await client.signIn();
            await onSignedIn();
        } catch (failure) {
            if (!(failure instanceof PasskeyCancelled)) setError("That passkey did not work. Try again, or sign in with your password.");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className={`passkey-signin${className ? " " + className : ""}`}>
            <Button type="button" variant="secondary" disabled={busy} onClick={signIn}>
                <Icon name="key" size="small"/> {label}
            </Button>
            {error && <p className="passkey-error" role="alert">{error}</p>}
        </div>
    );
};
