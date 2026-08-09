import React, {useEffect, useState} from "react";
import {Button} from "../button/Button.tsx";
import {Checkbox} from "../input/Checkbox.tsx";
import {Input} from "../input/Input.tsx";
import {Radio} from "../input/Radio.tsx";
import {Select} from "../input/Select.tsx";
import {Textarea} from "../input/Textarea.tsx";
import {useFormWidgetClient} from "../note/NoteWidgetClientProvider.tsx";
import {FormSubmissionError} from "./FormWidgetClient.ts";
import type {Form, FormAnswers, FormField} from "./model/Form.ts";
import "./assets/form.css";

export interface FormRendererProps extends React.ComponentProps<"div"> {
    "data-form-nid"?: string;
}

const formCache = new Map<string, Promise<Form>>();

const fetchForm = (
    nid: string,
    getForm: (bucket: string, formId: string) => Promise<Form>
): Promise<Form> => {
    let pending = formCache.get(nid);
    if (!pending) {
        const [bucket, formId] = nid.split("/");
        pending = (!bucket || !formId)
            ? Promise.reject(new Error(`invalid form nid "${nid}" — expected "bucket/nid"`))
            : getForm(bucket, formId);

        pending.catch(() => formCache.delete(nid));
        formCache.set(nid, pending);
    }
    return pending;
};

const isAnswered = (field: FormField, value: string | string[] | number | undefined): boolean => {
    if (!field.required) return true;
    if (value === undefined) return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "number") return !Number.isNaN(value);
    return value.trim().length > 0;
};

export const FormRenderer: React.FC<FormRendererProps> = (props) => {
    const nid = props["data-form-nid"];
    const {getForm, submitFormResponse} = useFormWidgetClient();

    const [form, setForm] = useState<Form | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [answers, setAnswers] = useState<FormAnswers>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    // Ephemeral, mount-scoped only -- unlike Poll, a form has no per-user
    // "already responded" state on the backend, so this never survives a
    // refresh or navigating away and back. Submitting resets the form to
    // accept new input on the next mount, by design.
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!nid) return;
        let cancelled = false;
        setForm(null);
        setError(null);
        setAnswers({});
        setSubmitted(false);

        fetchForm(nid, getForm)
            .then((fetched) => {
                if (cancelled) return;
                setForm(fetched);
            })
            .catch(() => {
                if (!cancelled) setError(`Could not resolve form "${nid}"`);
            });

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nid]);

    if (!nid) {
        return <span className="external-link-error">:form is missing a required nid attribute</span>;
    }
    if (error) {
        return <span className="external-link-error">{error}</span>;
    }
    if (!form) {
        return <div data-form-nid={nid} className="form-embed-loading">…</div>;
    }

    const [bucket, formId] = nid.split("/");

    const setAnswer = (name: string, value: string | string[] | number) => {
        setAnswers(prev => ({...prev, [name]: value}));
    };

    const toggleCheckboxOption = (name: string, option: string) => {
        setAnswers(prev => {
            const current = Array.isArray(prev[name]) ? prev[name] as string[] : [];
            const next = current.includes(option) ? current.filter(o => o !== option) : [...current, option];
            return {...prev, [name]: next};
        });
    };

    const allRequiredAnswered = form.fieldSchema.every(field => isAnswered(field, answers[field.name]));

    const handleSubmit = async () => {
        if (!allRequiredAnswered || !bucket || !formId) return;
        setSubmitting(true);
        setSubmitError(null);
        try {
            await submitFormResponse(bucket, formId, answers);
            setSubmitted(true);
        } catch (err) {
            setSubmitError(
                err instanceof FormSubmissionError
                    ? err.message
                    : "Could not submit your response. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div data-form-nid={nid} className="form-embed form-embed-ack">
                <p className="form-title">{form.title}</p>
                <p className="form-ack-message">Your response has been recorded.</p>
            </div>
        );
    }

    const renderField = (field: FormField) => {
        const value = answers[field.name];

        switch (field.type) {
            case "TEXT":
                return (
                    <Input
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        required={field.required}
                        type="text"
                        value={typeof value === "string" ? value : ""}
                        onChange={e => setAnswer(field.name, e.target.value)}
                    />
                );
            case "NUMBER":
                return (
                    <Input
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        required={field.required}
                        type="number"
                        value={typeof value === "number" ? value : ""}
                        onChange={e => setAnswer(field.name, e.target.value === "" ? NaN : Number(e.target.value))}
                    />
                );
            case "TEXTAREA":
                return (
                    <Textarea
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        required={field.required}
                        value={typeof value === "string" ? value : ""}
                        onChange={e => setAnswer(field.name, e.target.value)}
                    />
                );
            case "SELECT":
                return (
                    <Select
                        key={field.name}
                        name={field.name}
                        label={field.label}
                        required={field.required}
                        value={typeof value === "string" ? value : ""}
                        options={(field.options ?? []).map(option => ({label: option, value: option}))}
                        onChange={e => setAnswer(field.name, e.target.value)}
                    />
                );
            case "RADIO":
                return (
                    <fieldset key={field.name} className="form-field-group">
                        <legend>{field.label}{field.required && <span className="form-required-mark"> *</span>}</legend>
                        <div className="form-field-options">
                            {(field.options ?? []).map(option => (
                                <Radio
                                    key={option}
                                    name={field.name}
                                    label={option}
                                    required={field.required}
                                    checked={value === option}
                                    onChange={() => setAnswer(field.name, option)}
                                />
                            ))}
                        </div>
                    </fieldset>
                );
            case "CHECKBOX": {
                const selected = Array.isArray(value) ? value : [];
                return (
                    <fieldset key={field.name} className="form-field-group">
                        <legend>{field.label}{field.required && <span className="form-required-mark"> *</span>}</legend>
                        <div className="form-field-options">
                            {(field.options ?? []).map(option => (
                                <Checkbox
                                    key={option}
                                    name={`${field.name}-${option}`}
                                    label={option}
                                    checked={selected.includes(option)}
                                    onChange={() => toggleCheckboxOption(field.name, option)}
                                />
                            ))}
                        </div>
                    </fieldset>
                );
            }
            default:
                return null;
        }
    };

    return (
        <div data-form-nid={nid} className="form-embed form-embed-form">
            <p className="form-title">{form.title}</p>
            <div className="form-fields-list">
                {form.fieldSchema.map(renderField)}
            </div>
            {submitError && <p className="form-submit-error">{submitError}</p>}
            <Button variant="secondary" size="small" disabled={!allRequiredAnswered || submitting}
                    onClick={handleSubmit}>
                {submitting ? "Submitting..." : "Submit"}
            </Button>
        </div>
    );
};

export const FormDirectiveError: React.FC<React.ComponentProps<"span">> = () => (
    <span className="external-link-error">Invalid :form directive</span>
);
