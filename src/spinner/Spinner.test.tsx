import {describe, expect, it} from 'vitest';
import {render} from '@testing-library/react';
import {Spinner} from './Spinner';

describe('Spinner', () => {
    it('renders with only the base class when no size is given', () => {
        const {container} = render(<Spinner/>);

        const spinner = container.firstChild as HTMLElement;
        expect(spinner.className).toBe('muncher-spinner');
    });

    it.each(['tiny', 'small', 'medium', 'large'] as const)('applies the %s size class modifier', (size) => {
        const {container} = render(<Spinner size={size}/>);

        const spinner = container.firstChild as HTMLElement;
        expect(spinner.className).toBe(`muncher-spinner muncher-spinner-${size}`);
    });

    it('passes through additional props such as title', () => {
        const {container} = render(<Spinner size="large" title="Loading"/>);

        const spinner = container.firstChild as HTMLElement;
        expect(spinner).toHaveAttribute('title', 'Loading');
    });
});
