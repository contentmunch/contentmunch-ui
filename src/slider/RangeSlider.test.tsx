import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import {RangeSlider} from './RangeSlider';

describe('RangeSlider', () => {
    it('renders min/max labels and the formatted current range using the default currency formatter', () => {
        render(
            <RangeSlider min={1} max={1000} minValue={20} maxValue={600} setMinValue={vi.fn()} setMaxValue={vi.fn()}/>
        );

        expect(screen.getByText('$20.00 - $600.00')).toBeInTheDocument();
        expect(screen.getByText('$1.00')).toBeInTheDocument();
        expect(screen.getByText('$1,000.00')).toBeInTheDocument();
    });

    it('renders two range inputs bound to min and max values', () => {
        render(
            <RangeSlider min={1} max={1000} minValue={20} maxValue={600} setMinValue={vi.fn()} setMaxValue={vi.fn()}/>
        );

        const sliders = screen.getAllByRole('slider') as HTMLInputElement[];
        expect(sliders).toHaveLength(2);
        expect(sliders[0]).toHaveValue('20');
        expect(sliders[1]).toHaveValue('600');
        sliders.forEach(slider => {
            expect(slider).toHaveAttribute('min', '1');
            expect(slider).toHaveAttribute('max', '1000');
        });
    });

    it('calls setMinValue with the new value when changed below the max boundary', () => {
        const setMinValue = vi.fn();
        render(
            <RangeSlider min={1} max={1000} minValue={20} maxValue={600} setMinValue={setMinValue}
                         setMaxValue={vi.fn()}/>
        );

        const [minSlider] = screen.getAllByRole('slider');
        fireChange(minSlider, '100');

        expect(setMinValue).toHaveBeenCalledWith(100);
    });

    it('ignores a min change that would cross the max boundary', () => {
        const setMinValue = vi.fn();
        render(
            <RangeSlider min={1} max={1000} minValue={20} maxValue={600} setMinValue={setMinValue}
                         setMaxValue={vi.fn()}/>
        );

        const [minSlider] = screen.getAllByRole('slider');
        fireChange(minSlider, '700');

        expect(setMinValue).toHaveBeenCalledWith(20);
    });

    it('calls setMaxValue with the new value when changed above the min boundary', () => {
        const setMaxValue = vi.fn();
        render(
            <RangeSlider min={1} max={1000} minValue={20} maxValue={600} setMinValue={vi.fn()}
                         setMaxValue={setMaxValue}/>
        );

        const [, maxSlider] = screen.getAllByRole('slider');
        fireChange(maxSlider, '800');

        expect(setMaxValue).toHaveBeenCalledWith(800);
    });

    it('ignores a max change that would cross the min boundary', () => {
        const setMaxValue = vi.fn();
        render(
            <RangeSlider min={1} max={1000} minValue={20} maxValue={600} setMinValue={vi.fn()}
                         setMaxValue={setMaxValue}/>
        );

        const [, maxSlider] = screen.getAllByRole('slider');
        fireChange(maxSlider, '10');

        expect(setMaxValue).toHaveBeenCalledWith(600);
    });

    it('uses a custom numberFormatter when provided', () => {
        render(
            <RangeSlider min={1} max={1000} minValue={20} maxValue={600} setMinValue={vi.fn()} setMaxValue={vi.fn()}
                         numberFormatter={(num) => `#${num}`}/>
        );

        expect(screen.getByText('#20 - #600')).toBeInTheDocument();
        expect(screen.getByText('#1')).toBeInTheDocument();
        expect(screen.getByText('#1000')).toBeInTheDocument();
    });
});

function fireChange(element: HTMLElement, value: string) {
    const input = element as HTMLInputElement;
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!.set!;
    nativeInputValueSetter.call(input, value);
    input.dispatchEvent(new Event('change', {bubbles: true}));
}
