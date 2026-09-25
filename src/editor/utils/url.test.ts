import {describe, expect, it} from 'vitest';
import {sanitizeUrl} from './url';

describe('sanitizeUrl', () => {
    it('allows a plain https URL', () => {
        expect(sanitizeUrl('https://example.com')).toBe('https://example.com');
    });

    it('allows a plain http URL', () => {
        expect(sanitizeUrl('http://example.com')).toBe('http://example.com');
    });

    it('allows a mailto URL', () => {
        expect(sanitizeUrl('mailto:someone@example.com')).toBe('mailto:someone@example.com');
    });

    it('allows a relative path', () => {
        expect(sanitizeUrl('/some/path')).toBe('/some/path');
    });

    it('trims surrounding whitespace before validating', () => {
        expect(sanitizeUrl('  https://example.com  ')).toBe('https://example.com');
    });

    it('allows a safe data:image URL', () => {
        const dataUrl = 'data:image/png;base64,aGVsbG8=';
        expect(sanitizeUrl(dataUrl)).toBe(dataUrl);
    });

    it('falls back to https:// for a javascript: URL', () => {
        expect(sanitizeUrl('javascript:alert(1)')).toBe('https://');
    });

    it('falls back to https:// for an unsafe data URL', () => {
        expect(sanitizeUrl('data:text/html;base64,aGVsbG8=')).toBe('https://');
    });
});
