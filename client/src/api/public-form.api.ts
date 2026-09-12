import api from "./axios";

import type { Form } from "./form.api";

export interface PublicFormResponse {
    success: boolean;
    message?: string;
    data: {
        form: Form;
    };
}

export interface SubmitAnswer {
    fieldId: string;
    value: string | string[];
}

export interface SubmitResponseData {
    answers: SubmitAnswer[];
}

export interface SubmitResponseResult {
    success: boolean;
    message?: string;
    data: {
        response: {
            id: string;
            formId: string;
            createdAt: string;
            answers: {
                id: string;
                value: string;
                fieldId: string;
            }[];
        };
    };
}

export const publicFormApi = {
    getBySlug: async (
        slug: string,
    ): Promise<PublicFormResponse> => {
        const response =
            await api.get<PublicFormResponse>(
                `/public/forms/${slug}`,
            );

        return response.data;
    },

    submit: async (
        slug: string,
        data: SubmitResponseData,
    ): Promise<SubmitResponseResult> => {
        const response =
            await api.post<SubmitResponseResult>(
                `/public/forms/${slug}/responses`,
                data,
            );

        return response.data;
    },
};
