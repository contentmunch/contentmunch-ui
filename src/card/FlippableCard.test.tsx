import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {FlippableCard} from './FlippableCard';

describe('FlippableCard', () => {
    it('renders both front and back content', () => {
        render(
            <FlippableCard
                flipped={false}
                setFlipped={vi.fn()}
                front={<span>Front content</span>}
                back={<span>Back content</span>}
            />
        );

        expect(screen.getByText('Front content')).toBeInTheDocument();
        expect(screen.getByText('Back content')).toBeInTheDocument();
    });

    it('does not apply the flipped class when flipped is false', () => {
        const {container} = render(
            <FlippableCard
                flipped={false}
                setFlipped={vi.fn()}
                front={<span>Front</span>}
                back={<span>Back</span>}
            />
        );

        const card = container.querySelector('.muncher-flippable-card');
        expect(card).not.toBeNull();
        expect(card?.className).not.toContain('flipped');
    });

    it('applies the flipped class when flipped is true', () => {
        const {container} = render(
            <FlippableCard
                flipped={true}
                setFlipped={vi.fn()}
                front={<span>Front</span>}
                back={<span>Back</span>}
            />
        );

        const card = container.querySelector('.muncher-flippable-card');
        expect(card?.className).toContain('flipped');
    });

    it('calls setFlipped with the inverse of the current flipped state when clicked', async () => {
        const user = userEvent.setup();
        const setFlipped = vi.fn();
        const {container} = render(
            <FlippableCard
                flipped={false}
                setFlipped={setFlipped}
                front={<span>Front</span>}
                back={<span>Back</span>}
            />
        );

        const card = container.querySelector('.muncher-flippable-card');
        await user.click(card as Element);

        expect(setFlipped).toHaveBeenCalledTimes(1);
        expect(setFlipped).toHaveBeenCalledWith(true);
    });

    it('toggles back to false when already flipped and clicked', async () => {
        const user = userEvent.setup();
        const setFlipped = vi.fn();
        const {container} = render(
            <FlippableCard
                flipped={true}
                setFlipped={setFlipped}
                front={<span>Front</span>}
                back={<span>Back</span>}
            />
        );

        const card = container.querySelector('.muncher-flippable-card');
        await user.click(card as Element);

        expect(setFlipped).toHaveBeenCalledWith(false);
    });
});
