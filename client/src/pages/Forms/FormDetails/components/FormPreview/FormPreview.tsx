import type { Form } from "../../../../../api/form.api";

import "./FormPreview.css";

interface FormPreviewProps {
    form: Form;
    mode?: "preview" | "public";
    onAnswerChange?: (
        fieldId: string,
        value: string | string[],
    ) => void;
    fieldErrors?: Record<string, string>;
    isSubmitting?: boolean;
}

const FormPreview = ({
    form,
    mode = "preview",
    onAnswerChange,
    fieldErrors = {},
    isSubmitting = false,
}: FormPreviewProps) => {
    const isPublic = mode === "public";

    return (
        <section className="form-preview">
            <div className="form-preview-header">
                {!isPublic && (
                    <span className="form-preview-label">
                        Form preview
                    </span>
                )}

                <h1>{form.title}</h1>

                {form.description && (
                    <p>{form.description}</p>
                )}
            </div>

            <div className="form-preview-fields">
                {form.fields?.map((field) => (
                    <div
                        key={field.id}
                        className="form-preview-field"
                    >
                        <label>
                            {field.label}

                            {field.required && (
                                <span className="form-preview-required">
                                    *
                                </span>
                            )}
                        </label>

                        {renderField(
                            field,
                            isPublic,
                            onAnswerChange,
                        )}

                        {fieldErrors[field.id] && (
                            <span className="form-preview-error">
                                {fieldErrors[field.id]}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {isPublic && (
                <div className="form-preview-submit">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="form-preview-spinner" />
                                Submitting...
                            </>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </div>
            )}
        </section>
    );
};

const renderField = (
    field: NonNullable<Form["fields"]>[number],
    isPublic: boolean,
    onAnswerChange?: (
        fieldId: string,
        value: string | string[],
    ) => void,
) => {
    switch (field.type) {
        case "TEXT":
            return (
                <input
                    type="text"
                    placeholder={field.placeholder || ""}
                    disabled={!isPublic}
                    onChange={(event) =>
                        onAnswerChange?.(
                            field.id,
                            event.target.value,
                        )
                    }
                />
            );

        case "EMAIL":
            return (
                <input
                    type="email"
                    placeholder={field.placeholder || ""}
                    disabled={!isPublic}
                    onChange={(event) =>
                        onAnswerChange?.(
                            field.id,
                            event.target.value,
                        )
                    }
                />
            );

        case "NUMBER":
            return (
                <input
                    type="number"
                    placeholder={field.placeholder || ""}
                    disabled={!isPublic}
                    onChange={(event) =>
                        onAnswerChange?.(
                            field.id,
                            event.target.value,
                        )
                    }
                />
            );

        case "TEXTAREA":
            return (
                <textarea
                    placeholder={field.placeholder || ""}
                    disabled={!isPublic}
                    onChange={(event) =>
                        onAnswerChange?.(
                            field.id,
                            event.target.value,
                        )
                    }
                />
            );

        case "SELECT":
            return (
                <select
                    defaultValue=""
                    disabled={!isPublic}
                    onChange={(event) =>
                        onAnswerChange?.(
                            field.id,
                            event.target.value,
                        )
                    }
                >
                    <option value="">
                        Select an option
                    </option>

                    {field.options?.map((option) => (
                        <option
                            key={option.id}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            );

        case "RADIO":
            return (
                <div className="form-preview-options">
                    {field.options?.map((option) => (
                        <label
                            key={option.id}
                            className="form-preview-option"
                        >
                            <input
                                type="radio"
                                name={field.id}
                                value={option.value}
                                disabled={!isPublic}
                                onChange={(event) =>
                                    onAnswerChange?.(
                                        field.id,
                                        event.target.value,
                                    )
                                }
                            />

                            <span>{option.label}</span>
                        </label>
                    ))}
                </div>
            );

        case "CHECKBOX":
            return (
                <div className="form-preview-options">
                    {field.options?.map((option) => (
                        <label
                            key={option.id}
                            className="form-preview-option"
                        >
                            <input
                                type="checkbox"
                                value={option.value}
                                disabled={!isPublic}
                                onChange={(event) => {
                                    const value = event.target.checked
                                        ? [event.target.value]
                                        : [];

                                    onAnswerChange?.(
                                        field.id,
                                        value,
                                    );
                                }}
                            />

                            <span>{option.label}</span>
                        </label>
                    ))}
                </div>
            );

        case "DATE":
            return (
                <input
                    type="date"
                    disabled={!isPublic}
                    onChange={(event) =>
                        onAnswerChange?.(
                            field.id,
                            event.target.value,
                        )
                    }
                />
            );

        default:
            return null;
    }
};

export default FormPreview;