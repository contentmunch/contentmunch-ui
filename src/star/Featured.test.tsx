import {describe, expect, it, vi} from 'vitest';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Featured} from './Featured';

describe('Featured', () => {
    it('applies the featured-star class when isFeatured is true', () => {
        const {container} = render(<Featured isFeatured onClick={vi.fn()}/>);

        expect(container.querySelector('.featured-star')).toBeInTheDocument();
        expect(container.querySelector('.un-featured-star')).not.toBeInTheDocument();
    });

    it('applies the un-featured-star class when isFeatured is false', () => {
        const {container} = render(<Featured isFeatured={false} onClick={vi.fn()}/>);

        expect(container.querySelector('.un-featured-star')).toBeInTheDocument();
        expect(container.querySelector('.featured-star')).not.toBeInTheDocument();
    });

    it('fires onClick when the star is clicked', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        const {container} = render(<Featured isFeatured onClick={onClick}/>);

        await user.click(container.querySelector('.featured-star')!);

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
