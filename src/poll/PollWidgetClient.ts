import type {Poll, PollTally} from "./model/Poll.ts";

// The handful of calls PollRenderer needs -- deliberately unaware of auth,
// base URL, or transport. Each consuming app supplies its own implementation
// via NoteWidgetClientProvider: contentmunch-notes-ui's talks to its
// authenticated /api/polls; a headless public site's talks to a Worker
// proxy carrying a visitor id instead of a user session.
export interface PollWidgetClient {
    getPoll(bucket: string, pollId: string): Promise<Poll>;

    submitPollResponse(bucket: string, pollId: string, selectedOptions: string[]): Promise<PollTally>;
}

// Thrown by a client implementation's submitPollResponse when the backend
// rejects a duplicate vote (HTTP 409 on every backend that implements this),
// so PollRenderer can show "already voted" + refreshed results without
// needing to know anything about the transport that produced it.
export class PollAlreadyRespondedError extends Error {
    constructor() {
        super("This poll has already been voted on.");
        this.name = "PollAlreadyRespondedError";
    }
}
