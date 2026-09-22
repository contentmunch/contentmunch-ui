import {describe, expect, it} from 'vitest';
import {renderHook} from '@testing-library/react';
import type {PropsWithChildren} from 'react';
import {
    NoteWidgetClientProvider,
    usePollWidgetClient,
    useFormWidgetClient,
} from './NoteWidgetClientProvider';
import type {PollWidgetClient} from '../poll/PollWidgetClient';
import type {FormWidgetClient} from '../form/FormWidgetClient';

const pollClient = {getPoll: () => Promise.resolve({} as never)} as unknown as PollWidgetClient;
const formClient = {getForm: () => Promise.resolve({} as never)} as unknown as FormWidgetClient;

describe('NoteWidgetClientProvider', () => {
    it('provides the poll client to usePollWidgetClient consumers', () => {
        const wrapper = ({children}: PropsWithChildren) => (
            <NoteWidgetClientProvider poll={pollClient}>{children}</NoteWidgetClientProvider>
        );
        const {result} = renderHook(() => usePollWidgetClient(), {wrapper});

        expect(result.current).toBe(pollClient);
    });

    it('provides the form client to useFormWidgetClient consumers', () => {
        const wrapper = ({children}: PropsWithChildren) => (
            <NoteWidgetClientProvider form={formClient}>{children}</NoteWidgetClientProvider>
        );
        const {result} = renderHook(() => useFormWidgetClient(), {wrapper});

        expect(result.current).toBe(formClient);
    });

    it('provides both clients simultaneously when both are given', () => {
        const wrapper = ({children}: PropsWithChildren) => (
            <NoteWidgetClientProvider poll={pollClient} form={formClient}>{children}</NoteWidgetClientProvider>
        );
        const {result: pollResult} = renderHook(() => usePollWidgetClient(), {wrapper});
        const {result: formResult} = renderHook(() => useFormWidgetClient(), {wrapper});

        expect(pollResult.current).toBe(pollClient);
        expect(formResult.current).toBe(formClient);
    });

    it('throws from usePollWidgetClient when no poll client was provided', () => {
        const wrapper = ({children}: PropsWithChildren) => (
            <NoteWidgetClientProvider form={formClient}>{children}</NoteWidgetClientProvider>
        );

        expect(() => renderHook(() => usePollWidgetClient(), {wrapper})).toThrow(
            /PollRenderer requires a NoteWidgetClientProvider/
        );
    });

    it('throws from useFormWidgetClient when no form client was provided', () => {
        const wrapper = ({children}: PropsWithChildren) => (
            <NoteWidgetClientProvider poll={pollClient}>{children}</NoteWidgetClientProvider>
        );

        expect(() => renderHook(() => useFormWidgetClient(), {wrapper})).toThrow(
            /FormRenderer requires a NoteWidgetClientProvider/
        );
    });

    it('throws when used entirely outside of a provider (default empty context)', () => {
        expect(() => renderHook(() => usePollWidgetClient())).toThrow(
            /PollRenderer requires a NoteWidgetClientProvider/
        );
    });
});
