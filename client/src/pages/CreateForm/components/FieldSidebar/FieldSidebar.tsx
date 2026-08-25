import {
    useDraggable,
} from "@dnd-kit/core";

import ShortTextOutlinedIcon from "@mui/icons-material/ShortTextOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NumbersOutlinedIcon from "@mui/icons-material/NumbersOutlined";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

import type {
    FieldType,
} from "../../../../types/form";

import "./FieldSidebar.css";

interface FieldSidebarProps {
    onAddField: (
        type: FieldType,
    ) => void;
}

interface DraggableFieldProps {
    type: FieldType;
    label: string;
    icon: React.ReactNode;
    onAddField: (
        type: FieldType,
    ) => void;
}

const DraggableField = ({
    type,
    label,
    icon,
    onAddField,
}: DraggableFieldProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        isDragging,
    } = useDraggable({
        id: `sidebar-${type}`,
        data: {
            source: "sidebar",
            type,
        },
    });

    return (
        <button
            ref={setNodeRef}
            type="button"
            className={`field-sidebar-item ${
                isDragging
                    ? "dragging"
                    : ""
            }`}
            onClick={() =>
                onAddField(type)
            }
            {...listeners}
            {...attributes}
        >
            <span className="field-sidebar-icon">
                {icon}
            </span>

            <span className="field-sidebar-item-content">
                <span className="field-sidebar-item-title">
                    {label}
                </span>
            </span>
        </button>
    );
};

const FieldSidebar = ({
    onAddField,
}: FieldSidebarProps) => {
    const fields = [
        {
            type: "TEXT" as FieldType,
            label: "Text",
            icon: (
                <ShortTextOutlinedIcon />
            ),
        },
        {
            type: "EMAIL" as FieldType,
            label: "Email",
            icon: (
                <EmailOutlinedIcon />
            ),
        },
        {
            type: "NUMBER" as FieldType,
            label: "Number",
            icon: (
                <NumbersOutlinedIcon />
            ),
        },
        {
            type: "TEXTAREA" as FieldType,
            label: "Textarea",
            icon: (
                <NotesOutlinedIcon />
            ),
        },
        {
            type: "SELECT" as FieldType,
            label: "Select",
            icon: (
                <ListOutlinedIcon />
            ),
        },
        {
            type: "RADIO" as FieldType,
            label: "Radio",
            icon: (
                <RadioButtonCheckedOutlinedIcon />
            ),
        },
        {
            type: "CHECKBOX" as FieldType,
            label: "Checkbox",
            icon: (
                <CheckBoxOutlinedIcon />
            ),
        },
        {
            type: "DATE" as FieldType,
            label: "Date",
            icon: (
                <CalendarTodayOutlinedIcon />
            ),
        },
    ];

    return (
        <aside className="field-sidebar">
            <div className="field-sidebar-header">
                <h2 className="field-sidebar-title">
                    Fields
                </h2>

                <p className="field-sidebar-description">
                    Click or drag a field into
                    your form
                </p>
            </div>

            <div className="field-sidebar-list">
                {fields.map(
                    (field) => (
                        <DraggableField
                            key={field.type}
                            type={field.type}
                            label={field.label}
                            icon={field.icon}
                            onAddField={
                                onAddField
                            }
                        />
                    ),
                )}
            </div>
        </aside>
    );
};

export default FieldSidebar;