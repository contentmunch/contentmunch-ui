import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ItemSlider} from './ItemSlider';

const items = [
    <div key="1" data-testid="item-1">Item 1</div>,
    <div key="2" data-testid="item-2">Item 2</div>,
    <div key="3" data-testid="item-3">Item 3</div>,
];

describe('ItemSlider', () => {
    it('renders all slider items', () => {
        render(<ItemSlider sliderItems={items}/>);

        expect(screen.getByTestId('item-1')).toBeInTheDocument();
        expect(screen.getByTestId('item-2')).toBeInTheDocument();
        expect(screen.getByTestId('item-3')).toBeInTheDocument();
    });

    it('renders no navigation buttons for a single item', () => {
        render(<ItemSlider sliderItems={[items[0]]}/>);

        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('only shows the right navigation button at the first item', () => {
        render(<ItemSlider sliderItems={items}/>);

        expect(screen.queryByTitle('Navigate Left')).not.toBeInTheDocument();
        expect(screen.getByTitle('Navigate Right')).toBeInTheDocument();
    });

    it('navigates to the next item when the right nav button is clicked', async () => {
        const user = userEvent.setup();
        render(<ItemSlider sliderItems={items}/>);

        await user.click(screen.getByTitle('Navigate Right'));

        expect(screen.getByTitle('Navigate Left')).toBeInTheDocument();
        expect(screen.getByTitle('Navigate Right')).toBeInTheDocument();
    });

    it('shows only the left nav button once on the last item', async () => {
        const user = userEvent.setup();
        render(<ItemSlider sliderItems={items}/>);

        await user.click(screen.getByTitle('Navigate Right'));
        await user.click(screen.getByTitle('Navigate Right'));

        expect(screen.getByTitle('Navigate Left')).toBeInTheDocument();
        expect(screen.queryByTitle('Navigate Right')).not.toBeInTheDocument();
    });

    it('navigates backward when the left nav button is clicked', async () => {
        const user = userEvent.setup();
        render(<ItemSlider sliderItems={items}/>);

        await user.click(screen.getByTitle('Navigate Right'));
        await user.click(screen.getByTitle('Navigate Left'));

        expect(screen.queryByTitle('Navigate Left')).not.toBeInTheDocument();
        expect(screen.getByTitle('Navigate Right')).toBeInTheDocument();
    });

    it('renders nav buttons outside the slider container when navButtonPlacement="outside"', () => {
        const {container} = render(<ItemSlider sliderItems={items} navButtonPlacement="outside"/>);

        expect(container.querySelector('.muncher-item-slider-wrapper--outside')).toBeInTheDocument();
    });

    it('defaults to nav buttons placed inside the slider container', () => {
        const {container} = render(<ItemSlider sliderItems={items}/>);

        expect(container.querySelector('.muncher-item-slider-wrapper--inside')).toBeInTheDocument();
    });
});
