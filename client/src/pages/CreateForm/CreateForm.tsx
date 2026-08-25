import { useState } from "react";

import {
    DndContext,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";

import {
    arrayMove,
} from "@dnd-kit/sortable";

import type {
    FieldType,
    FormField,
} from "../../types/form";

import BuilderHeader from "./components/BuilderHeader/BuilderHeader";
import FieldSidebar from "./components/FieldSidebar/FieldSidebar";
import FormCanvas from "./components/FormCanvas/FormCanvas";
import FieldProperties from "./components/FieldProperties/FieldProperties";

import "./CreateForm.css";

const CreateForm = () => {
    const [fields, setFields] = useState<FormField[]>([]);

    const [selectedFieldId, setSelectedFieldId] =
        useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
    );

    /*
     * Add a new field to the form.
     */
    const addField = (
        type: FieldType,
        insertIndex?: number,
    ) => {
        const newField: FormField = {
            id: crypto.randomUUID(),

            type,

            label: getDefaultLabel(type),

            placeholder: "",

            required: false,

            position:
                insertIndex ??
                fields.length,

            options: getDefaultOptions(type),
        };

        setFields((currentFields) => {
            const index =
                insertIndex ??
                currentFields.length;

            const updatedFields = [
                ...currentFields,
            ];

            updatedFields.splice(
                index,
                0,
                newField,
            );

            return updatedFields.map(
                (field, position) => ({
                    ...field,
                    position,
                }),
            );
        });

        setSelectedFieldId(newField.id);
    };

    /*
     * Delete field.
     */
    const deleteField = (
        id: string,
    ) => {
        setFields((currentFields) =>
            currentFields
                .filter(
                    (field) =>
                        field.id !== id,
                )
                .map(
                    (
                        field,
                        index,
                    ) => ({
                        ...field,
                        position: index,
                    }),
                ),
        );

        if (
            selectedFieldId === id
        ) {
            setSelectedFieldId(null);
        }
    };

    /*
     * Update field properties.
     */
    const updateField = (
        id: string,
        updates: Partial<FormField>,
    ) => {
        setFields((currentFields) =>
            currentFields.map(
                (field) =>
                    field.id === id
                        ? {
                              ...field,
                              ...updates,
                          }
                        : field,
            ),
        );
    };

    /*
     * Reorder existing fields.
     */
    const reorderFields = (
        oldIndex: number,
        newIndex: number,
    ) => {
        setFields((currentFields) =>
            arrayMove(
                currentFields,
                oldIndex,
                newIndex,
            ).map(
                (
                    field,
                    index,
                ) => ({
                    ...field,
                    position: index,
                }),
            ),
        );
    };

    /*
     * Handle every drag operation.
     */
    const handleDragEnd = (
    event: DragEndEvent,
) => {
    const {
        active,
        over,
    } = event;

    const activeData =
        active.data.current;

    /*
     * Sidebar → Canvas
     */
    if (
        activeData?.source ===
        "sidebar"
    ) {
        const fieldType =
            activeData.type as FieldType;

        if (!over) {
            return;
        }

        /*
         * Dropped directly on the canvas
         */
        if (
            over.id === "form-canvas"
        ) {
            addField(fieldType);
            return;
        }

        /*
         * Dropped on an existing field
         */
        const overIndex =
            fields.findIndex(
                (field) =>
                    field.id === over.id,
            );

        if (overIndex !== -1) {
            addField(
                fieldType,
                overIndex,
            );
        }

        return;
    }

    /*
     * Canvas → Canvas
     */
    if (
        activeData?.source ===
        "canvas"
    ) {
        if (!over) {
            return;
        }

        /*
         * Dropped on the canvas itself.
         * Don't reorder in this case.
         */
        if (
            over.id === "form-canvas"
        ) {
            return;
        }

        /*
         * Same field
         */
        if (
            active.id === over.id
        ) {
            return;
        }

        const oldIndex =
            fields.findIndex(
                (field) =>
                    field.id ===
                    active.id,
            );

        const newIndex =
            fields.findIndex(
                (field) =>
                    field.id ===
                    over.id,
            );

        if (
            oldIndex === -1 ||
            newIndex === -1
        ) {
            return;
        }

        reorderFields(
            oldIndex,
            newIndex,
        );
    }
};

    const selectedField =
        fields.find(
            (field) =>
                field.id ===
                selectedFieldId,
        ) ?? null;

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={
                closestCenter
            }
            onDragEnd={
                handleDragEnd
            }
        >
            <div className="create-form-page">
                <BuilderHeader />

                <div className="create-form-workspace">
                    <FieldSidebar
                        onAddField={
                            addField
                        }
                    />

                    <main className="create-form-canvas">
                        <FormCanvas
                            fields={fields}
                            selectedFieldId={
                                selectedFieldId
                            }
                            onSelectField={
                                setSelectedFieldId
                            }
                            onDeleteField={
                                deleteField
                            }
                        />
                    </main>

                    <FieldProperties
                        field={
                            selectedField
                        }
                        onUpdateField={
                            updateField
                        }
                        onDeleteField={
                            deleteField
                        }
                    />
                </div>
            </div>
        </DndContext>
    );
};

const getDefaultLabel = (
    type: FieldType,
) => {
    switch (type) {
        case "TEXT":
            return "Text field";

        case "EMAIL":
            return "Email address";

        case "NUMBER":
            return "Number";

        case "TEXTAREA":
            return "Text area";

        case "SELECT":
            return "Select an option";

        case "RADIO":
            return "Choose an option";

        case "CHECKBOX":
            return "Checkbox";

        case "DATE":
            return "Date";

        default:
            return "New field";
    }
};

const getDefaultOptions = (
    type: FieldType,
) => {
    const choiceFieldTypes = [
        "SELECT",
        "RADIO",
        "CHECKBOX",
    ];

    if (
        !choiceFieldTypes.includes(
            type,
        )
    ) {
        return undefined;
    }

    return [
        {
            id: crypto.randomUUID(),
            value: "Option 1",
        },
    ];
};

export default CreateForm;