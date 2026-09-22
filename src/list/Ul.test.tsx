import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {Ul} from './Ul';

describe('Ul', () => {
    it('renders a ul with the base class', () => {
        const {container} = render(<Ul/>);
        const ul = container.querySelector('ul');
        expect(ul).toBeInTheDocument();
        expect(ul).toHaveClass('muncher-ul');
    });

    it('renders children passed to it', () => {
        render(
            <Ul>
                <li>Item one</li>
                <li>Item two</li>
            </Ul>
        );

        expect(screen.getByText('Item one')).toBeInTheDocument();
        expect(screen.getByText('Item two')).toBeInTheDocument();
    });
});
