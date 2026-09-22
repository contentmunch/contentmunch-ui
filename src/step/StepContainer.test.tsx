import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {StepContainer} from './StepContainer';
import {Step} from './Step';
import {StepLine} from './StepLine';

describe('StepContainer', () => {
    it('renders with the container class', () => {
        const {container} = render(<StepContainer>content</StepContainer>);

        expect(container.querySelector('.muncher-step--container')).toBeInTheDocument();
    });

    it('renders its children', () => {
        render(
            <StepContainer>
                <Step active label="You are here">1</Step>
                <StepLine/>
                <Step>2</Step>
            </StepContainer>
        );

        expect(screen.getByText('You are here')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
    });
});
