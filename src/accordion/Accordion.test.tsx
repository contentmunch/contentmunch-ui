import {describe, expect, it} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Accordion} from './Accordion';

const folds = [
    {heading: 'First', body: <p>First body</p>},
    {heading: 'Second', body: <p>Second body</p>},
    {heading: 'Third', body: <p>Third body</p>},
];

describe('Accordion', () => {
    it('renders all fold headings and expands the first fold by default', () => {
        render(<Accordion>{{folds}}</Accordion>);

        expect(screen.getByRole('button', {name: 'First'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Second'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Third'})).toBeInTheDocument();

        const firstFold = screen.getByRole('button', {name: 'First'}).closest('.fold');
        expect(firstFold).toHaveClass('active');
        expect(firstFold).toHaveAttribute('aria-expanded', 'true');
    });

    it('collapses all folds when collapsed prop is true', () => {
        render(<Accordion collapsed>{{folds}}</Accordion>);

        const firstFold = screen.getByRole('button', {name: 'First'}).closest('.fold');
        expect(firstFold).not.toHaveClass('active');
        expect(firstFold).toHaveAttribute('aria-expanded', 'false');
    });

    it('applies variant class and custom className', () => {
        render(<Accordion variant="secondary" className="extra">{{folds}}</Accordion>);

        const button = screen.getByRole('button', {name: 'First'});
        expect(button.className).toContain('fold-button--secondary');

        const container = button.closest('.muncher-accordion');
        expect(container).toHaveClass('extra');
    });

    it('applies foldColor modifier classes when a fold specifies a color', () => {
        const coloredFolds = [
            {heading: 'Colored', body: <p>Body</p>, foldColor: 'maroon' as const},
        ];
        render(<Accordion>{{folds: coloredFolds}}</Accordion>);

        const button = screen.getByRole('button', {name: 'Colored'});
        expect(button.className).toContain('fold-button--primary');
        expect(button.className).toContain('fold-button--maroon');
    });

    it('toggles a fold open and closed when its button is clicked', async () => {
        const user = userEvent.setup();
        render(<Accordion collapsed>{{folds}}</Accordion>);

        const secondButton = screen.getByRole('button', {name: 'Second'});
        const secondFold = secondButton.closest('.fold');
        expect(secondFold).not.toHaveClass('active');

        await user.click(secondButton);
        expect(secondFold).toHaveClass('active');

        await user.click(secondButton);
        expect(secondFold).not.toHaveClass('active');
    });

    it('switches active fold when a different fold button is clicked', async () => {
        const user = userEvent.setup();
        render(<Accordion>{{folds}}</Accordion>);

        const firstFold = screen.getByRole('button', {name: 'First'}).closest('.fold');
        const secondButton = screen.getByRole('button', {name: 'Second'});
        const secondFold = secondButton.closest('.fold');

        expect(firstFold).toHaveClass('active');
        expect(secondFold).not.toHaveClass('active');

        await user.click(secondButton);

        expect(firstFold).not.toHaveClass('active');
        expect(secondFold).toHaveClass('active');
    });

    it('navigates to the next fold on ArrowDown key press', () => {
        // no `collapsed`: currentIndex starts at 0 (First active), so ArrowDown
        // moves relative to that to index 1 (Second). The handler moves relative to
        // React state (currentIndex), not to whichever button dispatched the event,
        // so starting from `collapsed` (currentIndex -1) would land on index 0 instead.
        render(<Accordion>{{folds}}</Accordion>);

        const firstButton = screen.getByRole('button', {name: 'First'});
        firstButton.focus();
        fireEvent.keyDown(firstButton, {which: 40, keyCode: 40});

        const secondFold = screen.getByRole('button', {name: 'Second'}).closest('.fold');
        expect(secondFold).toHaveClass('active');
    });

    it('navigates to the last fold on End key press', () => {
        render(<Accordion>{{folds}}</Accordion>);

        const firstButton = screen.getByRole('button', {name: 'First'});
        fireEvent.keyDown(firstButton, {which: 35, keyCode: 35});

        const thirdFold = screen.getByRole('button', {name: 'Third'}).closest('.fold');
        expect(thirdFold).toHaveClass('active');
    });

    it('navigates to the first fold on Home key press', () => {
        render(<Accordion collapsed>{{folds}}</Accordion>);

        const thirdButton = screen.getByRole('button', {name: 'Third'});
        fireEvent.keyDown(thirdButton, {which: 36, keyCode: 36});

        const firstFold = screen.getByRole('button', {name: 'First'}).closest('.fold');
        expect(firstFold).toHaveClass('active');
    });

    it('renders the body content of each fold', () => {
        render(<Accordion>{{folds}}</Accordion>);

        expect(screen.getByText('First body')).toBeInTheDocument();
        expect(screen.getByText('Second body')).toBeInTheDocument();
        expect(screen.getByText('Third body')).toBeInTheDocument();
    });
});
