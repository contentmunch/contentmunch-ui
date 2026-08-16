import type {Meta, StoryObj} from '@storybook/react';
import {StepsRenderer} from "./StepsRenderer.tsx";

const meta: Meta<typeof StepsRenderer> = {
    component: StepsRenderer,
    title: 'Content/StepsRenderer',
};

export default meta;
type Story = StoryObj<typeof StepsRenderer>;

export const Checklist: Story = {
    render: () => (
        <StepsRenderer data-steps={JSON.stringify([
            "Marinate the chicken in yogurt, half the garam masala, cumin, and turmeric",
            "Sear the chicken in a hot pan until browned but not fully cooked through",
            "In the same pan, melt the butter and sauté the onion until soft",
            "Stir in the remaining spices, then the crushed tomatoes. Simmer 10 minutes",
            "Return the chicken to the pan, add the cream, and simmer until cooked through",
            "Finish with cilantro and serve over rice",
        ])}/>
    ),
};

export const Numbered: Story = {
    render: () => (
        <StepsRenderer
            data-steps-ordered="true"
            data-steps={JSON.stringify([
                "Marinate the chicken in yogurt, half the garam masala, cumin, and turmeric",
                "Sear the chicken in a hot pan until browned but not fully cooked through",
                "In the same pan, melt the butter and sauté the onion until soft",
                "Stir in the remaining spices, then the crushed tomatoes. Simmer 10 minutes",
                "Return the chicken to the pan, add the cream, and simmer until cooked through",
                "Finish with cilantro and serve over rice",
            ])}/>
    ),
};
