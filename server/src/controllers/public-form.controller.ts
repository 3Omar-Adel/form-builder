import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { getPublicFormBySlug } from "../services/public-form.service";

export const getPublicForm = asyncHandler(
  async (req: Request, res: Response) => {
    const slug = req.params.slug as string;

    const form = await getPublicFormBySlug(slug);

    res.status(200).json({
      success: true,
      data: {
        form,
      },
    });
  }
);