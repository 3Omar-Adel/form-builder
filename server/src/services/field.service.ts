import { prisma } from "../config/prisma";
import { ApiError } from "../utils/api-error";

interface CreateFieldData {
  label: string;
  type:
    | "TEXT"
    | "EMAIL"
    | "NUMBER"
    | "TEXTAREA"
    | "SELECT"
    | "RADIO"
    | "CHECKBOX"
    | "DATE";
  required?: boolean;
  position?: number;
  options?: {
    label: string;
    value: string;
    position: number;
  }[];
}

interface UpdateFieldData {
  label?: string;
  required?: boolean;
  options?: {
    label: string;
    value: string;
    position: number;
  }[];
}

interface ReorderFieldData {
  id: string;
  position: number;
}

// Helper: Get user's draft form

const getOwnedDraftForm = async (
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

  if (form.status !== "DRAFT") {
    throw new ApiError(
      "Fields can only be edited while the form is a draft",
      400
    );
  }

  return form;
};

// Create Field

export const createField = async (
  userId: string,
  formId: string,
  data: CreateFieldData
) => {
  await getOwnedDraftForm(userId, formId);

  const lastField = await prisma.formField.findFirst({
    where: {
      formId,
    },
    orderBy: {
      position: "desc",
    },
  });

  const position =
    data.position ??
    (lastField ? lastField.position + 1 : 0);

  const field = await prisma.formField.create({
    data: {
      label: data.label,
      type: data.type,
      required: data.required ?? false,
      position,
      formId,

      options: data.options
        ? {
            create: data.options.map((option) => ({
              label: option.label,
              value: option.value,
              position: option.position,
            })),
          }
        : undefined,
    },

    include: {
      options: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  return field;
};

// Update Field

export const updateField = async (
  userId: string,
  formId: string,
  fieldId: string,
  data: UpdateFieldData
) => {
  await getOwnedDraftForm(userId, formId);

  const field = await prisma.formField.findFirst({
    where: {
      id: fieldId,
      formId,
    },
  });

  if (!field) {
    throw new ApiError("Field not found", 404);
  }

  const updatedField = await prisma.formField.update({
    where: {
      id: fieldId,
    },

    data: {
      ...(data.label !== undefined && {
        label: data.label,
      }),

      ...(data.required !== undefined && {
        required: data.required,
      }),

      ...(data.options !== undefined && {
        options: {
          deleteMany: {},

          create: data.options.map((option) => ({
            label: option.label,
            value: option.value,
            position: option.position,
          })),
        },
      }),
    },

    include: {
      options: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  return updatedField;
};

// Delete Field

export const deleteField = async (
  userId: string,
  formId: string,
  fieldId: string
) => {
  await getOwnedDraftForm(userId, formId);

  const field = await prisma.formField.findFirst({
    where: {
      id: fieldId,
      formId,
    },
  });

  if (!field) {
    throw new ApiError("Field not found", 404);
  }

  await prisma.formField.delete({
    where: {
      id: fieldId,
    },
  });
};

// Reorder Fields

export const reorderFields = async (
  userId: string,
  formId: string,
  fields: ReorderFieldData[]
) => {
  await getOwnedDraftForm(userId, formId);

  const existingFields = await prisma.formField.findMany({
    where: {
      formId,
    },
  });

  if (existingFields.length !== fields.length) {
    throw new ApiError(
      "All form fields must be included in reorder request",
      400
    );
  }

  const existingIds = new Set(
    existingFields.map((field) => field.id)
  );

  const receivedIds = new Set(
    fields.map((field) => field.id)
  );

  if (receivedIds.size !== fields.length) {
    throw new ApiError(
      "Duplicate field IDs are not allowed",
      400
    );
  }

  for (const field of fields) {
    if (!existingIds.has(field.id)) {
      throw new ApiError(
        "One or more fields do not belong to this form",
        400
      );
    }
  }

  // Make sure positions are valid and unique
  const positions = fields.map((field) => field.position);

  if (new Set(positions).size !== positions.length) {
    throw new ApiError(
      "Duplicate positions are not allowed",
      400
    );
  }

  if (positions.some((position) => position < 0)) {
    throw new ApiError(
      "Positions cannot be negative",
      400
    );
  }

  await prisma.$transaction(async (tx) => {
    // Temporary positions prevent conflicts while reordering
    for (const field of existingFields) {
      await tx.formField.update({
        where: {
          id: field.id,
        },
        data: {
          position: field.position + 10000,
        },
      });
    }

    // Apply the new positions
    for (const field of fields) {
      await tx.formField.update({
        where: {
          id: field.id,
        },
        data: {
          position: field.position,
        },
      });
    }
  });

  return prisma.formField.findMany({
    where: {
      formId,
    },

    include: {
      options: {
        orderBy: {
          position: "asc",
        },
      },
    },

    orderBy: {
      position: "asc",
    },
  });
};