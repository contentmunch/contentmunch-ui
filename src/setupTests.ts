import '@testing-library/jest-dom';
import {cleanup} from '@testing-library/react';
import {afterEach} from 'vitest';

// Charts print numbers in the reader's own locale (a Canadian reader sees "US$" for dollars). The tests
// assert on exact text, so they run in en-US whatever the machine's locale is.
const NumberFormat = Intl.NumberFormat;
const pinned = function (locales?: string | string[], options?: Intl.NumberFormatOptions) {
    return new NumberFormat(locales ?? 'en-US', options);
} as unknown as typeof Intl.NumberFormat;
pinned.supportedLocalesOf = NumberFormat.supportedLocalesOf;
Intl.NumberFormat = pinned;

afterEach(() => {
    cleanup();
});
