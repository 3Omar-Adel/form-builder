import {
    useDroppable,
} from "@dnd-kit/core";

import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import type {
    FormField,
} from "../../../../types/form";

import FormFieldRenderer from "../FormFieldRenderer/FormFieldRenderer";

import "./FormCanvas.css";

interface FormCanvasProps {
    fields: FormField[];

    selectedFieldId: string | null;

    onSelectField: (
        id: string,
    ) => void;

    onDeleteField: (
        id: string,
    ) => void;
}

const FormCanvas = ({
    fields,
    selectedFieldId,
    onSelectField,
    onDeleteField,
}: FormCanvasProps) => {
    const {
        setNodeRef,
        isOver,
    } = useDroppable({
        id: "form-canvas",
        data: {
            type: "canvas",
        },
    });

    return (
        <section className="form-canvas">
            <div
                ref={setNodeRef}
                className={`form-preview ${
                    isOver
                        ? "form-preview-drag-over"
                        : ""
                }`}
            >
                {fields.length === 0 ? (
                    <div className="form-canvas-empty">
                        <h2>
                            Start building your form
                        </h2>

                        <p>
                            Click a field from the
                            sidebar or drag it here.
                        </p>
                    </div>
                ) : (
                    <SortableContext
                        items={fields.map(
                            (field) =>
                                field.id,
                        )}
                        strategy={
                            verticalListSortingStrategy
                        }
                    >
                        {fields.map(
                            (field) => (
                                <FormFieldRenderer
                                    key={field.id}
                                    field={field}
                                    isSelected={
                                        field.id ===
                                        selectedFieldId
                                    }
                                    onClick={() =>
                                        onSelectField(
                                            field.id,
                                        )
                                    }
                                    onDelete={() =>
                                        onDeleteField(
                                            field.id,
                                        )
                                    }
                                />
                            ),
                        )}
                    </SortableContext>
                )}
            </div>
        </section>
    );
};

export default FormCanvas;