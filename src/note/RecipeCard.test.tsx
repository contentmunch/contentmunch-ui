import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {RecipeCard, type RecipeCardData, type RecipeCardNote} from './RecipeCard';

const noteWithHero: RecipeCardNote = {
    title: 'Chicken Tikka Masala',
    renderedContent: `<article xmlns="http://www.w3.org/1999/xhtml"><p><span data-media-image-role="hero"><img alt="Chicken Tikka Masala" src="https://example.com/hero.jpg" /></span></p>
<p>A weeknight favorite.</p>
<h2 id="notes">Notes</h2>
<ul><li>Marinate overnight.</li></ul></article>`,
};

const recipe: RecipeCardData = {
    servings: 4,
    prepMinutes: 20,
    cookMinutes: 35,
    ingredients: [
        {name: 'boneless chicken thighs', amount: 1.5, unit: 'fl oz'},
        {name: 'plain yogurt', amount: 0.5, unit: 'cup'},
    ],
    instructions: [
        {text: 'Marinate the chicken.'},
        {text: 'Sear the chicken.'},
    ],
};

describe('RecipeCard', () => {
    it('splits the hero photo out of the note body and renders it', () => {
        render(<RecipeCard note={noteWithHero} recipe={recipe}/>);

        const hero = screen.getByRole('img', {name: 'Chicken Tikka Masala'});
        expect(hero).toHaveAttribute('src', 'https://example.com/hero.jpg');
        expect(hero.className).toContain('muncher-recipe-photo');
    });

    it('does not duplicate the hero photo inside the notes body', () => {
        const {container} = render(<RecipeCard note={noteWithHero} recipe={recipe}/>);
        const notesBody = container.querySelector('.muncher-recipe-notes');
        expect(notesBody?.querySelector('[data-media-image-role="hero"]')).toBeNull();
        expect(notesBody?.textContent).toContain('A weeknight favorite.');
        expect(notesBody?.textContent).toContain('Marinate overnight.');
    });

    it('renders no hero image when the note has no hero directive', () => {
        render(
            <RecipeCard
                note={{title: 'Scrambled Eggs', renderedContent: ''}}
                recipe={{servings: 2, ingredients: [{name: 'eggs', amount: 2}], instructions: [{text: 'Scramble.'}]}}
            />
        );
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('renders servings, prep, cook and total duration vitals', () => {
        render(<RecipeCard note={noteWithHero} recipe={recipe}/>);

        expect(screen.getByText('Servings')).toBeInTheDocument();
        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.getByText('Prep')).toBeInTheDocument();
        expect(screen.getByText('20 min')).toBeInTheDocument();
        expect(screen.getByText('Cook')).toBeInTheDocument();
        expect(screen.getByText('35 min')).toBeInTheDocument();
        expect(screen.getByText('Total')).toBeInTheDocument();
        // 20 + 35 = 55 minutes -> under an hour, formatted as "55m"
        expect(screen.getByText('55m')).toBeInTheDocument();
    });

    it('formats a total duration over an hour as "Xh Ym"', () => {
        render(
            <RecipeCard
                note={noteWithHero}
                recipe={{...recipe, prepMinutes: 40, cookMinutes: 30}}
            />
        );
        expect(screen.getByText('1h 10m')).toBeInTheDocument();
    });

    it('formats a total duration that is an exact number of hours as "Xh"', () => {
        render(
            <RecipeCard
                note={noteWithHero}
                recipe={{...recipe, prepMinutes: 30, cookMinutes: 30}}
            />
        );
        expect(screen.getByText('1h')).toBeInTheDocument();
    });

    it('omits prep/cook/total vitals entirely when not provided', () => {
        render(
            <RecipeCard
                note={noteWithHero}
                recipe={{servings: 2, ingredients: [{name: 'eggs', amount: 2}], instructions: [{text: 'Scramble.'}]}}
            />
        );
        expect(screen.queryByText('Prep')).not.toBeInTheDocument();
        expect(screen.queryByText('Cook')).not.toBeInTheDocument();
        expect(screen.queryByText('Total')).not.toBeInTheDocument();
    });

    it('renders every instruction step, numbered, and every ingredient', () => {
        render(<RecipeCard note={noteWithHero} recipe={recipe}/>);

        expect(screen.getByText('Marinate the chicken.')).toBeInTheDocument();
        expect(screen.getByText('Sear the chicken.')).toBeInTheDocument();
        expect(screen.getByText('1.5 fl oz boneless chicken thighs')).toBeInTheDocument();
        expect(screen.getByText('0.5 cup plain yogurt')).toBeInTheDocument();
    });

    it('toggles a step done when clicked, and back when clicked again', async () => {
        const user = userEvent.setup();
        render(<RecipeCard note={noteWithHero} recipe={recipe}/>);

        const step = screen.getByText('Marinate the chicken.').closest('li') as HTMLElement;
        expect(step).toHaveAttribute('aria-checked', 'false');

        await user.click(step);
        expect(step).toHaveAttribute('aria-checked', 'true');
        expect(step.className).toContain('muncher-recipe-item--done');

        await user.click(step);
        expect(step).toHaveAttribute('aria-checked', 'false');
        expect(step.className).not.toContain('muncher-recipe-item--done');
    });

    it('toggles an ingredient done via the keyboard (Enter/Space)', async () => {
        const user = userEvent.setup();
        render(<RecipeCard note={noteWithHero} recipe={recipe}/>);

        const ingredient = screen.getByText('1.5 fl oz boneless chicken thighs').closest('li') as HTMLElement;
        ingredient.focus();
        expect(ingredient).toHaveAttribute('aria-checked', 'false');

        await user.keyboard(' ');
        expect(ingredient).toHaveAttribute('aria-checked', 'true');

        await user.keyboard('{Enter}');
        expect(ingredient).toHaveAttribute('aria-checked', 'false');
    });

    it('toggling one step does not affect other steps or ingredients', async () => {
        const user = userEvent.setup();
        render(<RecipeCard note={noteWithHero} recipe={recipe}/>);

        const firstStep = screen.getByText('Marinate the chicken.').closest('li') as HTMLElement;
        const secondStep = screen.getByText('Sear the chicken.').closest('li') as HTMLElement;

        await user.click(firstStep);

        expect(firstStep).toHaveAttribute('aria-checked', 'true');
        expect(secondStep).toHaveAttribute('aria-checked', 'false');
    });
});
