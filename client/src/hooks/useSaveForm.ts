import {
    useState,
} from "react";

import {
    formApi,
} from "../api/form.api";

import {
    fieldApi,
} from "../api/field.api";

import {
    toCreateFieldData,
} from "../api/field.mapper";

import type {
    FormField,
} from "../types/form";

interface UseSaveFormParams {
    formId?: string;

    title: string;

    description: string;

    fields: FormField[];

    initialFields?: FormField[];
}

interface SaveFormResult {
    isSaving: boolean;

    error: string;

    saveForm: () => Promise<string | null>;
}

export const useSaveForm = ({
    formId,
    title,
    description,
    fields,
    initialFields = [],
}: UseSaveFormParams): SaveFormResult => {
    const [
        isSaving,
        setIsSaving,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState("");

    const saveForm =
        async (): Promise<string | null> => {
            try {
                setIsSaving(true);

                setError("");

                /*
                 * Create mode.
                 */
                if (!formId) {
                    const formResponse =
                        await formApi.create({
                            title,
                            description,
                        });

                    const newFormId =
                        formResponse.data.form.id;

                    await Promise.all(
                        fields.map(
                            (field) =>
                                fieldApi.create(
                                    newFormId,
                                    toCreateFieldData(
                                        field,
                                    ),
                                ),
                        ),
                    );

                    return newFormId;
                }

                /*
                 * Edit mode.
                 */

                /*
                 * 1. Update form details.
                 */
                await formApi.update(
                    formId,
                    {
                        title,
                        description,
                    },
                );

                /*
                 * 2. Find deleted fields.
                 */
                const currentFieldIds =
                    new Set(
                        fields.map(
                            (field) =>
                                field.id,
                        ),
                    );

                const deletedFields =
                    initialFields.filter(
                        (field) =>
                            !currentFieldIds.has(
                                field.id,
                            ),
                    );

                /*
                 * 3. Delete removed fields.
                 */
                await Promise.all(
                    deletedFields.map(
                        (field) =>
                            fieldApi.remove(
                                formId,
                                field.id,
                            ),
                    ),
                );

                /*
                 * 4. Create new fields
                 * or update existing fields.
                 *
                 * We keep the server ID for
                 * every field.
                 */
                const savedFields =
                    await Promise.all(
                        fields.map(
                            async (field) => {
                                const existingField =
                                    initialFields.find(
                                        (
                                            initialField,
                                        ) =>
                                            initialField.id ===
                                            field.id,
                                    );

                                /*
                                 * New field.
                                 */
                                if (
                                    !existingField
                                ) {
                                    const response =
                                        await fieldApi.create(
                                            formId,
                                            toCreateFieldData(
                                                field,
                                            ),
                                        );

                                    /*
                                     * Important:
                                     * Use the ID returned
                                     * by the backend.
                                     */
                                    return {
                                        ...field,
                                        id: response
                                            .data
                                            .field
                                            .id,
                                    };
                                }

                                /*
                                 * Existing field.
                                 */
                                await fieldApi.update(
                                    formId,
                                    field.id,
                                    {
                                        label:
                                            field.label,

                                        required:
                                            field.required,

                                        options:
                                            field.options?.map(
                                                (
                                                    option,
                                                    index,
                                                ) => ({
                                                    label:
                                                        option.label,

                                                    value:
                                                        option.value,

                                                    position:
                                                        index,
                                                }),
                                            ),
                                    },
                                );

                                /*
                                 * Keep the existing
                                 * server ID.
                                 */
                                return field;
                            },
                        ),
                    );

                /*
                 * 5. Save the new order.
                 *
                 * IMPORTANT:
                 * Use savedFields instead of
                 * fields because new fields now
                 * have their real server IDs.
                 */
                await fieldApi.reorder(
                    formId,
                    savedFields.map(
                        (
                            field,
                            index,
                        ) => ({
                            id: field.id,
                            position: index,
                        }),
                    ),
                );

                return formId;

            } catch (err) {
                console.error(
                    "Failed to save form:",
                    err,
                );

                if (
                    err &&
                    typeof err === "object" &&
                    "response" in err
                ) {
                    const axiosError =
                        err as {
                            response?: {
                                status?: number;
                                data?: unknown;
                            };
                        };

                    console.error(
                        "Status:",
                        axiosError.response?.status,
                    );

                    console.error(
                        "Server response:",
                        axiosError.response?.data,
                    );
                }

                setError(
                    "Failed to save form",
                );

                return null;

            } finally {
                setIsSaving(false);
            }
        };

    return {
        isSaving,
        error,
        saveForm,
    };
};