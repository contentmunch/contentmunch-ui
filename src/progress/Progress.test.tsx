import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {Progress} from './Progress';

describe('Progress', () => {
    it('renders the progress element with the given value and max', () => {
        render(<Progress value={30} max={100}/>);

        const progress = screen.getByRole('progressbar') as HTMLProgressElement;
        expect(progress).toHaveAttribute('value', '30');
        expect(progress).toHaveAttribute('max', '100');
    });

    it('renders the computed percentage label when no label prop is given', () => {
        const {container} = render(<Progress value={30} max={100}/>);

        const label = container.querySelector('label') as HTMLLabelElement;
        expect(label).toHaveTextContent('30%');
    });

    it('prefixes the percentage with the label prop when provided', () => {
        const {container} = render(<Progress value={30} max={100} label="Progress:"/>);

        const label = container.querySelector('label') as HTMLLabelElement;
        expect(label).toHaveTextContent('Progress: 30%');
    });

    it('rounds the computed percentage', () => {
        const {container} = render(<Progress value={1} max={3}/>);

        const label = container.querySelector('label') as HTMLLabelElement;
        expect(label).toHaveTextContent('33%');
    });

    it('associates the label with the progress element', () => {
        const {container} = render(<Progress value={50} max={100} label="Uploading"/>);

        const label = container.querySelector('label') as HTMLLabelElement;
        expect(label).toHaveTextContent('Uploading 50%');
        expect(label).toHaveAttribute('for', 'progress');
        expect(screen.getByRole('progressbar')).toHaveAttribute('id', 'progress');
    });
});
