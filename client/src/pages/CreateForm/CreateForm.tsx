import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    DndContext,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { useSaveForm } from "../../hooks/useSaveForm";
import { fromServerFields } from "../../api/field.mapper";
import { formApi } from "../../api/form.api";

import type {
    FieldType,
    FormField,
    FormFieldOption,
} from "../../types/form";

import BuilderHeader from "./components/BuilderHeader/BuilderHeader";
import FieldSidebar from "./components/FieldSidebar/FieldSidebar";
import FormCanvas from "./components/FormCanvas/FormCanvas";
import FieldProperties from "./components/FieldProperties/FieldProperties";

import "./CreateForm.css";

const CreateForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [fields, setFields] = useState<FormField[]>([]);
    const [initialFields, setInitialFields] = useState<FormField[]>([]);
    const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

    const { isSaving, error, saveForm } = useSaveForm({
        formId: id,
        title,
        description,
        fields,
        initialFields,
    });

    useEffect(() => {
        if (!id) {
            return;
        }

        const loadForm = async () => {
            try {
                const response = await formApi.getById(id);
                const form = response.data.form;
                const loadedFields = fromServerFields(form.fields ?? []);

                setTitle(form.title);
                setDescription(form.description ?? "");
                setFields(loadedFields);
                setInitialFields(loadedFields);
            } catch (error) {
                console.error("Failed to load form:", error);
            }
        };

        loadForm();
    }, [id]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
    );

    const addField = (type: FieldType, insertIndex?: number) => {
        const newField: FormField = {
            id: crypto.randomUUID(),
            type,
            label: getDefaultLabel(type),
            placeholder: "",
            required: false,
            position: insertIndex ?? fields.length,
            options: getDefaultOptions(type),
        };

        setFields((currentFields) => {
            const index = insertIndex ?? currentFields.length;
            const updatedFields = [...currentFields];

            updatedFields.splice(index, 0, newField);

            return updatedFields.map((field, position) => ({
                ...field,
                position,
            }));
        });

        setSelectedFieldId(newField.id);
    };

    const deleteField = (fieldId: string) => {
        setFields((currentFields) =>
            currentFields
                .filter((field) => field.id !== fieldId)
                .map((field, index) => ({
                    ...field,
                    position: index,
                })),
        );

        if (selectedFieldId === fieldId) {
            setSelectedFieldId(null);
        }
    };

    const updateField = (
        fieldId: string,
        updates: Partial<FormField>,
    ) => {
        setFields((currentFields) =>
            currentFields.map((field) =>
                field.id === fieldId
                    ? { ...field, ...updates }
                    : field,
            ),
        );
    };

    const reorderFields = (oldIndex: number, newIndex: number) => {
        setFields((currentFields) =>
            arrayMove(currentFields, oldIndex, newIndex).map(
                (field, index) => ({
                    ...field,
                    position: index,
                }),
            ),
        );
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            return;
        }

        const activeData = active.data.current;

        if (activeData?.source === "sidebar") {
            const fieldType = activeData.type as FieldType;

            if (over.id === "form-canvas") {
                addField(fieldType);
                return;
            }

            const overIndex = fields.findIndex(
                (field) => field.id === over.id,
            );

            if (overIndex !== -1) {
                addField(fieldType, overIndex);
            }

            return;
        }

        if (activeData?.source === "canvas") {
            if (over.id === "form-canvas" || active.id === over.id) {
                return;
            }

            const oldIndex = fields.findIndex(
                (field) => field.id === active.id,
            );

            const newIndex = fields.findIndex(
                (field) => field.id === over.id,
            );

            if (oldIndex === -1 || newIndex === -1) {
                return;
            }

            reorderFields(oldIndex, newIndex);
        }
    };

    const selectedField =
        fields.find((field) => field.id === selectedFieldId) ?? null;

    const handleSave = async () => {
        const formId = await saveForm();

        if (!formId) {
            return;
        }

        navigate(`/forms/${formId}`);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <div className="create-form-page">
                <BuilderHeader
                    onSave={handleSave}
                    isSaving={isSaving}
                    isEditMode={isEditMode}
                />

                {error && (
                    <div className="create-form-error">
                        {error}
                    </div>
                )}

                <div className="create-form-workspace">
                    <FieldSidebar onAddField={addField} />

                    <main className="create-form-canvas">
                        <FormCanvas
                            title={title}
                            description={description}
                            fields={fields}
                            selectedFieldId={selectedFieldId}
                            onChangeTitle={setTitle}
                            onChangeDescription={setDescription}
                            onSelectField={setSelectedFieldId}
                            onDeleteField={deleteField}
                        />
                    </main>

                    <FieldProperties
                        field={selectedField}
                        onUpdateField={updateField}
                        onDeleteField={deleteField}
                    />
                </div>
            </div>
        </DndContext>
    );
};

const getDefaultLabel = (type: FieldType) => {
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
): FormFieldOption[] | undefined => {
    const choiceFieldTypes: FieldType[] = [
        "SELECT",
        "RADIO",
        "CHECKBOX",
    ];

    if (!choiceFieldTypes.includes(type)) {
        return undefined;
    }

    return [
        {
            id: crypto.randomUUID(),
            label: "Option 1",
            value: "option-1",
        },
    ];
};

export default CreateForm;