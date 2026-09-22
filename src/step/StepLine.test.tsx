import {describe, expect, it} from 'vitest';
import {render} from '@testing-library/react';
import {StepLine} from './StepLine';

describe('StepLine', () => {
    it('renders a div with the step line class', () => {
        const {container} = render(<StepLine/>);

        const line = container.querySelector('.muncher-step--line');
        expect(line).toBeInTheDocument();
        expect(line?.tagName).toBe('DIV');
    });
});
