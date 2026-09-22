import {describe, expect, it, vi, beforeEach} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {PollRenderer} from './PollRenderer';
import {NoteWidgetClientProvider} from '../note/NoteWidgetClientProvider.tsx';
import {PollAlreadyRespondedError} from './PollWidgetClient.ts';
import type {PollWidgetClient} from './PollWidgetClient.ts';
import type {Poll, PollTally} from './model/Poll.ts';

const renderWithClient = (client: PollWidgetClient, nid = 'hq/abcd') =>
    render(
        <NoteWidgetClientProvider poll={client}>
            <PollRenderer data-poll-nid={nid}/>
        </NoteWidgetClientProvider>
    );

const makePoll = (overrides: Partial<Poll> = {}): Poll => ({
    title: 'What should we cook next?',
    options: ['Soup', 'Salad', 'Stir-fry'],
    type: 'SINGLE',
    ...overrides,
});

describe('PollRenderer', () => {
    beforeEach(() => {
        // Poll fetches are cached module-wide by nid, so each test needs a
        // fresh nid to avoid bleeding state from a previous test's client.
    });

    it('shows an error span when data-poll-nid is missing', () => {
        const getPoll = vi.fn();
        const submitPollResponse = vi.fn();
        render(
            <NoteWidgetClientProvider poll={{getPoll, submitPollResponse}}>
                <PollRenderer/>
            </NoteWidgetClientProvider>
        );

        expect(screen.getByText(':poll is missing a required nid attribute')).toBeInTheDocument();
        expect(getPoll).not.toHaveBeenCalled();
    });

    it('renders a loading placeholder before the poll resolves', () => {
        const getPoll = vi.fn(() => new Promise<Poll>(() => {}));
        renderWithClient({getPoll, submitPollResponse: vi.fn()}, 'hq/loading');

        expect(screen.getByText('…')).toBeInTheDocument();
    });

    it('shows an error when the nid is malformed', async () => {
        const getPoll = vi.fn();
        renderWithClient({getPoll, submitPollResponse: vi.fn()}, 'malformed-nid');

        expect(await screen.findByText('Could not resolve poll "malformed-nid"')).toBeInTheDocument();
        expect(getPoll).not.toHaveBeenCalled();
    });

    it('shows an error when getPoll rejects', async () => {
        const getPoll = vi.fn().mockRejectedValue(new Error('network down'));
        renderWithClient({getPoll, submitPollResponse: vi.fn()}, 'hq/broken');

        expect(await screen.findByText('Could not resolve poll "hq/broken"')).toBeInTheDocument();
    });

    it('renders the poll title and options once resolved', async () => {
        const poll = makePoll();
        const getPoll = vi.fn().mockResolvedValue(poll);
        renderWithClient({getPoll, submitPollResponse: vi.fn()}, 'hq/render');

        expect(await screen.findByText('What should we cook next?')).toBeInTheDocument();
        expect(screen.getByRole('radio', {name: 'Soup'})).toBeInTheDocument();
        expect(screen.getByRole('radio', {name: 'Salad'})).toBeInTheDocument();
        expect(screen.getByRole('radio', {name: 'Stir-fry'})).toBeInTheDocument();
        expect(getPoll).toHaveBeenCalledWith('hq', 'render');
    });

    it('renders checkboxes for a MULTI poll and radios for SINGLE', async () => {
        const poll = makePoll({type: 'MULTI'});
        const getPoll = vi.fn().mockResolvedValue(poll);
        renderWithClient({getPoll, submitPollResponse: vi.fn()}, 'hq/multi');

        await screen.findByText('What should we cook next?');
        expect(screen.getByRole('checkbox', {name: 'Soup'})).toBeInTheDocument();
        expect(screen.getByRole('checkbox', {name: 'Salad'})).toBeInTheDocument();
    });

    it('disables the Vote button until an option is selected, then submits and shows results', async () => {
        const user = userEvent.setup();
        const poll = makePoll();
        const tally: PollTally = {counts: {Soup: 1}, totalResponses: 1};
        const getPoll = vi.fn().mockResolvedValue(poll);
        const submitPollResponse = vi.fn().mockResolvedValue(tally);
        renderWithClient({getPoll, submitPollResponse}, 'hq/vote');

        await screen.findByText('What should we cook next?');
        const voteButton = screen.getByRole('button', {name: 'Vote'});
        expect(voteButton).toBeDisabled();

        await user.click(screen.getByRole('radio', {name: 'Soup'}));
        expect(voteButton).toBeEnabled();

        await user.click(voteButton);

        expect(submitPollResponse).toHaveBeenCalledWith('hq', 'vote', ['Soup']);
        expect(await screen.findByText('Soup')).toBeInTheDocument();
        expect(screen.getByText('1 / 1 (100%)')).toBeInTheDocument();
    });

    it('toggles multiple selections for a MULTI poll and submits all selected options', async () => {
        const user = userEvent.setup();
        const poll = makePoll({type: 'MULTI'});
        const tally: PollTally = {counts: {Soup: 1, Salad: 1}, totalResponses: 1};
        const getPoll = vi.fn().mockResolvedValue(poll);
        const submitPollResponse = vi.fn().mockResolvedValue(tally);
        renderWithClient({getPoll, submitPollResponse}, 'hq/multivote');

        await screen.findByText('What should we cook next?');
        await user.click(screen.getByRole('checkbox', {name: 'Soup'}));
        await user.click(screen.getByRole('checkbox', {name: 'Salad'}));
        await user.click(screen.getByRole('checkbox', {name: 'Soup'}));

        await user.click(screen.getByRole('button', {name: 'Vote'}));

        expect(submitPollResponse).toHaveBeenCalledWith('hq', 'multivote', ['Salad']);
    });

    it('renders already-responded results directly when the poll comes back hasResponded', async () => {
        const poll = makePoll({
            hasResponded: true,
            tally: {counts: {Soup: 7, Salad: 3, 'Stir-fry': 2}, totalResponses: 12},
        });
        const getPoll = vi.fn().mockResolvedValue(poll);
        renderWithClient({getPoll, submitPollResponse: vi.fn()}, 'hq/already');

        expect(await screen.findByText('7 / 12 (58%)')).toBeInTheDocument();
        expect(screen.getByText('3 / 12 (25%)')).toBeInTheDocument();
        expect(screen.getByText('2 / 12 (17%)')).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Vote'})).not.toBeInTheDocument();
    });

    it('shows an inline message and refreshed tally on PollAlreadyRespondedError', async () => {
        const user = userEvent.setup();
        const poll = makePoll();
        const freshTally: PollTally = {counts: {Soup: 4, Salad: 2, 'Stir-fry': 1}, totalResponses: 7};
        const getPoll = vi.fn()
            .mockResolvedValueOnce(poll)
            .mockResolvedValueOnce({...poll, hasResponded: true, tally: freshTally});
        const submitPollResponse = vi.fn().mockRejectedValue(new PollAlreadyRespondedError());
        renderWithClient({getPoll, submitPollResponse}, 'hq/conflict');

        await screen.findByText('What should we cook next?');
        await user.click(screen.getByRole('radio', {name: 'Soup'}));
        await user.click(screen.getByRole('button', {name: 'Vote'}));

        expect(await screen.findByText("You've already responded to this poll.")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText('4 / 7 (57%)')).toBeInTheDocument();
        });
        expect(getPoll).toHaveBeenCalledTimes(2);
    });

    it('shows a generic submit error on other submission failures and stays in voting state', async () => {
        const user = userEvent.setup();
        const poll = makePoll();
        const getPoll = vi.fn().mockResolvedValue(poll);
        const submitPollResponse = vi.fn().mockRejectedValue(new Error('boom'));
        renderWithClient({getPoll, submitPollResponse}, 'hq/failure');

        await screen.findByText('What should we cook next?');
        await user.click(screen.getByRole('radio', {name: 'Soup'}));
        await user.click(screen.getByRole('button', {name: 'Vote'}));

        expect(await screen.findByText('Could not submit your response. Please try again.')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Vote'})).toBeInTheDocument();
    });
});
