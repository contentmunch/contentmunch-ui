import {describe, expect, it} from 'vitest';
import {FormSubmissionError} from './FormWidgetClient';

describe('FormSubmissionError', () => {
    it('is an instance of Error carrying the given message', () => {
        const error = new FormSubmissionError("Field 'name' is required");

        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(FormSubmissionError);
        expect(error.message).toBe("Field 'name' is required");
    });

    it('can be thrown and caught, preserving its type', () => {
        const throwIt = () => {
            throw new FormSubmissionError('backend validation failed');
        };

        expect(throwIt).toThrow(FormSubmissionError);
        expect(throwIt).toThrow('backend validation failed');
    });
});
