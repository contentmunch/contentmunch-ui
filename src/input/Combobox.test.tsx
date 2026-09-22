import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Combobox, type ComboboxItem} from './Combobox';

const items: ComboboxItem[] = [
    {id: 1, name: 'Apple'},
    {id: 2, name: 'Banana'},
    {id: 3, name: 'Cherry'},
];

describe('Combobox', () => {
    it('renders an input pre-filled with the selected item name', () => {
        render(<Combobox name="fruit" items={items} selectedId={2} onSelect={() => {}}/>);

        expect(screen.getByRole('textbox')).toHaveValue('Banana');
    });

    it('renders an empty input when nothing is selected', () => {
        render(<Combobox name="fruit" items={items} selectedId={null} onSelect={() => {}}/>);

        expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('shows matching options when typing and calls onSelect when one is picked', async () => {
        const user = userEvent.setup();
        const onSelect = vi.fn();
        render(<Combobox name="fruit" items={items} selectedId={null} onSelect={onSelect}/>);

        await user.type(screen.getByRole('textbox'), 'an');

        expect(screen.getByRole('button', {name: 'Banana'})).toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Apple'})).not.toBeInTheDocument();

        await user.click(screen.getByRole('button', {name: 'Banana'}));

        expect(onSelect).toHaveBeenCalledWith(2);
        expect(screen.getByRole('textbox')).toHaveValue('Banana');
    });

    it('shows the empty message when no items match', async () => {
        const user = userEvent.setup();
        render(
            <Combobox
                name="fruit"
                items={items}
                selectedId={null}
                onSelect={() => {}}
                emptyMessage="No matching fruit"
            />
        );

        await user.type(screen.getByRole('textbox'), 'zzz');

        expect(screen.getByText('No matching fruit')).toBeInTheDocument();
    });

    it('uses a custom filter function when provided', async () => {
        const user = userEvent.setup();
        const filter = vi.fn((item: ComboboxItem, query: string) => item.name.startsWith(query));
        render(<Combobox name="fruit" items={items} selectedId={null} onSelect={() => {}} filter={filter}/>);

        await user.type(screen.getByRole('textbox'), 'B');

        expect(filter).toHaveBeenCalled();
        expect(screen.getByRole('button', {name: 'Banana'})).toBeInTheDocument();
    });

    it('renders read-only mode with the selected item name and no textbox', () => {
        render(<Combobox name="fruit" items={items} selectedId={2} onSelect={() => {}} readOnly/>);

        expect(screen.getByText('Banana')).toBeInTheDocument();
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });

    it('renders read-only mode with emptyText when nothing is selected', () => {
        render(
            <Combobox name="fruit" items={items} selectedId={null} onSelect={() => {}} readOnly emptyText="None"/>
        );

        expect(screen.getByText('None')).toBeInTheDocument();
    });
});
