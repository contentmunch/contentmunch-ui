import * as React from "react";
import {createContext, useContext} from "react";
import type {PollWidgetClient} from "../poll/PollWidgetClient.ts";
import type {FormWidgetClient} from "../form/FormWidgetClient.ts";

// One place a consuming app wires up how PollRenderer/FormRenderer (and any
// future embedded-widget renderer -- rating, etc.) talk to a backend. This
// package deliberately never imports axios/fetch/a base URL itself: each app
// wraps its tree once with whatever client matches its own transport
// (contentmunch-notes-ui's authenticated instance, a headless public site's
// Worker-proxied one with a visitor id) and every RenderedNoteContent under
// it just works.
interface NoteWidgetClients {
    poll?: PollWidgetClient;
    form?: FormWidgetClient;
}

const NoteWidgetClientContext = createContext<NoteWidgetClients>({});

export const NoteWidgetClientProvider: React.FC<React.PropsWithChildren<NoteWidgetClients>> = (
    {poll, form, children}
) => (
    <NoteWidgetClientContext.Provider value={{poll, form}}>
        {children}
    </NoteWidgetClientContext.Provider>
);

export const usePollWidgetClient = (): PollWidgetClient => {
    const {poll} = useContext(NoteWidgetClientContext);
    if (!poll) {
        throw new Error(
            "PollRenderer requires a NoteWidgetClientProvider with a `poll` client wrapping it."
        );
    }
    return poll;
};

export const useFormWidgetClient = (): FormWidgetClient => {
    const {form} = useContext(NoteWidgetClientContext);
    if (!form) {
        throw new Error(
            "FormRenderer requires a NoteWidgetClientProvider with a `form` client wrapping it."
        );
    }
    return form;
};
