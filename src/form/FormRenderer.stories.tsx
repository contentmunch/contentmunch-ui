import type {Meta, StoryObj} from '@storybook/react';
import {FormRenderer} from "./FormRenderer.tsx";
import {NoteWidgetClientProvider} from "../note/NoteWidgetClientProvider.tsx";
import type {Form} from "./model/Form.ts";

// Stands in for a real app's client (see PollRenderer.stories.tsx).
const makeMockClient = (form: Form) => ({
    getForm: async () => form,
    submitFormResponse: async () => ({acknowledged: true}),
});

const feedbackForm: Form = {
    title: "How was this recipe?",
    fieldSchema: [
        {name: "name", type: "TEXT", label: "Your name", required: false},
        {name: "rating", type: "RADIO", label: "Rating", required: true, options: ["1", "2", "3", "4", "5"]},
        {
            name: "likedMost",
            type: "CHECKBOX",
            label: "What did you like?",
            required: false,
            options: ["Flavor", "Prep time", "Ingredients"],
        },
        {name: "comments", type: "TEXTAREA", label: "Anything else?", required: false},
    ],
};

const meta: Meta<typeof FormRenderer> = {
    component: FormRenderer,
    title: 'Content/FormRenderer',
};

export default meta;
type Story = StoryObj<typeof FormRenderer>;

export const Default: Story = {
    render: () => (
        <NoteWidgetClientProvider form={makeMockClient(feedbackForm)}>
            <FormRenderer data-form-nid="hq/abcd"/>
        </NoteWidgetClientProvider>
    ),
};
