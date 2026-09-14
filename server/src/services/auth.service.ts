import bcrypt from "bcryptjs";

import { prisma } from "../config/prisma";

import { ApiError } from "../utils/api-error";

import { generateToken } from "../utils/jwt";

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

interface UpdateProfileData {
    name: string;
    email: string;
    currentPassword?: string;
    newPassword?: string;
}

export const registerUser = async ({
    name,
    email,
    password,
}: RegisterData) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        throw new ApiError(
            "Email is already registered",
            409
        );
    }

    const hashedPassword = await bcrypt.hash(
        password,
        12
    );

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    const token = generateToken(user.id);

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        },
        token,
    };
};

export const loginUser = async ({
    email,
    password,
}: LoginData) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new ApiError(
            "Invalid email or password",
            401
        );
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch) {
        throw new ApiError(
            "Invalid email or password",
            401
        );
    }

    const token = generateToken(user.id);

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        },
        token,
    };
};

export const getCurrentUser = async (
    userId: string
) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    if (!user) {
        throw new ApiError(
            "User not found",
            404
        );
    }

    return user;
};

export const updateProfile = async (
    userId: string,
    {
        name,
        email,
        currentPassword,
        newPassword,
    }: UpdateProfileData
) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new ApiError(
            "User not found",
            404
        );
    }

    const emailChanged = email !== user.email;

    if (emailChanged) {
        const existingUser =
            await prisma.user.findUnique({
                where: {
                    email,
                },
            });

        if (
            existingUser &&
            existingUser.id !== userId
        ) {
            throw new ApiError(
                "Email is already registered",
                409
            );
        }
    }

    let password = user.password;

    if (newPassword) {
        if (!currentPassword) {
            throw new ApiError(
                "Current password is required",
                400
            );
        }

        const passwordMatch =
            await bcrypt.compare(
                currentPassword,
                user.password
            );

        if (!passwordMatch) {
            throw new ApiError(
                "Current password is incorrect",
                401
            );
        }

        password = await bcrypt.hash(
            newPassword,
            12
        );
    }

    const updatedUser =
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name,
                email,
                password,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });

    return updatedUser;
};