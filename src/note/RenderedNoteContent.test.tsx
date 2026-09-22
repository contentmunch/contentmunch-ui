import {describe, expect, it} from 'vitest';
import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {RenderedNoteContent, type InteractiveRegion} from './RenderedNoteContent';

const imagesXhtml = `<article xmlns="http://www.w3.org/1999/xhtml">
<p>Click either image below to enlarge it.</p>
<span class="media-image-wrap media-image-wrap--medium">
<img class="media-image" alt="July 2026 calendar" role="button" tabindex="0" aria-label="Enlarge image" src="https://example.com/calendar.jpg"/>
<span class="media-image-caption"><span data-link-text>Calendar for tithi</span></span>
</span>
</article>`;

const diagramXhtml = `<article xmlns="http://www.w3.org/1999/xhtml">
<h1>Full flow</h1>
<svg id="mermaid-abc" viewBox="0 0 100 50"><rect/></svg>
</article>`;

const codeXhtml = `<article xmlns="http://www.w3.org/1999/xhtml">
<p>Some code below.</p>
<pre><code>const token = "abc";</code></pre>
</article>`;

describe('RenderedNoteContent', () => {
    it('renders the given xhtml into a section with the base + custom class names', () => {
        const {container} = render(
            <RenderedNoteContent xhtml="<article><p>Hello world</p></article>" className="my-class"/>
        );
        const section = container.querySelector('section');
        expect(section).not.toBeNull();
        expect(section?.className).toContain('muncher-note-content');
        expect(section?.className).toContain('my-class');
        expect(screen.getByText('Hello world')).toBeInTheDocument();
    });

    it('trims the className when none is given', () => {
        const {container} = render(<RenderedNoteContent xhtml="<p>Body</p>"/>);
        const section = container.querySelector('section');
        expect(section?.className).toBe('muncher-note-content');
    });

    it('hydrates a custom interactive region and hands the matched node to its render function', () => {
        const regions: InteractiveRegion[] = [
            {
                selector: '[data-widget]',
                render: (node) => <div data-testid="hydrated-widget">Widget for {node.getAttribute('data-widget')}</div>,
            },
        ];
        render(
            <RenderedNoteContent
                xhtml={`<article><div data-widget="abc">placeholder</div></article>`}
                interactiveRegions={regions}
            />
        );

        expect(screen.getByTestId('hydrated-widget')).toHaveTextContent('Widget for abc');
        // placeholder content inside the matched node is cleared before hydration
        expect(screen.queryByText('placeholder')).not.toBeInTheDocument();
    });

    it('only hydrates the outermost match when a region selector nests inside itself', () => {
        const regions: InteractiveRegion[] = [
            {
                selector: '[data-widget]',
                render: (node) => <div data-testid="hydrated">{node.getAttribute('data-widget')}</div>,
            },
        ];
        render(
            <RenderedNoteContent
                xhtml={`<article><div data-widget="outer"><div data-widget="inner"></div></div></article>`}
                interactiveRegions={regions}
            />
        );

        expect(screen.getAllByTestId('hydrated')).toHaveLength(1);
        expect(screen.getByTestId('hydrated')).toHaveTextContent('outer');
    });

    it('does not hydrate anything when interactiveRegions is an empty array', () => {
        render(
            <RenderedNoteContent
                xhtml={`<article><div data-widget="abc">still here</div></article>`}
                interactiveRegions={[]}
            />
        );
        expect(screen.getByText('still here')).toBeInTheDocument();
    });

    it('adds a copy-code button host next to a fenced code block', () => {
        const {container} = render(<RenderedNoteContent xhtml={codeXhtml}/>);
        const wrapper = container.querySelector('.muncher-code-block');
        expect(wrapper).not.toBeNull();
        expect(wrapper?.querySelector('pre > code')?.textContent).toBe('const token = "abc";');
        expect(within(wrapper as HTMLElement).getByRole('button', {name: 'copy code'})).toBeInTheDocument();
    });

    it('opens the image lightbox when a rendered image is clicked', async () => {
        const user = userEvent.setup();
        render(<RenderedNoteContent xhtml={imagesXhtml}/>);

        const inlineImage = screen.getByRole('button', {name: 'Enlarge image'});
        await user.click(inlineImage);

        const lightboxImage = screen.getByRole('img', {name: 'July 2026 calendar'});
        expect(lightboxImage).toHaveAttribute('src', 'https://example.com/calendar.jpg');
        expect(document.querySelector('.image-lightbox-caption')).toHaveTextContent('Calendar for tithi');
    });

    it('closes the image lightbox when its close button is clicked', async () => {
        const user = userEvent.setup();
        render(<RenderedNoteContent xhtml={imagesXhtml}/>);

        await user.click(screen.getByRole('button', {name: 'Enlarge image'}));
        expect(screen.getByRole('img', {name: 'July 2026 calendar'})).toBeInTheDocument();

        await user.click(screen.getByRole('button', {name: 'Close'}));
        expect(screen.queryByRole('img', {name: 'July 2026 calendar'})).not.toBeInTheDocument();
    });

    it('opens the diagram lightbox when a mermaid svg is clicked', async () => {
        const user = userEvent.setup();
        const {container} = render(<RenderedNoteContent xhtml={diagramXhtml}/>);

        const diagram = container.querySelector('svg#mermaid-abc') as SVGSVGElement;
        Object.defineProperty(diagram, 'viewBox', {value: {baseVal: {width: 100, height: 50}}, configurable: true});

        await user.click(diagram);

        const lightboxDiagram = container.querySelector('.image-lightbox-diagram svg#mermaid-abc');
        expect(lightboxDiagram).not.toBeNull();
    });
});
