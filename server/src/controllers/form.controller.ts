import { Request, Response } from "express";
import { ApiError } from "../utils/api-error";
import {
  createForm,
  getUserForms,
  getFormById,
  updateForm,
  deleteForm,
  publishForm,
  unpublishForm,
  archiveForm,
  restoreForm
} from "../services/form.service";
import { asyncHandler } from "../utils/async-handler";

export const create = asyncHandler(
  async (req: Request, res: Response) => {
    const form = await createForm(
      req.user!.id,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Form created successfully",
      data: {
        form,
      },
    });
  }
);

export const getMyForms = asyncHandler(
  async (req: Request, res: Response) => {
    const forms = await getUserForms(req.user!.id);

    res.status(200).json({
      success: true,
      data: {
        forms,
      },
    });
  }
);

export const getOne = asyncHandler(
  async (req: Request, res: Response) => {
    const formId = req.params.id as string;

    if (!formId) {
      throw new ApiError("Form ID is required", 400);
    }

    const form = await getFormById(
      req.user!.id,
      formId
    );

    res.status(200).json({
      success: true,
      data: {
        form,
      },
    });
  }
);

export const update = asyncHandler(
  async (req: Request, res: Response) => {
    const formId = req.params.id as string;

    const form = await updateForm(
      req.user!.id,
      formId,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Form updated successfully",
      data: {
        form,
      },
    });
  }
);

export const remove = asyncHandler(
  async (req: Request, res: Response) => {
    const formId = req.params.id as string;

    await deleteForm(
      req.user!.id,
      formId
    );

    res.status(200).json({
      success: true,
      message: "Form deleted successfully",
    });
  }
);

export const publish = asyncHandler(
  async (req: Request, res: Response) => {
    const formId = req.params.id as string;

    const form = await publishForm(
      req.user!.id,
      formId
    );

    res.status(200).json({
      success: true,
      message: "Form published successfully",
      data: {
        form,
      },
    });
  }
);

export const unpublish = asyncHandler(
  async (req: Request, res: Response) => {
    const formId = req.params.id as string;

    const form = await unpublishForm(
      req.user!.id,
      formId
    );

    res.status(200).json({
      success: true,
      message: "Form unpublished successfully",
      data: {
        form,
      },
    });
  }
);


export const archive = asyncHandler(
  async (req: Request, res: Response) => {
    const formId = req.params.id as string;

    const form = await archiveForm(
      req.user!.id,
      formId
    );

    res.status(200).json({
      success: true,
      message: "Form archived successfully",
      data: {
        form,
      },
    });
  }
);

export const restore = asyncHandler(
  async (req: Request, res: Response) => {
    const formId = req.params.id as string;

    const form = await restoreForm(
      req.user!.id,
      formId
    );

    res.status(200).json({
      success: true,
      message: "Form restored successfully",
      data: {
        form,
      },
    });
  }
);