import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import {FestivalSectionCard, type FestivalSectionCardNote} from './FestivalSectionCard';

const mainNote: FestivalSectionCardNote = {
    title: 'Janai Purnima / Kwati Punhi',
    renderedContent: `<article xmlns="http://www.w3.org/1999/xhtml"><p>Rooted in the Puranic legend.</p></article>`,
};

describe('FestivalSectionCard', () => {
    it('renders the eyebrow, title and body for a MAIN section by default', () => {
        render(<FestivalSectionCard note={mainNote} section={{section: 'MAIN', sequenceOrder: 0}}/>);

        expect(screen.getByText('Festival')).toBeInTheDocument();
        expect(screen.getByRole('heading', {name: mainNote.title})).toBeInTheDocument();
        expect(screen.getByText('Rooted in the Puranic legend.')).toBeInTheDocument();
    });

    it('maps LEARNING and RITUAL sections to their own eyebrow labels', () => {
        const {rerender} = render(
            <FestivalSectionCard
                note={{title: 'Learning', renderedContent: '<article><p>Body</p></article>'}}
                section={{section: 'LEARNING', sequenceOrder: 1}}
            />
        );
        expect(screen.getByText('Festival learning')).toBeInTheDocument();

        rerender(
            <FestivalSectionCard
                note={{title: 'Ritual', renderedContent: '<article><p>Body</p></article>'}}
                section={{section: 'RITUAL', sequenceOrder: 2}}
            />
        );
        expect(screen.getByText('Ritual & observance')).toBeInTheDocument();
    });

    it('hides the eyebrow when showEyebrow is false', () => {
        render(
            <FestivalSectionCard note={mainNote} section={{section: 'MAIN', sequenceOrder: 0}} showEyebrow={false}/>
        );
        expect(screen.queryByText('Festival')).not.toBeInTheDocument();
        expect(screen.getByRole('heading', {name: mainNote.title})).toBeInTheDocument();
    });

    it('hides the title when showTitle is false', () => {
        render(
            <FestivalSectionCard note={mainNote} section={{section: 'MAIN', sequenceOrder: 0}} showTitle={false}/>
        );
        expect(screen.queryByRole('heading', {name: mainNote.title})).not.toBeInTheDocument();
        expect(screen.getByText('Festival')).toBeInTheDocument();
    });

    it('applies the muncher-festival-section-card and body classes', () => {
        const {container} = render(
            <FestivalSectionCard note={mainNote} section={{section: 'MAIN', sequenceOrder: 0}}/>
        );
        expect(container.querySelector('.muncher-festival-section-card')).not.toBeNull();
        expect(container.querySelector('.muncher-festival-section-body')).not.toBeNull();
    });
});
