import type {Meta, StoryObj} from '@storybook/react';
import {PollRenderer} from "./PollRenderer.tsx";
import {NoteWidgetClientProvider} from "../note/NoteWidgetClientProvider.tsx";
import {PollAlreadyRespondedError} from "./PollWidgetClient.ts";
import type {Poll, PollTally} from "./model/Poll.ts";

// A fake in-memory client -- stands in for what a real app (an authenticated
// axios instance, or a headless site's fetch-with-visitor-id) would supply
// via NoteWidgetClientProvider. Storybook has no backend of its own.
const makeMockClient = (poll: Poll) => {
    let tally: PollTally = poll.tally ?? {counts: {}, totalResponses: 0};
    let responded = poll.hasResponded ?? false;

    return {
        getPoll: async () => ({...poll, tally, hasResponded: responded}),
        submitPollResponse: async (_bucket: string, _pollId: string, selectedOptions: string[]) => {
            if (responded) throw new PollAlreadyRespondedError();
            const counts = {...tally.counts};
            for (const option of selectedOptions) {
                counts[option] = (counts[option] ?? 0) + 1;
            }
            tally = {counts, totalResponses: tally.totalResponses + 1};
            responded = true;
            return tally;
        },
    };
};

const meta: Meta<typeof PollRenderer> = {
    component: PollRenderer,
    title: 'Content/PollRenderer',
};

export default meta;
type Story = StoryObj<typeof PollRenderer>;

export const Voting: Story = {
    render: () => (
        <NoteWidgetClientProvider poll={makeMockClient({
            title: "What should we cook next?",
            options: ["Soup", "Salad", "Stir-fry"],
            type: "SINGLE",
        })}>
            <PollRenderer data-poll-nid="hq/abcd"/>
        </NoteWidgetClientProvider>
    ),
};

export const AlreadyVoted: Story = {
    render: () => (
        <NoteWidgetClientProvider poll={makeMockClient({
            title: "What should we cook next?",
            options: ["Soup", "Salad", "Stir-fry"],
            type: "SINGLE",
            hasResponded: true,
            tally: {counts: {Soup: 7, Salad: 3, "Stir-fry": 2}, totalResponses: 12},
        })}>
            <PollRenderer data-poll-nid="hq/efgh"/>
        </NoteWidgetClientProvider>
    ),
};
