import * as React from "react";
import {useLayoutEffect, useMemo, useRef, useState} from "react";
import {createPortal} from "react-dom";
import "./assets/note-content.css";
import {ImageLightbox} from "./ImageLightbox";
import {useMediaImageLightbox} from "./useMediaImageLightbox";
import {PollRenderer} from "../poll/PollRenderer.tsx";
import {FormRenderer} from "../form/FormRenderer.tsx";
import {StepsRenderer} from "../steps/StepsRenderer.tsx";
import {CopyButton} from "../button/CopyButton.tsx";

interface HydratedRegion {
    key: string;
    node: HTMLElement;
    render: (node: HTMLElement) => React.ReactNode;
}

interface CodeCopyHost {
    key: string;
    host: HTMLElement;
    text: string;
}

// A fenced code block's <pre> keeps its highlighted markup exactly as
// rendered -- unlike interactiveRegions above, this doesn't replace
// anything, it just wraps the <pre> in a positioning box and appends a host
// element next to it (a sibling, not a child) to portal a CopyButton into.
// The button host deliberately lives OUTSIDE the <pre>: the <pre> itself is
// the horizontally-scrollable element (see note-content.css), and a button
// placed inside it would scroll away with a long code line instead of
// staying pinned in the corner. code.textContent (not innerHTML) is what
// gets copied: rehype-highlight wraps each token in its own <span>, and
// textContent flattens all of that back down to the plain source text, same
// as what was actually authored.
const findCodeBlocks = (root: Element): {code: HTMLElement; pre: HTMLElement}[] =>
    Array.from(root.querySelectorAll<HTMLElement>("pre > code"))
        .map((code) => ({code, pre: code.parentElement as HTMLElement}));

const codeBlockWrapperFor = (pre: HTMLElement): HTMLElement => {
    const existing = pre.parentElement;
    if (existing?.classList.contains("muncher-code-block")) {
        return existing;
    }
    const wrapper = document.createElement("div");
    wrapper.className = "muncher-code-block";
    pre.parentElement?.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);
    return wrapper;
};

// dangerouslySetInnerHTML produces inert markup -- fine for every directive
// that's read-only after paint (an <iframe>, an <img>), but some markers
// (e.g. Poll) need a real, stateful React subtree at that exact DOM
// location. RenderedNoteContent stays agnostic of what any given marker
// means -- it only knows how to find nodes matching a caller-supplied
// selector and hand each one off to the caller's own renderer via a portal.
// Only the OUTERMOST match per nesting chain is hydrated, so a region's own
// rendered output (which may reuse the same marker attribute on its root)
// is never mistaken for another static node to hydrate on a later pass.
const findTopLevelMatches = (root: Element, selector: string): HTMLElement[] =>
    Array.from(root.querySelectorAll<HTMLElement>(selector))
        .filter((node) => !node.parentElement?.closest(selector));

// The default wiring for the two embedded-widget kinds this package ships a
// renderer for. A caller that wants only some of these (or none) passes its
// own `interactiveRegions` explicitly to override this -- it's a default,
// not baked-in behavior. A future widget kind (rating, etc.) gets its own
// entry here once it has a renderer, so every consumer picks it up for free
// without touching their own call site.
export const defaultInteractiveRegions: InteractiveRegion[] = [
    {
        selector: "[data-poll-nid]",
        render: (node) => <PollRenderer data-poll-nid={node.getAttribute("data-poll-nid") ?? undefined}/>,
    },
    {
        selector: "[data-form-nid]",
        render: (node) => <FormRenderer data-form-nid={node.getAttribute("data-form-nid") ?? undefined}/>,
    },
    {
        selector: "[data-steps]",
        render: (node) => (
            <StepsRenderer
                data-steps={node.getAttribute("data-steps") ?? undefined}
                data-steps-ordered={node.getAttribute("data-steps-ordered") ?? undefined}
            />
        ),
    },
];

export const RenderedNoteContent: React.FC<RenderedNoteContentProps> = (
    {xhtml, className = "", interactiveRegions = defaultInteractiveRegions}
) => {
    const {lightbox, handleClick, handleKeyDown, close} = useMediaImageLightbox();
    const sectionRef = useRef<HTMLElement>(null);
    const [hydrated, setHydrated] = useState<HydratedRegion[]>([]);
    const [codeCopyHosts, setCodeCopyHosts] = useState<CodeCopyHost[]>([]);

    // {__html: xhtml} is a fresh object every render. React's prop diff for
    // dangerouslySetInnerHTML compares that wrapper BY REFERENCE, not the
    // string inside it -- an unmemoized literal here means React re-parses
    // and replaces the section's innerHTML on every single re-render (e.g.
    // the very one triggered by setHydrated below), silently orphaning
    // whatever was just portaled into it. Memoizing on xhtml keeps the
    // reference stable across renders where the content hasn't changed.
    const innerHtml = useMemo(() => ({__html: xhtml}), [xhtml]);

    useLayoutEffect(() => {
        const root = sectionRef.current;
        if (!root || !interactiveRegions || interactiveRegions.length === 0) {
            setHydrated([]);
            return;
        }

        const next: HydratedRegion[] = interactiveRegions.flatMap(({selector, render}) =>
            findTopLevelMatches(root, selector).map((node, index) => {
                node.innerHTML = "";
                return {key: `${selector}-${index}`, node, render};
            })
        );
        setHydrated(next);
        // xhtml is the real dependency -- interactiveRegions is a fresh array/closure
        // on every render of the caller, and re-running this on identity churn alone
        // would tear down and remount every hydrated region for no content change.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [xhtml]);

    useLayoutEffect(() => {
        const root = sectionRef.current;
        if (!root) {
            setCodeCopyHosts([]);
            return;
        }

        setCodeCopyHosts(
            findCodeBlocks(root).map(({code, pre}, index) => {
                const wrapper = codeBlockWrapperFor(pre);
                let host = wrapper.querySelector<HTMLElement>(":scope > .muncher-code-copy-host");
                if (!host) {
                    host = document.createElement("span");
                    host.className = "muncher-code-copy-host";
                    wrapper.appendChild(host);
                }
                return {key: `code-copy-${index}`, host, text: code.textContent ?? ""};
            })
        );
    }, [xhtml]);

    return (
        <>
            <section
                ref={sectionRef}
                className={`muncher-note-content ${className}`.trim()}
                dangerouslySetInnerHTML={innerHtml}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
            />
            {hydrated.map(({key, node, render}) => createPortal(render(node), node, key))}
            {codeCopyHosts.map(({key, host, text}) =>
                createPortal(<CopyButton text={text} size="small" variant="secondary" label="copy code"/>, host, key))}
            <ImageLightbox show={lightbox !== null} state={lightbox} onClose={close}/>
        </>
    );
};

export interface InteractiveRegion {
    /** CSS selector identifying the static marker to hydrate, e.g. "[data-poll-nid]". */
    selector: string;
    /** Given the matched DOM node, return the live content to portal into it. */
    render: (node: HTMLElement) => React.ReactNode;
}

export interface RenderedNoteContentProps {
    xhtml: string;
    className?: string;
    /** Optional hooks for replacing specific static markers with live, stateful content. */
    interactiveRegions?: InteractiveRegion[];
}
