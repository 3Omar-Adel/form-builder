import api from "./axios";

import type {
    FieldType,
} from "../types/form";

import type {
    ServerField,
} from "./field.mapper";

//   Option shape expected by the backend.
export interface FieldOptionData {
    label: string;
    value: string;
    position: number;
}

/*
 * Data used when creating a field.
 */
export interface CreateFieldData {
    label: string;
    type: FieldType;
    required?: boolean;
    position?: number;
    options?: FieldOptionData[];
}

/*
 * Data used when updating a field.
 */
export interface UpdateFieldData {
    label?: string;
    required?: boolean;
    options?: FieldOptionData[];
}

/*
 * Data used when reordering fields.
 */
export interface ReorderFieldData {
    id: string;
    position: number;
}

/*
 * Generic API response for a single field.
 */
export interface FieldResponse {
    success: boolean;
    message?: string;

    data: {
        field: ServerField;
    };
}

/*
 * API response for reordered fields.
 */
export interface ReorderFieldsResponse {
    success: boolean;
    message?: string;

    data: {
        fields: ServerField[];
    };
}

export const fieldApi = {
    /*
     * Create a new field.
     */
    create: async (
        formId: string,
        data: CreateFieldData,
    ): Promise<FieldResponse> => {
        const response =
            await api.post<FieldResponse>(
                `/forms/${formId}/fields`,
                data,
            );

        return response.data;
    },

    /*
     * Update an existing field.
     */
    update: async (
        formId: string,
        fieldId: string,
        data: UpdateFieldData,
    ): Promise<FieldResponse> => {
        const response =
            await api.patch<FieldResponse>(
                `/forms/${formId}/fields/${fieldId}`,
                data,
            );

        return response.data;
    },

    /*
     * Delete an existing field.
     */
    remove: async (
        formId: string,
        fieldId: string,
    ): Promise<void> => {
        await api.delete(
            `/forms/${formId}/fields/${fieldId}`,
        );
    },

    /*
     * Reorder all fields.
     */
    reorder: async (
        formId: string,
        fields: ReorderFieldData[],
    ): Promise<ReorderFieldsResponse> => {
        const response =
            await api.put<ReorderFieldsResponse>(
                `/forms/${formId}/fields/reorder`,
                {
                    fields,
                },
            );

        return response.data;
    },
};
