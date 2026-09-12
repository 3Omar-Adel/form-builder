import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import type { FormField } from "../../../../types/form";

import "./FieldProperties.css";

interface FieldPropertiesProps {
    field: FormField | null;
    onUpdateField: (id: string, updates: Partial<FormField>) => void;
    onDeleteField: (id: string) => void;
}

const FieldProperties = ({
    field,
    onUpdateField,
    onDeleteField,
}: FieldPropertiesProps) => {
    if (!field) {
        return (
            <aside className="field-properties">
                <div className="field-properties-empty">
                    <h2>Properties</h2>
                    <p>Select a field to edit its settings.</p>
                </div>
            </aside>
        );
    }

    const hasOptions =
        field.type === "SELECT" ||
        field.type === "RADIO" ||
        field.type === "CHECKBOX";

    const addOption = () => {
        const currentOptions = field.options ?? [];
        const optionNumber = currentOptions.length + 1;
        const optionLabel = `Option ${optionNumber}`;

        onUpdateField(field.id, {
            options: [
                ...currentOptions,
                {
                    id: crypto.randomUUID(),
                    label: optionLabel,
                    value: optionLabel,
                },
            ],
        });
    };

    const updateOption = (optionId: string, text: string) => {
        onUpdateField(field.id, {
            options: field.options?.map((option) =>
                option.id === optionId
                    ? {
                        ...option,
                        label: text,
                        value: text,
                    }
                    : option,
            ),
        });
    };

    const deleteOption = (optionId: string) => {
        onUpdateField(field.id, {
            options: field.options?.filter(
                (option) => option.id !== optionId,
            ),
        });
    };

    return (
        <aside className="field-properties">
            <div className="field-properties-header">
                <h2>Properties</h2>

                <button
                    type="button"
                    className="field-properties-delete"
                    onClick={() => onDeleteField(field.id)}
                    aria-label="Delete field"
                >
                    <DeleteOutlineOutlinedIcon />
                </button>
            </div>

            <div className="field-properties-content">
                <div className="property-group">
                    <label htmlFor="field-label">Label</label>

                    <input
                        id="field-label"
                        value={field.label}
                        onChange={(event) =>
                            onUpdateField(field.id, {
                                label: event.target.value,
                            })
                        }
                    />
                </div>

                {field.type !== "CHECKBOX" && (
                    <div className="property-group">
                        <label htmlFor="field-placeholder">
                            Placeholder
                        </label>

                        <input
                            id="field-placeholder"
                            value={field.placeholder ?? ""}
                            onChange={(event) =>
                                onUpdateField(field.id, {
                                    placeholder: event.target.value,
                                })
                            }
                        />
                    </div>
                )}

                <label className="property-checkbox">
                    <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(event) =>
                            onUpdateField(field.id, {
                                required: event.target.checked,
                            })
                        }
                    />

                    <span>Required field</span>
                </label>

                {hasOptions && (
                    <div className="property-options">
                        <div className="property-options-header">
                            <h3>Options</h3>

                            <button
                                type="button"
                                onClick={addOption}
                            >
                                Add option
                            </button>
                        </div>

                        <div className="property-options-list">
                            {(field.options ?? []).map((option) => (
                                <div
                                    key={option.id}
                                    className="property-option"
                                >
                                    <input
                                        value={option.label}
                                        onChange={(event) =>
                                            updateOption(
                                                option.id,
                                                event.target.value,
                                            )
                                        }
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            deleteOption(option.id)
                                        }
                                        aria-label="Delete option"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
};

export default FieldProperties;