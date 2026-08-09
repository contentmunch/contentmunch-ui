export type FormFieldType = "TEXT" | "TEXTAREA" | "RADIO" | "SELECT" | "CHECKBOX" | "NUMBER";

export interface FormField {
    name: string;
    type: FormFieldType;
    label: string;
    required: boolean;
    options?: string[];
}

export interface Form {
    title: string;
    fieldSchema: FormField[];
}

export type FormAnswers = Record<string, string | string[] | number>;

export interface FormSubmissionAck {
    acknowledged: boolean;
}
