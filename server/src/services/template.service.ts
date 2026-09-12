import { prisma } from "../config/prisma";
import { ApiError } from "../utils/api-error";

export const getTemplates = async () => {
    const templates = await prisma.form.findMany({
        where: {
            isTemplate: true,
        },

        orderBy: {
            createdAt: "desc",
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
                    fields: true,
                },
            },
        },
    });

    return templates;
};

export const getTemplateById = async (
    templateId: string
) => {
    const template = await prisma.form.findFirst({
        where: {
            id: templateId,
            isTemplate: true,
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

    if (!template) {
        throw new ApiError(
            "Template not found",
            404
        );
    }

    return template;
};

export const saveTemplate = async (
    userId: string,
    templateId: string
) => {
    const template =
        await prisma.form.findFirst({
            where: {
                id: templateId,
                isTemplate: true,
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

    if (!template) {
        throw new ApiError(
            "Template not found",
            404
        );
    }

    const newForm =
        await prisma.$transaction(
            async (tx) => {
                /*
                 * 1. Create a new form
                 */
                const form =
                    await tx.form.create({
                        data: {
                            title: template.title,
                            description:
                                template.description,

                            /*
                             * Generate a new unique slug.
                             */
                            slug: `${template.title
                                .toLowerCase()
                                .trim()
                                .replace(
                                    /[^a-z0-9]+/g,
                                    "-"
                                )
                                .replace(
                                    /(^-|-$)/g,
                                    ""
                                )}-${Date.now()}`,

                            /*
                             * The copied form belongs
                             * to the current user.
                             */
                            userId,

                            /*
                             * It is a normal form,
                             * not a template.
                             */
                            isTemplate: false,

                            /*
                             * Every saved template
                             * starts as a draft.
                             */
                            status: "DRAFT",
                        },
                    });

                /*
                 * 2. Copy all fields
                 */
                for (const field of template.fields) {
                    const newField =
                        await tx.formField.create({
                            data: {
                                label: field.label,
                                type: field.type,
                                required: field.required,
                                position: field.position,

                                formId: form.id,
                            },
                        });

                    /*
                     * 3. Copy field options
                     */
                    if (field.options.length > 0) {
                        await tx.fieldOption.createMany({
                            data: field.options.map(
                                (option) => ({
                                    label: option.label,
                                    value: option.value,
                                    position:
                                        option.position,

                                    fieldId:
                                        newField.id,
                                })
                            ),
                        });
                    }
                }

                return form;
            }
        );

    return newForm;
};
export const updateTemplate = async (
    templateId: string,
    data: {
        title?: string;
        description?: string;
    }
) => {
    const template =
        await prisma.form.findFirst({
            where: {
                id: templateId,
                isTemplate: true,
            },
        });

    if (!template) {
        throw new ApiError(
            "Template not found",
            404
        );
    }

    const updatedTemplate =
        await prisma.form.update({
            where: {
                id: templateId,
            },

            data: {
                title: data.title,
                description: data.description,
            },
        });

    return updatedTemplate;
};

export const deleteTemplate = async (
    templateId: string
) => {
    const template =
        await prisma.form.findFirst({
            where: {
                id: templateId,
                isTemplate: true,
            },
        });

    if (!template) {
        throw new ApiError(
            "Template not found",
            404
        );
    }

    await prisma.form.delete({
        where: {
            id: templateId,
        },
    });
};