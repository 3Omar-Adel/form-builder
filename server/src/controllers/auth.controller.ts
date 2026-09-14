import { Request, Response } from "express";

import {
    registerUser,
    loginUser,
    getCurrentUser,
    updateProfile as updateProfileService,
} from "../services/auth.service";

import { asyncHandler } from "../utils/async-handler";

export const register = asyncHandler(
    async (req: Request, res: Response) => {
        const result = await registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });
    }
);

export const login = asyncHandler(
    async (req: Request, res: Response) => {
        const result = await loginUser(req.body);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    }
);

export const me = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await getCurrentUser(req.user!.id);

        res.status(200).json({
            success: true,
            data: {
                user,
            },
        });
    }
);

export const updateProfile = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await updateProfileService(
            req.user!.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: {
                user,
            },
        });
    }
);