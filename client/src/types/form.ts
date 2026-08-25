export type FieldType =
    | "TEXT"
    | "EMAIL"
    | "NUMBER"
    | "TEXTAREA"
    | "SELECT"
    | "RADIO"
    | "CHECKBOX"
    | "DATE";

export interface FormFieldOption {
    id: string;
    value: string;
}

export interface FormField {
    id: string;

    type: FieldType;

    label: string;

    placeholder?: string;

    required: boolean;

    position: number;

    options?: FormFieldOption[];
}