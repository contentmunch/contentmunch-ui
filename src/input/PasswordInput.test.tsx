import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {PasswordInput} from './PasswordInput';

describe('PasswordInput', () => {
    it('renders a password field associated with its label', () => {
        render(<PasswordInput name="password" label="Password"/>);

        const input = screen.getByLabelText('Password', {exact: false});
        expect(input).toHaveAttribute('type', 'password');
        expect(input).toHaveAttribute('name', 'password');
    });

    it('shows a required asterisk on the label when required', () => {
        render(<PasswordInput name="password" label="Password" required/>);

        expect(screen.getByText('Password', {exact: false}).textContent).toBe('Password*');
    });

    it('does not show an asterisk when not required', () => {
        render(<PasswordInput name="password" label="Password"/>);

        expect(screen.queryByText('Password*')).not.toBeInTheDocument();
        expect(screen.getByText('Password')).toBeInTheDocument();
    });

    it('renders the placeholder and current value', () => {
        render(<PasswordInput name="password" label="Password" placeholder="Enter password" value="secret123"/>);

        const input = screen.getByLabelText('Password', {exact: false}) as HTMLInputElement;
        expect(input).toHaveAttribute('placeholder', 'Enter password');
        expect(input.value).toBe('secret123');
    });

    it('displays an error message when error is provided', () => {
        render(<PasswordInput name="password" label="Password" error="Password is required"/>);

        expect(screen.getByText('Password is required')).toBeInTheDocument();
    });

    it('fires onChange when the user types', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<PasswordInput name="password" label="Password" value="" onChange={onChange}/>);

        const input = screen.getByLabelText('Password', {exact: false});
        await user.type(input, 'a');

        expect(onChange).toHaveBeenCalled();
    });

    it('toggles visibility between password and text when the hover icon is clicked', async () => {
        const user = userEvent.setup();
        render(<PasswordInput name="password" label="Password" value="secret" onChange={() => {}}/>);

        const input = screen.getByLabelText('Password', {exact: false});
        expect(input).toHaveAttribute('type', 'password');

        const toggle = document.querySelector('.muncher-icon-hover svg') as HTMLElement;
        expect(toggle).not.toBeNull();

        await user.click(toggle);
        expect(input).toHaveAttribute('type', 'text');

        await user.click(toggle);
        expect(input).toHaveAttribute('type', 'password');
    });

    it('supports the side label position', () => {
        render(<PasswordInput name="password" label="Password" labelPosition="side"/>);

        const wrapper = document.querySelector('.muncher-label-side');
        expect(wrapper).not.toBeNull();
    });
});
