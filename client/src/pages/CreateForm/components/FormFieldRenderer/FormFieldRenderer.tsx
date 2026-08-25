import {
    useSortable,
} from "@dnd-kit/sortable";

import {
    CSS,
} from "@dnd-kit/utilities";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";

import type {
    FormField,
} from "../../../../types/form";

import "./FormFieldRenderer.css";

interface FormFieldRendererProps {
    field: FormField;
    isSelected: boolean;
    onClick: () => void;
    onDelete: () => void;
}

const FormFieldRenderer = ({
    field,
    isSelected,
    onClick,
    onDelete,
}: FormFieldRendererProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: field.id,
        data: {
            source: "canvas",
        },
    });

    const style = {
        transform: CSS.Transform.toString(
            transform,
        ),
        transition,
    };

    const className = [
        "form-field",
        isSelected ? "selected" : "",
        isDragging ? "dragging" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={className}
            onClick={onClick}
            {...attributes}
        >
            <div className="form-field-toolbar">
                <button
                    type="button"
                    className="form-field-drag-handle"
                    {...listeners}
                    aria-label="Move field"
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                >
                    <DragIndicatorOutlinedIcon />
                </button>

                <button
                    type="button"
                    className="form-field-delete-button"
                    aria-label="Delete field"
                    onClick={(event) => {
                        event.stopPropagation();
                        onDelete();
                    }}
                >
                    <DeleteOutlineOutlinedIcon />
                </button>
            </div>

            <label className="form-field-label">
                {field.label}

                {field.required && (
                    <span className="form-field-required">
                        *
                    </span>
                )}
            </label>

            {renderField(field)}
        </div>
    );
};

const renderField = (
    field: FormField,
) => {
    switch (field.type) {
        case "TEXT":
            return (
                <input
                    type="text"
                    placeholder={
                        field.placeholder
                    }
                    readOnly
                    tabIndex={-1}
                />
            );

        case "EMAIL":
            return (
                <input
                    type="email"
                    placeholder={
                        field.placeholder
                    }
                    readOnly
                    tabIndex={-1}
                />
            );

        case "NUMBER":
            return (
                <input
                    type="number"
                    placeholder={
                        field.placeholder
                    }
                    readOnly
                    tabIndex={-1}
                />
            );

        case "TEXTAREA":
            return (
                <textarea
                    placeholder={
                        field.placeholder
                    }
                    readOnly
                    tabIndex={-1}
                />
            );

        case "SELECT":
            return (
                <select
                    value=""
                    onChange={() =>
                        undefined
                    }
                    tabIndex={-1}
                >
                    <option value="">
                        Select an option
                    </option>

                    {field.options?.map(
                        (option) => (
                            <option
                                key={
                                    option.id
                                }
                                value={
                                    option.value
                                }
                            >
                                {
                                    option.value
                                }
                            </option>
                        ),
                    )}
                </select>
            );

        case "RADIO":
            return (
                <div className="form-field-options">
                    {field.options?.map(
                        (option) => (
                            <label
                                key={
                                    option.id
                                }
                                className="form-field-option"
                            >
                                <input
                                    type="radio"
                                    name={
                                        field.id
                                    }
                                    disabled
                                />

                                <span>
                                    {
                                        option.value
                                    }
                                </span>
                            </label>
                        ),
                    )}
                </div>
            );

        case "CHECKBOX":
            return (
                <div className="form-field-options">
                    {field.options?.map(
                        (option) => (
                            <label
                                key={
                                    option.id
                                }
                                className="form-field-option"
                            >
                                <input
                                    type="checkbox"
                                    disabled
                                />

                                <span>
                                    {
                                        option.value
                                    }
                                </span>
                            </label>
                        ),
                    )}
                </div>
            );

        case "DATE":
            return (
                <input
                    type="date"
                    readOnly
                    tabIndex={-1}
                />
            );

        default:
            return null;
    }
};

export default FormFieldRenderer;