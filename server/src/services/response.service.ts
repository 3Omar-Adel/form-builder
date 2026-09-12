import { prisma } from "../config/prisma";

import type { Prisma } from "../generated/prisma/client";

import { ApiError } from "../utils/api-error";

interface SubmitAnswer {
  fieldId: string;
  value: string | string[];
}

interface SubmitResponseData {
  answers: SubmitAnswer[];
}

const isValidEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

const isValidDate = (value: string) => {
  const date = new Date(value);

  return !Number.isNaN(date.getTime());
};

export const submitResponse = async (
  slug: string,
  data: SubmitResponseData
) => {
  const form = await prisma.form.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
    include: {
      fields: {
        include: {
          options: true,
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

  const submittedFieldIds = new Set(
    data.answers.map((answer) => answer.fieldId)
  );

  if (
  submittedFieldIds.size !== data.answers.length
) {
  throw new ApiError(
    "A field cannot be answered more than once",
    400
  );
}

  const formFieldIds = new Set(
    form.fields.map((field) => field.id)
  );

  // Make sure every submitted field belongs to this form
  for (const answer of data.answers) {
    if (!formFieldIds.has(answer.fieldId)) {
      throw new ApiError(
        "One or more fields do not belong to this form",
        400
      );
    }
  }

  // Make sure required fields are answered
  for (const field of form.fields) {
    if (field.required && !submittedFieldIds.has(field.id)) {
      throw new ApiError(
        `Field "${field.label}" is required`,
        400
      );
    }
  }

  const normalizedAnswers = data.answers.map((answer) => {
    const field = form.fields.find(
      (item) => item.id === answer.fieldId
    );

    if (!field) {
      throw new ApiError(
        "Field not found",
        400
      );
    }

    const values = Array.isArray(answer.value)
      ? answer.value
      : [answer.value];

    const cleanedValues = values.map((value) =>
      String(value).trim()
    );

    // Required value cannot be empty
    if (
      field.required &&
      cleanedValues.every((value) => value === "")
    ) {
      throw new ApiError(
        `Field "${field.label}" is required`,
        400
      );
    }

    // EMAIL validation
    if (field.type === "EMAIL") {
      const value = cleanedValues[0];

      if (value && !isValidEmail(value)) {
        throw new ApiError(
          `Invalid email for field "${field.label}"`,
          400
        );
      }
    }

    // NUMBER validation
    if (field.type === "NUMBER") {
      const value = cleanedValues[0];

      if (value && Number.isNaN(Number(value))) {
        throw new ApiError(
          `Invalid number for field "${field.label}"`,
          400
        );
      }
    }

    // DATE validation
    if (field.type === "DATE") {
      const value = cleanedValues[0];

      if (value && !isValidDate(value)) {
        throw new ApiError(
          `Invalid date for field "${field.label}"`,
          400
        );
      }
    }

    // SELECT / RADIO / CHECKBOX
    if (
      field.type === "SELECT" ||
      field.type === "RADIO" ||
      field.type === "CHECKBOX"
    ) {
      const allowedValues = new Set(
        field.options.map((option) => option.value)
      );

      for (const value of cleanedValues) {
        if (!allowedValues.has(value)) {
          throw new ApiError(
            `Invalid option for field "${field.label}"`,
            400
          );
        }
      }
    }

    return {
      fieldId: field.id,
      value: Array.isArray(answer.value)
        ? JSON.stringify(cleanedValues)
        : cleanedValues[0] ?? "",
    };
  });

  const response = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
        return tx.response.create({
            data: {
                formId: form.id,
                answers: {
                    create: normalizedAnswers,
                },
            },
            include: {
                answers: {
                    include: {
                        field: {
                            select: {
                                id: true,
                                label: true,
                                type: true,
                            },
                        },
                    },
                },
            },
        });
    }
);

  return response;
};

export const getFormResponses = async (
  userId: string,
  formId: string
) => {
  const form = await prisma.form.findFirst({
    where: {
      id: formId,
      userId,
    },
    select: {
      id: true,
    },
  });

  if (!form) {
    throw new ApiError("Form not found", 404);
  }

  const responses = await prisma.response.findMany({
    where: {
      formId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      answers: {
        include: {
          field: {
            select: {
              id: true,
              label: true,
              type: true,
            },
          },
        },
      },
    },
  });

  return responses;
};

export const getResponseById = async (
  userId: string,
  formId: string,
  responseId: string
) => {
  const form = await prisma.form.findFirst({
    where: {
      id: formId,
      userId,
    },
    select: {
      id: true,
    },
  });

  if (!form) {
    throw new ApiError("Form not found", 404);
  }

  const response = await prisma.response.findFirst({
    where: {
      id: responseId,
      formId,
    },
    include: {
      answers: {
        include: {
          field: {
            select: {
              id: true,
              label: true,
              type: true,
            },
          },
        },
      },
    },
  });

  if (!response) {
    throw new ApiError(
      "Response not found",
      404
    );
  }

  return response;
};

export const deleteResponse = async (
  userId: string,
  formId: string,
  responseId: string
) => {
  const form = await prisma.form.findFirst({
    where: {
      id: formId,
      userId,
    },
    select: {
      id: true,
    },
  });

  if (!form) {
    throw new ApiError("Form not found", 404);
  }

  const response = await prisma.response.findFirst({
    where: {
      id: responseId,
      formId,
    },
  });

  if (!response) {
    throw new ApiError(
      "Response not found",
      404
    );
  }

  await prisma.response.delete({
    where: {
      id: responseId,
    },
  });
};