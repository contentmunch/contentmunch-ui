import {describe, expect, it} from 'vitest';
import {getSelectedNode} from './getSelectedNode';
import type {RangeSelection} from 'lexical';

// Minimal fakes of Lexical's Point/TextNode shapes -- getSelectedNode (and the
// $isAtNodeEnd helper it delegates to) only touch `type`, `offset` and
// `getNode()`/`getTextContentSize()`, so a full LexicalEditor isn't needed.
function makeTextPoint(node: unknown, offset: number) {
    return {
        type: 'text' as const,
        offset,
        getNode: () => node,
    };
}

function makeTextNode(textContentSize: number) {
    return {getTextContentSize: () => textContentSize};
}

describe('getSelectedNode', () => {
    it('returns the anchor node when anchor and focus are the same node', () => {
        const node = makeTextNode(5);
        const point = makeTextPoint(node, 2);
        const selection = {
            anchor: point,
            focus: point,
            isBackward: () => false,
        } as unknown as RangeSelection;

        expect(getSelectedNode(selection)).toBe(node);
    });

    it('returns the anchor node for a forward selection when the anchor is at the node end', () => {
        const anchorNode = makeTextNode(5);
        const focusNode = makeTextNode(5);
        const selection = {
            anchor: makeTextPoint(anchorNode, 5), // offset === size -> at node end
            focus: makeTextPoint(focusNode, 2),
            isBackward: () => false,
        } as unknown as RangeSelection;

        expect(getSelectedNode(selection)).toBe(anchorNode);
    });

    it('returns the focus node for a forward selection when the anchor is not at the node end', () => {
        const anchorNode = makeTextNode(5);
        const focusNode = makeTextNode(5);
        const selection = {
            anchor: makeTextPoint(anchorNode, 1), // not at end
            focus: makeTextPoint(focusNode, 2),
            isBackward: () => false,
        } as unknown as RangeSelection;

        expect(getSelectedNode(selection)).toBe(focusNode);
    });

    it('returns the anchor node for a backward selection when the focus is at the node end', () => {
        const anchorNode = makeTextNode(5);
        const focusNode = makeTextNode(5);
        const selection = {
            anchor: makeTextPoint(anchorNode, 1),
            focus: makeTextPoint(focusNode, 5), // offset === size -> at node end
            isBackward: () => true,
        } as unknown as RangeSelection;

        expect(getSelectedNode(selection)).toBe(anchorNode);
    });

    it('returns the focus node for a backward selection when the focus is not at the node end', () => {
        const anchorNode = makeTextNode(5);
        const focusNode = makeTextNode(5);
        const selection = {
            anchor: makeTextPoint(anchorNode, 1),
            focus: makeTextPoint(focusNode, 2), // not at end
            isBackward: () => true,
        } as unknown as RangeSelection;

        expect(getSelectedNode(selection)).toBe(focusNode);
    });
});
