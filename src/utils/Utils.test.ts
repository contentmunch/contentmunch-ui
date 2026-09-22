import {describe, expect, it, vi, beforeEach} from 'vitest';
import {copyToClipboard} from './Utils';

describe('copyToClipboard', () => {
    beforeEach(() => {
        Object.defineProperty(navigator, 'clipboard', {
            value: {writeText: vi.fn().mockResolvedValue(undefined)},
            configurable: true,
            writable: true,
        });
    });

    it('writes the given text to the clipboard', () => {
        copyToClipboard('hello world');

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello world');
        expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
    });

    it('writes an empty string to the clipboard', () => {
        copyToClipboard('');

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('');
    });

    it('writes different text on subsequent calls', () => {
        copyToClipboard('first');
        copyToClipboard('second');

        expect(navigator.clipboard.writeText).toHaveBeenNthCalledWith(1, 'first');
        expect(navigator.clipboard.writeText).toHaveBeenNthCalledWith(2, 'second');
    });
});
