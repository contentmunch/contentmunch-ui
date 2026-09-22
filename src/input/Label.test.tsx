import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Label} from './Label';

describe('Label', () => {
    it('renders the label text and associates it with the given id via htmlFor', () => {
        render(<Label label="Name" id="name-field"/>);

        const label = screen.getByText('Name');
        expect(label.tagName).toBe('LABEL');
        expect(label).toHaveAttribute('for', 'name-field');
    });

    it('does not append an asterisk when not required', () => {
        render(<Label label="Name" id="name-field"/>);

        expect(screen.getByText('Name').textContent).toBe('Name');
    });

    it('appends a "*" with no space when required', () => {
        render(<Label label="Name" id="name-field" required/>);

        const label = screen.getByText('Name', {exact: false});
        expect(label.textContent).toBe('Name*');
    });

    it('fires the onClick handler when clicked', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<Label label="Name" id="name-field" onClick={onClick}/>);

        await user.click(screen.getByText('Name'));

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
