import api from "./axios";

import type {
    ServerField,
} from "./field.mapper";

export type FormStatus =
    | "DRAFT"
    | "PUBLISHED"
    | "ARCHIVED";

export interface FormCounts {
    responses: number;
    fields: number;
}

export interface Form {
    id: string;
    title: string;
    description: string | null;
    slug: string;
    status: FormStatus;

    userId: string;

    fields?: ServerField[];
    createdAt: string;
    updatedAt: string;

    _count?: FormCounts;
}

export interface CreateFormData {
    title: string;
    description?: string;
}

export interface UpdateFormData {
    title?: string;
    description?: string;
}

export interface FormResponse {
    success: boolean;
    message?: string;
    data: {
        form: Form;
    };
}

export interface FormsResponse {
    success: boolean;
    data: {
        forms: Form[];
    };
}

export const formApi = {
    getMyForms: async (): Promise<FormsResponse> => {
        const response =
            await api.get<FormsResponse>(
                "/forms",
            );

        return response.data;
    },

    create: async (
        data: CreateFormData,
    ): Promise<FormResponse> => {
        const response =
            await api.post<FormResponse>(
                "/forms",
                data,
            );

        return response.data;
    },

    getById: async (
        id: string,
    ): Promise<FormResponse> => {
        const response =
            await api.get<FormResponse>(
                `/forms/${id}`,
            );

        return response.data;
    },


    getPublicBySlug: async (
        slug: string,
    ): Promise<FormResponse> => {
        const response =
            await api.get<FormResponse>(
                `/forms/public/${slug}`,
            );

        return response.data;
    },

    update: async (
        id: string,
        data: UpdateFormData,
    ): Promise<FormResponse> => {
        const response =
            await api.patch<FormResponse>(
                `/forms/${id}`,
                data,
            );

        return response.data;
    },

    deleteForm: async (
        id: string,
    ): Promise<void> => {
        await api.delete(`/forms/${id}`);
    },

    publish: async (
        id: string,
    ): Promise<FormResponse> => {
        const response =
            await api.post<FormResponse>(
                `/forms/${id}/publish`,
            );

        return response.data;
    },

    unpublish: async (
        id: string,
    ): Promise<FormResponse> => {
        const response =
            await api.post<FormResponse>(
                `/forms/${id}/unpublish`,
            );

        return response.data;
    },

    archive: async (
        id: string,
    ): Promise<FormResponse> => {
        const response =
            await api.post<FormResponse>(
                `/forms/${id}/archive`,
            );

        return response.data;
    },

    restore: async (
        id: string,
    ): Promise<FormResponse> => {
        const response =
            await api.post<FormResponse>(
                `/forms/${id}/restore`,
            );

        return response.data;
    },
};