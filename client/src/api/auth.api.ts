import api from "./axios";

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

export interface AuthResponse {
    success: boolean;
    message?: string;
    data: {
        user: AuthUser;
        token: string;
    };
}

export interface MeResponse {
    success: boolean;
    data: {
        user: AuthUser;
    };
}

export const authApi = {

    register: async (
        data: RegisterData
    ): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>(
            "/auth/register",
            data
        );
        return response.data;
    },

    login: async (
        data: LoginData
    ): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>(
            "/auth/login",
            data
        );
        return response.data;
    },

    me: async (): Promise<MeResponse> => {
        const response = await api.get<MeResponse>(
            "/auth/me"
        );
        return response.data;
    },
};