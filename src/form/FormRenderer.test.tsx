import {describe, expect, it, vi} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {FormRenderer} from './FormRenderer';
import {FormSubmissionError} from './FormWidgetClient';
import {NoteWidgetClientProvider} from '../note/NoteWidgetClientProvider.tsx';
import type {Form, FormAnswers, FormSubmissionAck} from './model/Form.ts';

const feedbackForm: Form = {
    title: 'How was this recipe?',
    fieldSchema: [
        {name: 'name', type: 'TEXT', label: 'Your name', required: false},
        {name: 'age', type: 'NUMBER', label: 'Your age', required: false},
        {name: 'rating', type: 'RADIO', label: 'Rating', required: true, options: ['1', '2', '3']},
        {
            name: 'likedMost',
            type: 'CHECKBOX',
            label: 'What did you like?',
            required: false,
            options: ['Flavor', 'Prep time'],
        },
        {name: 'course', type: 'SELECT', label: 'Course type', required: true, options: ['Starter', 'Main']},
        {name: 'comments', type: 'TEXTAREA', label: 'Anything else?', required: false},
    ],
};

const makeMockClient = (
    form: Form,
    overrides: Partial<{
        getForm: (bucket: string, formId: string) => Promise<Form>;
        submitFormResponse: (bucket: string, formId: string, answers: FormAnswers) => Promise<FormSubmissionAck>;
    }> = {}
) => ({
    getForm: overrides.getForm ?? (async () => form),
    submitFormResponse: overrides.submitFormResponse ?? (async () => ({acknowledged: true})),
});

const renderForm = (nid: string, client: ReturnType<typeof makeMockClient>) =>
    render(
        <NoteWidgetClientProvider form={client}>
            <FormRenderer data-form-nid={nid}/>
        </NoteWidgetClientProvider>
    );

describe('FormRenderer', () => {
    it('renders an error when data-form-nid is missing', () => {
        const client = makeMockClient(feedbackForm);
        render(
            <NoteWidgetClientProvider form={client}>
                <FormRenderer/>
            </NoteWidgetClientProvider>
        );

        expect(screen.getByText(':form is missing a required nid attribute')).toBeInTheDocument();
    });

    it('shows a loading state before the form resolves', () => {
        const client = makeMockClient(feedbackForm, {
            getForm: () => new Promise(() => {
                // never resolves for this assertion
            }),
        });

        const {container} = renderForm('bucket-loading/form1', client);

        expect(container.querySelector('.form-embed-loading')).toBeInTheDocument();
    });

    it('renders an error when the nid is malformed (no bucket/formId split)', async () => {
        const client = makeMockClient(feedbackForm);
        renderForm('malformed-nid', client);

        await waitFor(() => {
            expect(screen.getByText('Could not resolve form "malformed-nid"')).toBeInTheDocument();
        });
    });

    it('renders an error when getForm rejects', async () => {
        const client = makeMockClient(feedbackForm, {
            getForm: async () => {
                throw new Error('network error');
            },
        });

        renderForm('bucket-err/form2', client);

        await waitFor(() => {
            expect(screen.getByText('Could not resolve form "bucket-err/form2"')).toBeInTheDocument();
        });
    });

    it('renders the form title and every field type once loaded', async () => {
        const client = makeMockClient(feedbackForm);
        renderForm('bucket-fields/form3', client);

        await waitFor(() => {
            expect(screen.getByText('How was this recipe?')).toBeInTheDocument();
        });

        expect(screen.getByLabelText('Your name')).toBeInTheDocument();
        expect(screen.getByLabelText('Your age')).toBeInTheDocument();
        expect(screen.getByText('Rating')).toBeInTheDocument();
        expect(screen.getAllByRole('radio')).toHaveLength(3);
        expect(screen.getByText('What did you like?')).toBeInTheDocument();
        expect(screen.getAllByRole('checkbox')).toHaveLength(2);
        expect(screen.getByLabelText(/Course type/)).toBeInTheDocument();
        expect(screen.getByLabelText('Anything else?')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Submit'})).toBeInTheDocument();
    });

    it('disables submit until required fields are answered, then enables it', async () => {
        const user = userEvent.setup();
        const client = makeMockClient(feedbackForm);
        renderForm('bucket-required/form4', client);

        await waitFor(() => {
            expect(screen.getByText('How was this recipe?')).toBeInTheDocument();
        });

        const submitButton = screen.getByRole('button', {name: 'Submit'});
        expect(submitButton).toBeDisabled();

        // Answer required RADIO field.
        const radios = screen.getAllByRole('radio');
        await user.click(radios[0]);
        expect(submitButton).toBeDisabled();

        // Answer required SELECT field.
        const select = screen.getByLabelText(/Course type/);
        await user.selectOptions(select, 'Starter');

        expect(submitButton).not.toBeDisabled();
    });

    it('submits the answers and shows the acknowledgement message', async () => {
        const user = userEvent.setup();
        const submitFormResponse = vi.fn(async () => ({acknowledged: true}));
        const client = makeMockClient(feedbackForm, {submitFormResponse});
        renderForm('bucket-submit/form5', client);

        await waitFor(() => {
            expect(screen.getByText('How was this recipe?')).toBeInTheDocument();
        });

        await user.click(screen.getAllByRole('radio')[1]);
        await user.selectOptions(screen.getByLabelText(/Course type/), 'Main');
        await user.type(screen.getByLabelText('Your name'), 'Ada');

        await user.click(screen.getByRole('button', {name: 'Submit'}));

        await waitFor(() => {
            expect(screen.getByText('Your response has been recorded.')).toBeInTheDocument();
        });

        expect(submitFormResponse).toHaveBeenCalledTimes(1);
        expect(submitFormResponse).toHaveBeenCalledWith(
            'bucket-submit',
            'form5',
            expect.objectContaining({rating: '2', course: 'Main', name: 'Ada'})
        );
    });

    it('shows the backend-provided message when submission throws a FormSubmissionError', async () => {
        const user = userEvent.setup();
        const client = makeMockClient(feedbackForm, {
            submitFormResponse: async () => {
                throw new FormSubmissionError("Field 'rating' is required");
            },
        });
        renderForm('bucket-suberr/form6', client);

        await waitFor(() => {
            expect(screen.getByText('How was this recipe?')).toBeInTheDocument();
        });

        await user.click(screen.getAllByRole('radio')[0]);
        await user.selectOptions(screen.getByLabelText(/Course type/), 'Starter');
        await user.click(screen.getByRole('button', {name: 'Submit'}));

        await waitFor(() => {
            expect(screen.getByText("Field 'rating' is required")).toBeInTheDocument();
        });
    });

    it('shows a generic fallback message when submission throws a non-FormSubmissionError', async () => {
        const user = userEvent.setup();
        const client = makeMockClient(feedbackForm, {
            submitFormResponse: async () => {
                throw new Error('boom');
            },
        });
        renderForm('bucket-generr/form7', client);

        await waitFor(() => {
            expect(screen.getByText('How was this recipe?')).toBeInTheDocument();
        });

        await user.click(screen.getAllByRole('radio')[0]);
        await user.selectOptions(screen.getByLabelText(/Course type/), 'Starter');
        await user.click(screen.getByRole('button', {name: 'Submit'}));

        await waitFor(() => {
            expect(screen.getByText('Could not submit your response. Please try again.')).toBeInTheDocument();
        });
    });

    it('toggles checkbox options on and off', async () => {
        const user = userEvent.setup();
        const submitFormResponse = vi.fn(async () => ({acknowledged: true}));
        const client = makeMockClient(feedbackForm, {submitFormResponse});
        renderForm('bucket-checkbox/form8', client);

        await waitFor(() => {
            expect(screen.getByText('How was this recipe?')).toBeInTheDocument();
        });

        const checkboxes = screen.getAllByRole('checkbox');
        await user.click(checkboxes[0]);
        await user.click(checkboxes[1]);
        await user.click(checkboxes[0]);

        await user.click(screen.getAllByRole('radio')[0]);
        await user.selectOptions(screen.getByLabelText(/Course type/), 'Starter');
        await user.click(screen.getByRole('button', {name: 'Submit'}));

        await waitFor(() => {
            expect(submitFormResponse).toHaveBeenCalledWith(
                'bucket-checkbox',
                'form8',
                expect.objectContaining({likedMost: ['Prep time']})
            );
        });
    });
});
