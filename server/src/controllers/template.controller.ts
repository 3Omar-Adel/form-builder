import { Request, Response } from "express";

import {
    getTemplates,
    getTemplateById,
    saveTemplate,
    updateTemplate,
    deleteTemplate,
} from "../services/template.service";

import { ApiError } from "../utils/api-error";

import { asyncHandler } from "../utils/async-handler";

export const getAll = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {
        const templates =
            await getTemplates();

        res.status(200).json({
            success: true,

            data: {
                templates,
            },
        });
    }
);

export const getOne = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {
        const templateId =
            req.params.id as string;

        if (!templateId) {
            throw new ApiError(
                "Template ID is required",
                400
            );
        }

        const template =
            await getTemplateById(
                templateId
            );

        res.status(200).json({
            success: true,

            data: {
                template,
            },
        });
    }
);

export const save = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {
        const templateId =
            req.params.id as string;

        if (!templateId) {
            throw new ApiError(
                "Template ID is required",
                400
            );
        }

        const form =
            await saveTemplate(
                req.user!.id,
                templateId
            );

        res.status(201).json({
            success: true,

            message:
                "Template saved successfully",

            data: {
                form,
            },
        });
    }
);
export const update = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {
        const templateId =
            req.params.id as string;

        if (!templateId) {
            throw new ApiError(
                "Template ID is required",
                400
            );
        }

        const template =
            await updateTemplate(
                templateId,
                req.body
            );

        res.status(200).json({
            success: true,

            message:
                "Template updated successfully",

            data: {
                template,
            },
        });
    }
);

export const remove = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {
        const templateId =
            req.params.id as string;

        if (!templateId) {
            throw new ApiError(
                "Template ID is required",
                400
            );
        }

        await deleteTemplate(
            templateId
        );

        res.status(200).json({
            success: true,

            message:
                "Template deleted successfully",
        });
    }
);