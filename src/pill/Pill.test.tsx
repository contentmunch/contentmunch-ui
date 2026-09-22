import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Pill} from './Pill';

describe('Pill', () => {
    it('renders children content within the pill', () => {
        const {container} = render(<Pill>Pill 1</Pill>);

        expect(container.querySelector('.muncher-pill')).toBeInTheDocument();
        expect(screen.getByText('Pill 1')).toBeInTheDocument();
    });

    it('renders a close icon', () => {
        const {container} = render(<Pill>Pill 1</Pill>);

        expect(container.querySelector('.close')).toBeInTheDocument();
        expect(container.querySelector('.close svg')).toBeInTheDocument();
    });

    it('fires pillCloseHandler when the close icon is clicked', async () => {
        const user = userEvent.setup();
        const pillCloseHandler = vi.fn();
        const {container} = render(<Pill pillCloseHandler={pillCloseHandler}>Pill 1</Pill>);

        const close = container.querySelector('.close') as HTMLElement;
        await user.click(close);

        expect(pillCloseHandler).toHaveBeenCalledTimes(1);
    });

    it('does not throw when the close icon is clicked without a handler', async () => {
        const user = userEvent.setup();
        const {container} = render(<Pill>Pill 1</Pill>);

        const close = container.querySelector('.close') as HTMLElement;
        await expect(user.click(close)).resolves.not.toThrow();
    });

    it('passes through additional props to the root element', () => {
        render(<Pill data-testid="my-pill">Pill 1</Pill>);

        expect(screen.getByTestId('my-pill')).toBeInTheDocument();
    });
});
