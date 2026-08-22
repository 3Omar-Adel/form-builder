import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import {
  submitResponse,
  getFormResponses,
  getResponseById,
  deleteResponse,
} from "../services/response.service";

export const createResponse = asyncHandler(
  async (req: Request, res: Response) => {
    const slug = req.params.slug as string;

    const response = await submitResponse(
      slug,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Response submitted successfully",
      data: {
        response,
      },
    });
  }
);

export const getResponses = asyncHandler(
  async (req: Request, res: Response) => {
    const formId = req.params.id as string;

    const responses = await getFormResponses(
      req.user!.id,
      formId
    );

    res.status(200).json({
      success: true,
      data: {
        responses,
      },
    });
  }
);

export const getOneResponse = asyncHandler(
  async (req: Request, res: Response) => {
    const formId = req.params.id as string;
    const responseId = req.params.responseId as string;

    const response = await getResponseById(
      req.user!.id,
      formId,
      responseId
    );

    res.status(200).json({
      success: true,
      data: {
        response,
      },
    });
  }
);

export const removeResponse = asyncHandler(
  async (req: Request, res: Response) => {
    const formId = req.params.id as string;
    const responseId = req.params.responseId as string;

    await deleteResponse(
      req.user!.id,
      formId,
      responseId
    );

    res.status(200).json({
      success: true,
      message: "Response deleted successfully",
    });
  }
);