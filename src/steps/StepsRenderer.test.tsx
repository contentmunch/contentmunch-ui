import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {StepsRenderer, StepsDirectiveError} from './StepsRenderer';

const flatSteps = [
    "Marinate the chicken in yogurt, half the garam masala, cumin, and turmeric",
    "Sear the chicken in a hot pan until browned but not fully cooked through",
    "Finish with cilantro and serve over rice",
];

const nestedSteps = [
    {text: "Understand the ticket/goal and where this change fits architecturally."},
    {
        text: "Confirm requirements are met and no existing functionality is broken.",
        children: {
            ordered: false,
            items: [
                {text: "Manually exercise the golden path"},
                {text: "Check at least one edge case per changed function"},
            ],
        },
    },
    {text: "Verify validations, null checks, and edge cases are handled."},
];

describe('StepsRenderer', () => {
    it('renders nothing when there is no data-steps prop', () => {
        const {container} = render(<StepsRenderer/>);

        expect(container).toBeEmptyDOMElement();
    });

    it('renders nothing when data-steps is invalid JSON', () => {
        const {container} = render(<StepsRenderer data-steps="not json"/>);

        expect(container).toBeEmptyDOMElement();
    });

    it('renders nothing when data-steps parses to an empty array', () => {
        const {container} = render(<StepsRenderer data-steps="[]"/>);

        expect(container).toBeEmptyDOMElement();
    });

    it('renders an unordered list of steps by default', () => {
        const {container} = render(<StepsRenderer data-steps={JSON.stringify(flatSteps)}/>);

        const list = container.querySelector('ul.muncher-steps');
        expect(list).toBeInTheDocument();
        expect(list?.className).not.toContain('muncher-steps--numbered');
        flatSteps.forEach((text) => {
            expect(screen.getByText(text)).toBeInTheDocument();
        });
        expect(screen.getAllByRole('checkbox')).toHaveLength(flatSteps.length);
    });

    it('renders an ordered list with numbers when data-steps-ordered is "true"', () => {
        const {container} = render(
            <StepsRenderer data-steps-ordered="true" data-steps={JSON.stringify(flatSteps)}/>
        );

        const list = container.querySelector('ol.muncher-steps');
        expect(list).toBeInTheDocument();
        expect(list?.className).toContain('muncher-steps--numbered');
        expect(container.querySelectorAll('.muncher-steps-number')).toHaveLength(flatSteps.length);
        expect(screen.getByText('1.')).toBeInTheDocument();
    });

    it('re-declares data-steps and data-steps-ordered on the wrapping div', () => {
        const raw = JSON.stringify(flatSteps);
        const {container} = render(<StepsRenderer data-steps-ordered="true" data-steps={raw}/>);

        const wrapper = container.firstElementChild;
        expect(wrapper?.getAttribute('data-steps')).toBe(raw);
        expect(wrapper?.getAttribute('data-steps-ordered')).toBe('true');
    });

    it('toggles a step checked and strikes it through when clicked', async () => {
        const user = userEvent.setup();
        render(<StepsRenderer data-steps={JSON.stringify(flatSteps)}/>);

        const checkbox = screen.getAllByRole('checkbox')[0];
        expect(checkbox).not.toBeChecked();

        await user.click(checkbox);

        expect(checkbox).toBeChecked();
        expect(screen.getByText(flatSteps[0]).className).toContain('muncher-steps-item--done');

        await user.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });

    it('renders nested sub-lists with independent ordered state and numbering', () => {
        const {container} = render(
            <StepsRenderer data-steps-ordered="true" data-steps={JSON.stringify(nestedSteps)}/>
        );

        // top-level list is ordered
        expect(container.querySelector(':scope > div > ol.muncher-steps')).toBeInTheDocument();
        // nested list (unordered) exists within the second item
        const nestedList = container.querySelector('li ul.muncher-steps');
        expect(nestedList).toBeInTheDocument();
        expect(screen.getByText('Manually exercise the golden path')).toBeInTheDocument();
        expect(screen.getByText('Check at least one edge case per changed function')).toBeInTheDocument();
    });

    it('toggling a nested item does not affect its sibling or parent items', async () => {
        const user = userEvent.setup();
        render(<StepsRenderer data-steps-ordered="true" data-steps={JSON.stringify(nestedSteps)}/>);

        const checkboxes = screen.getAllByRole('checkbox');
        // index 1 corresponds to the parent with children (item 1 at top level)
        const nestedCheckbox = screen.getByText('Manually exercise the golden path')
            .closest('label')!
            .querySelector('input[type="checkbox"]')!;

        await user.click(nestedCheckbox);

        expect(nestedCheckbox).toBeChecked();
        checkboxes.forEach((cb) => {
            if (cb !== nestedCheckbox) {
                expect(cb).not.toBeChecked();
            }
        });
    });
});

describe('StepsDirectiveError', () => {
    it('renders an error message about the invalid directive', () => {
        render(<StepsDirectiveError/>);

        expect(screen.getByText(/Invalid :::steps directive/)).toBeInTheDocument();
    });
});
