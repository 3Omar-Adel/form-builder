import type {
    FieldType,
    FormField,
    FormFieldOption,
} from "../types/form";

import type {
    CreateFieldData,
    FieldOptionData,
} from "./field.api";

/*
 * Option shape returned by the backend.
 */
export interface ServerFieldOption {
    id: string;
    label: string;
    value: string;
    position: number;
}

/*
 * Field shape returned by the backend.
 */
export interface ServerField {
    id: string;
    type: FieldType;
    label: string;
    placeholder?: string | null;
    required: boolean;
    position: number;
    formId: string;

    options?: ServerFieldOption[];
}

/*
 * Convert one server option to the frontend option shape.
 */
export const fromServerOption = (
    option: ServerFieldOption,
): FormFieldOption => {
    return {
        id: option.id,
        label: option.label,
        value: option.value,
    };
};

/*
 * Convert one server field to the frontend field shape.
 */
export const fromServerField = (
    field: ServerField,
): FormField => {
    return {
        id: field.id,

        type: field.type,

        label: field.label,

        placeholder:
            field.placeholder ??
            "",

        required: field.required,

        position: field.position,

        options: field.options?.map(
            fromServerOption,
        ),
    };
};

/*
 * Convert server fields to frontend fields.
 */
export const fromServerFields = (
    fields: ServerField[],
): FormField[] => {
    return [...fields]
        .sort(
            (a, b) =>
                a.position -
                b.position,
        )
        .map(fromServerField);
};

/*
 * Convert a frontend option to the
 * shape expected by the backend.
 */
export const toServerOption = (
    option: FormFieldOption,
    position: number,
): FieldOptionData => {
    return {
        label: option.label,
        value: option.value,
        position,
    };
};

/*
 * Convert a frontend field to the
 * shape expected when creating it.
 */
export const toCreateFieldData = (
    field: FormField,
): CreateFieldData => {
    return {
        label: field.label,

        type: field.type,

        required: field.required,

        position: field.position,

        options: field.options?.map(
            (
                option,
                index,
            ) =>
                toServerOption(
                    option,
                    index,
                ),
        ),
    };
};
