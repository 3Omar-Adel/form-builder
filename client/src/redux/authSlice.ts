import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import {
    authApi,
} from "../api/auth.api";

import {
    authStorage,
} from "../auth/auth.storage";


interface AuthState {
    user: ReturnType<
        typeof authStorage.getUser
    >;

    isAuthenticated: boolean;

    isLoading: boolean;

    error: string | null;
}


const initialState: AuthState = {
    user: authStorage.getUser(),

    isAuthenticated: Boolean(
        authStorage.getToken()
    ),

    isLoading: false,

    error: null,
};


export const loginUser = createAsyncThunk(
    "auth/loginUser",

    async (
        data: {
            email: string;
            password: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const response =
                await authApi.login(data);

            authStorage.setToken(
                response.data.token
            );

            authStorage.setUser(
                response.data.user
            );

            return response.data;
        } catch {
            return rejectWithValue(
                "Invalid email or password. Please try again."
            );
        }
    }
);


export const registerUser = createAsyncThunk(
    "auth/registerUser",

    async (
        data: {
            name: string;
            email: string;
            password: string;
        },
        { rejectWithValue }
    ) => {
        try {
            const response =
                await authApi.register(data);

            authStorage.setToken(
                response.data.token
            );

            authStorage.setUser(
                response.data.user
            );

            return response.data;
        } catch {
            return rejectWithValue(
                "Registration failed. Please check your information and try again."
            );
        }
    }
);


export const updateProfileUser =
    createAsyncThunk(
        "auth/updateProfileUser",

        async (
            data: {
                name: string;
                email: string;
                currentPassword?: string;
                newPassword?: string;
            },
            { rejectWithValue }
        ) => {
            try {
                const response =
                    await authApi.updateProfile(
                        data
                    );

                authStorage.setUser(
                    response.data.user
                );

                return response.data.user;
            } catch {
                return rejectWithValue(
                    "Profile update failed. Please check your information and try again."
                );
            }
        }
    );


const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {

        logout: (state) => {
            authStorage.removeToken();
            authStorage.removeUser();

            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },

        clearError: (state) => {
            state.error = null;
        },

    },

    extraReducers: (builder) => {

        // =========================
        // LOGIN
        // =========================

        builder.addCase(
            loginUser.pending,
            (state) => {
                state.isLoading = true;
                state.error = null;
            }
        );

        builder.addCase(
            loginUser.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
            }
        );

        builder.addCase(
            loginUser.rejected,
            (state, action) => {
                state.isLoading = false;
                state.error =
                    action.payload as string;
                state.isAuthenticated = false;
            }
        );


        // =========================
        // REGISTER
        // =========================

        builder.addCase(
            registerUser.pending,
            (state) => {
                state.isLoading = true;
                state.error = null;
            }
        );

        builder.addCase(
            registerUser.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
            }
        );

        builder.addCase(
            registerUser.rejected,
            (state, action) => {
                state.isLoading = false;
                state.error =
                    action.payload as string;
                state.isAuthenticated = false;
            }
        );


        // =========================
        // UPDATE PROFILE
        // =========================

        builder.addCase(
            updateProfileUser.pending,
            (state) => {
                state.isLoading = true;
                state.error = null;
            }
        );

        builder.addCase(
            updateProfileUser.fulfilled,
            (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            }
        );

        builder.addCase(
            updateProfileUser.rejected,
            (state, action) => {
                state.isLoading = false;
                state.error =
                    action.payload as string;
            }
        );

    },
});


export const {
    logout,
    clearError,
} = authSlice.actions;


export default authSlice.reducer;