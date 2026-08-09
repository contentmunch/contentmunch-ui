import type {Form, FormAnswers, FormSubmissionAck} from "./model/Form.ts";

// Same reasoning as PollWidgetClient -- FormRenderer only knows about these
// two calls, never about auth/transport.
export interface FormWidgetClient {
    getForm(bucket: string, formId: string): Promise<Form>;

    submitFormResponse(bucket: string, formId: string, answers: FormAnswers): Promise<FormSubmissionAck>;
}

// Thrown by a client implementation's submitFormResponse to surface a
// backend-provided validation message (e.g. "Field 'name' is required")
// verbatim to the user, instead of FormRenderer's generic fallback message.
export class FormSubmissionError extends Error {
}
