import api from "./axios";

export interface ResponseField {
    id: string;
    label: string;
    type: string;
}

export interface ResponseAnswer {
    id: string;
    value: string;
    fieldId: string;
    field: ResponseField;
}

export interface FormResponse {
    id: string;
    formId: string;
    createdAt: string;
    answers: ResponseAnswer[];
}

export interface ResponsesResponse {
    success: boolean;
    data: {
        responses: FormResponse[];
    };
}

export interface ResponseResponse {
    success: boolean;
    data: {
        response: FormResponse;
    };
}

export const responseApi = {
    getByFormId: async (
        formId: string,
    ): Promise<ResponsesResponse> => {
        const response = await api.get<ResponsesResponse>(
            `/forms/${formId}/responses`,
        );

        return response.data;
    },

    getById: async (
        formId: string,
        responseId: string,
    ): Promise<ResponseResponse> => {
        const response = await api.get<ResponseResponse>(
            `/forms/${formId}/responses/${responseId}`,
        );

        return response.data;
    },

    delete: async (
        formId: string,
        responseId: string,
    ) => {
        const response = await api.delete(
            `/forms/${formId}/responses/${responseId}`,
        );

        return response.data;
    },
};