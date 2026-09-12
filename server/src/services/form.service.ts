import { prisma } from "../config/prisma";
import { ApiError } from "../utils/api-error";

interface CreateFormData {
  title: string;
  description?: string;
}

export const createForm = async (
  userId: string,
  data: CreateFormData
) => {
  const slug = `${data.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}-${Date.now()}`;

  const form = await prisma.form.create({
    data: {
      title: data.title,
      description: data.description,
      slug,
      userId,
    },
  });

  return form;
};

export const getUserForms = async (userId: string) => {
  const forms = await prisma.form.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          responses: true,
          fields: true,
        },
      },
    },
  });

  return forms;
};

export const getFormById = async (
  userId: string,
  formId: string
) => {
  const form = await prisma.form.findFirst({
    where: {
      id: formId,
      userId,
    },
    include: {
      fields: {
        orderBy: {
          position: "asc",
        },
        include: {
          options: {
            orderBy: {
              position: "asc",
            },
          },
        },
      },
      _count: {
        select: {
          responses: true,
          fields: true,
        },
      },
    },
  });

 if (!form) {
  throw new ApiError("Form not found", 404);
}

  return form;
};

interface UpdateFormData {
  title?: string;
  description?: string;
}

export const updateForm = async (
  userId: string,
  formId: string,
  data: UpdateFormData
) => {
  const existingForm = await prisma.form.findFirst({
    where: {
      id: formId,
      userId,
    },
  });

  if (!existingForm) {
    throw new ApiError("Form not found", 404);
  }

  if (existingForm.status !== "DRAFT") {
    throw new ApiError(
      "Published or archived forms cannot be edited",
      400
    );
  }

  const form = await prisma.form.update({
    where: {
      id: formId,
    },
    data: {
      title: data.title,
      description: data.description,
    },
  });

  return form;
};

export const deleteForm = async (
  userId: string,
  formId: string
) => {
  const form = await prisma.form.findFirst({
    where: {
      id: formId,
      userId,
    },
  });

  if (!form) {
    throw new ApiError("Form not found", 404);
  }

  await prisma.form.delete({
    where: {
      id: formId,
    },
  });
};

export const publishForm = async (
  userId: string,
  formId: string
) => {
  const form = await prisma.form.findFirst({
    where: {
      id: formId,
      userId,
    },
    include: {
      fields: {
        include: {
          options: {
            orderBy: {
              position: "asc",
            },
          },
        },
      },
    },
  });

  if (!form) {
    throw new ApiError("Form not found", 404);
  }

  if (form.status === "PUBLISHED") {
    throw new ApiError("Form is already published", 400);
  }

  if (form.status === "ARCHIVED") {
    throw new ApiError(
      "Archived forms cannot be published",
      400
    );
  }

  if (form.fields.length === 0) {
    throw new ApiError(
      "Form must have at least one field before publishing",
      400
    );
  }

  const choiceFieldTypes = new Set([
    "SELECT",
    "RADIO",
    "CHECKBOX",
  ]);

  for (const field of form.fields) {
    if (choiceFieldTypes.has(field.type)) {
      if (field.options.length === 0) {
        throw new ApiError(
          `Field "${field.label}" must have at least one option before publishing`,
          400
        );
      }

      const optionValues = field.options.map(
        (option) => option.value
      );

      const uniqueOptionValues = new Set(optionValues);

      if (
        uniqueOptionValues.size !== optionValues.length
      ) {
        throw new ApiError(
          `Field "${field.label}" has duplicate option values`,
          400
        );
      }
    }
  }

  const publishedForm = await prisma.form.update({
    where: {
      id: formId,
    },
    data: {
      status: "PUBLISHED",
    },
  });

  return publishedForm;
};

export const unpublishForm = async (
  userId: string,
  formId: string
) => {
  const form = await prisma.form.findFirst({
    where: {
      id: formId,
      userId,
    },
  });

  if (!form) {
    throw new ApiError("Form not found", 404);
  }

  if (form.status === "DRAFT") {
    throw new ApiError("Form is already a draft", 400);
  }

  if (form.status === "ARCHIVED") {
    throw new ApiError(
      "Archived forms cannot be unpublished",
      400
    );
  }

  const unpublishedForm = await prisma.form.update({
    where: {
      id: formId,
    },
    data: {
      status: "DRAFT",
    },
  });

  return unpublishedForm;
};


export const archiveForm = async (
  userId: string,
  formId: string
) => {
  const form = await prisma.form.findFirst({
    where: {
      id: formId,
      userId,
    },
  });

  if (!form) {
    throw new ApiError("Form not found", 404);
  }

  if (form.status === "ARCHIVED") {
    throw new ApiError(
      "Form is already archived",
      400
    );
  }

  const archivedForm = await prisma.form.update({
    where: {
      id: formId,
    },
    data: {
      status: "ARCHIVED",
    },
  });

  return archivedForm;
};

export const restoreForm = async (
  userId: string,
  formId: string
) => {
  const form = await prisma.form.findFirst({
    where: {
      id: formId,
      userId,
    },
  });

  if (!form) {
    throw new ApiError("Form not found", 404);
  }

  if (form.status !== "ARCHIVED") {
    throw new ApiError(
      "Only archived forms can be restored",
      400
    );
  }

  const restoredForm = await prisma.form.update({
    where: {
      id: formId,
    },
    data: {
      status: "DRAFT",
    },
  });

  return restoredForm;
};

export const getPublishedFormBySlug = async (
  slug: string
) => {
  const form = await prisma.form.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
    include: {
      fields: {
        orderBy: {
          position: "asc",
        },
        include: {
          options: {
            orderBy: {
              position: "asc",
            },
          },
        },
      },
    },
  });

  if (!form) {
    throw new ApiError(
      "Published form not found",
      404
    );
  }

  return form;
};