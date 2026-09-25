import {describe, expect, it, vi} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ContentEditor} from './ContentEditor';

describe('ContentEditor', () => {
    it('renders with initial html content', async () => {
        render(<ContentEditor html="<p>Hello world</p>" onChange={() => {
        }}/>);

        await waitFor(() => {
            expect(screen.getByText('Hello world')).toBeInTheDocument();
        });
    });

    it('renders the placeholder when no html is provided', () => {
        render(<ContentEditor onChange={() => {
        }}/>);

        expect(screen.getByText('Enter some text...')).toBeInTheDocument();
    });

    it('reports the seeded html and its character count through onChange', async () => {
        const onChange = vi.fn();
        render(<ContentEditor html="<p>Hi</p>" onChange={onChange}/>);

        await waitFor(() => {
            const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1];
            expect(lastCall?.[0]).toContain('Hi');
            expect(lastCall?.[1]).toBe(2);
        });
    });

    it('toggles the bold button to active when clicked, and back off when clicked again', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<ContentEditor onChange={onChange}/>);

        const editable = screen.getByRole('textbox');
        await user.click(editable);

        const boldButton = screen.getByRole('button', {name: /text as bold/i});
        expect(boldButton).not.toHaveClass('active');

        await user.click(boldButton);
        await waitFor(() => expect(boldButton).toHaveClass('active'));

        await user.click(boldButton);
        await waitFor(() => expect(boldButton).not.toHaveClass('active'));
    });

    it('creates a bullet list via the toolbar and reflects it in the emitted html', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<ContentEditor html="<p>Item one</p>" onChange={onChange}/>);

        // Focus the editor so the selection lands inside the seeded paragraph
        // -- INSERT_UNORDERED_LIST_COMMAND wraps whichever block(s) the
        // current selection touches, so this doesn't depend on typing.
        const editable = screen.getByRole('textbox');
        await user.click(editable);

        const bulletListButton = screen.getByRole('button', {name: /bullet list/i});
        await user.click(bulletListButton);

        await waitFor(() => {
            const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1];
            expect(lastCall?.[0]).toContain('<ul');
            expect(lastCall?.[0]).toContain('<li');
        });
    });

    it('renders the full toolbar (headings, quote) when variant is not "basic"', () => {
        render(<ContentEditor onChange={() => {
        }}/>);

        expect(screen.getByRole('button', {name: 'Heading 1'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Heading 2'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Quote'})).toBeInTheDocument();
    });

    it('hides headings and quote controls when variant is "basic"', () => {
        render(<ContentEditor onChange={() => {
        }} variant="basic"/>);

        expect(screen.queryByRole('button', {name: 'Heading 1'})).not.toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Heading 2'})).not.toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Quote'})).not.toBeInTheDocument();

        // Controls common to every variant should still be present.
        expect(screen.getByRole('button', {name: 'Paragraph'})).toBeInTheDocument();
    });

    it('shows headings and quote controls when variant is "simple"', () => {
        render(<ContentEditor onChange={() => {
        }} variant="simple"/>);

        expect(screen.getByRole('button', {name: 'Heading 1'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Quote'})).toBeInTheDocument();
    });
});

// Note on a genuine jsdom limitation (see also src/setupTests.ts for a
// similar caveat): Lexical's ContentEditable reconciler relies on the real
// browser `beforeinput`/Selection/Range behavior to turn keystrokes into DOM
// text mutations. jsdom implements the Selection/Range *API* but does not
// perform real native text insertion into a contenteditable element, so
// `@testing-library/user-event`'s `type()` into the editor's ContentEditable
// is a no-op here -- verified directly: typing into a fresh editor still
// serializes to `<p class="content-editor-paragraph"><br></p>` afterwards.
// Because of that, the tests above deliberately avoid asserting on typed
// characters. Instead they verify: (1) content seeded via the `html` prop
// (which goes through $generateNodesFromDOM, not DOM typing) round-trips
// through onChange with the right text and character count, (2) toolbar
// formatting buttons toggle their own active/inactive state on click, and
// (3) block-level commands (bullet list) that operate on the current
// selection -- rather than on typed text -- still produce the expected
// output tags. True typed-text-formatting coverage (e.g. "select this typed
// word and bold it") would need a real browser and is out of scope here.
