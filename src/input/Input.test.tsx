import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Input} from './Input';

describe('Input', () => {
    it('renders a text input with the given name and placeholder', () => {
        render(<Input name="query" type="text" placeholder="Type your query"/>);

        const input = screen.getByPlaceholderText('Type your query');
        expect(input).toBeInstanceOf(HTMLInputElement);
        expect(input).toHaveAttribute('name', 'query');
        expect(input).toHaveAttribute('type', 'text');
    });

    it('associates the label via getByLabelText and appends the required asterisk', () => {
        render(<Input name="query" label="Search" required/>);

        const input = screen.getByLabelText('Search', {exact: false});
        expect(input).toBeInstanceOf(HTMLInputElement);
        expect(screen.getByText('Search', {exact: false}).textContent).toBe('Search*');
    });

    it('renders the label on the side when labelPosition is "side"', () => {
        render(<Input name="query" label="Search the string" required labelPosition="side"/>);

        const input = screen.getByLabelText('Search the string', {exact: false});
        expect(input.className).toContain('muncher-label-side');
    });

    it('displays the error message when error is provided', () => {
        render(<Input name="query" label="Search" error="Provide value for Search"/>);

        expect(screen.getByText('Provide value for Search')).toBeInTheDocument();
        expect(screen.getByLabelText('Search').className).toContain('muncher-input-error');
    });

    it('does not display an error message when error is not provided', () => {
        render(<Input name="query" label="Search"/>);

        expect(screen.queryByText('Provide value for Search')).not.toBeInTheDocument();
    });

    it('displays the info message when information is provided', () => {
        render(<Input name="query" label="Search" information="The Value comes from title"/>);

        expect(screen.getByText('The Value comes from title')).toBeInTheDocument();
    });

    it('fires onChange with the typed value', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<Input name="query" value="" onChange={onChange}/>);

        await user.type(screen.getByRole('textbox'), 'hi');

        expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('fires onEnterPress when Enter is pressed', async () => {
        const user = userEvent.setup();
        const onEnterPress = vi.fn();
        render(<Input name="query" value="" onChange={() => {}} onEnterPress={onEnterPress}/>);

        await user.type(screen.getByRole('textbox'), '{Enter}');

        expect(onEnterPress).toHaveBeenCalledTimes(1);
    });

    it('marks the input readOnly when readOnly is set', () => {
        render(<Input name="query" value="fixed" readOnly onChange={() => {}}/>);

        expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    });
});
