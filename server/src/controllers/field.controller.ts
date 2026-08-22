import { Request, Response } from "express";

import { asyncHandler } from "../utils/async-handler";

import {
  createField,
  updateField,
  deleteField,
  reorderFields,
} from "../services/field.service";

export const create = asyncHandler(
  async (req: Request, res: Response) => {
    const formId = req.params.formId as string;

    const field = await createField(
      req.user!.id,
      formId,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Field created successfully",
      data: {
        field,
      },
    });
  }
);

export const update = asyncHandler(
  async (req: Request, res: Response) => {
    const formId = req.params.formId as string;
    const fieldId = req.params.fieldId as string;

    const field = await updateField(
      req.user!.id,
      formId,
      fieldId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Field updated successfully",
      data: {
        field,
      },
    });
  }
);

export const remove = asyncHandler(
  async (req: Request, res: Response) => {
    const formId = req.params.formId as string;
    const fieldId = req.params.fieldId as string;

    await deleteField(
      req.user!.id,
      formId,
      fieldId
    );

    res.status(200).json({
      success: true,
      message: "Field deleted successfully",
    });
  }
);

export const reorder = asyncHandler(
  async (req: Request, res: Response) => {
    const formId = req.params.formId as string;

    const fields = await reorderFields(
      req.user!.id,
      formId,
      req.body.fields
    );

    res.status(200).json({
      success: true,
      message: "Fields reordered successfully",
      data: {
        fields,
      },
    });
  }
);