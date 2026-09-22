import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {Slider} from './Slider';

describe('Slider', () => {
    it('renders the formatted current value and min/max labels using the default currency formatter', () => {
        render(<Slider min={1} max={5} value={2} setValue={vi.fn()}/>);

        expect(screen.getByText('$2.00')).toBeInTheDocument();
        expect(screen.getByText('$1.00')).toBeInTheDocument();
        expect(screen.getByText('$5.00')).toBeInTheDocument();
    });

    it('renders a single range input bound to value, min and max', () => {
        render(<Slider min={1} max={5} value={2} setValue={vi.fn()}/>);

        const slider = screen.getByRole('slider') as HTMLInputElement;
        expect(slider).toHaveValue('2');
        expect(slider).toHaveAttribute('min', '1');
        expect(slider).toHaveAttribute('max', '5');
    });

    it('calls setValue with the numeric value on change', () => {
        const setValue = vi.fn();
        render(<Slider min={1} max={5} value={2} setValue={setValue}/>);

        const slider = screen.getByRole('slider');
        fireChange(slider, '4');

        expect(setValue).toHaveBeenCalledWith(4);
    });

    it('uses a custom numberFormatter when provided', () => {
        render(<Slider min={1} max={5} value={2} setValue={vi.fn()} numberFormatter={(num) => `#${num}`}/>);

        expect(screen.getByText('#2')).toBeInTheDocument();
        expect(screen.getByText('#1')).toBeInTheDocument();
        expect(screen.getByText('#5')).toBeInTheDocument();
    });
});

function fireChange(element: HTMLElement, value: string) {
    const input = element as HTMLInputElement;
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!.set!;
    nativeInputValueSetter.call(input, value);
    input.dispatchEvent(new Event('change', {bubbles: true}));
}
