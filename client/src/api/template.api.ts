import api from "./axios";

import type {
    Form,
} from "./form.api";

export interface TemplatesResponse {
    success: boolean;

    data: {
        templates: Form[];
    };
}

export interface TemplateResponse {
    success: boolean;

    data: {
        template: Form;
    };
}

export interface SaveTemplateResponse {
    success: boolean;
    message?: string;

    data: {
        form: Form;
    };
}

export const templateApi = {

    getAll: async (): Promise<TemplatesResponse> => {
        const response =
            await api.get<TemplatesResponse>(
                "/templates",
            );

        return response.data;
    },

    getById: async (
        id: string,
    ): Promise<TemplateResponse> => {
        const response =
            await api.get<TemplateResponse>(
                `/templates/${id}`,
            );

        return response.data;
    },

    save: async (
        id: string,
    ): Promise<SaveTemplateResponse> => {
        const response =
            await api.post<SaveTemplateResponse>(
                `/templates/${id}/save`,
            );

        return response.data;
    },
};