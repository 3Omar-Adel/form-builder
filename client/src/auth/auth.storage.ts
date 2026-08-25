const TOKEN_KEY = "form_builder_token";
const USER_KEY = "form_builder_user";

export interface StoredUser {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

export const authStorage = {
    getToken: (): string | null => {
        return localStorage.getItem(TOKEN_KEY);
    },

    setToken: (token: string): void => {
        localStorage.setItem(TOKEN_KEY, token);
    },

    removeToken: (): void => {
        localStorage.removeItem(TOKEN_KEY);
    },

    getUser: (): StoredUser | null => {
        const user = localStorage.getItem(USER_KEY);

        if (!user) {
            return null;
        }

        try {
            return JSON.parse(user) as StoredUser;
        } catch {
            return null;
        }
    },

    setUser: (user: StoredUser): void => {
        localStorage.setItem(
            USER_KEY,
            JSON.stringify(user),
        );
    },

    removeUser: (): void => {
        localStorage.removeItem(USER_KEY);
    },
};