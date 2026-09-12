import { useState } from "react";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import type { Form } from "../../../../api/form.api";

import "./TemplateCard.css";

interface TemplateCardProps {
    template: Form;
    onSave: (templateId: string) => Promise<void>;
}

const TemplateCard = ({
    template,
    onSave,
}: TemplateCardProps) => {
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const fields = template.fields ?? [];

    const handleSave = async () => {
        if (isSaving || isSaved) {
            return;
        }

        try {
            setIsSaving(true);

            await onSave(template.id);

            setIsSaved(true);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <article className="template-card">

            <div className="template-card-preview">

                <div className="template-preview-header">

                    <div className="template-preview-dots">
                        <span />
                        <span />
                        <span />
                    </div>

                    <span>
                        Preview
                    </span>

                </div>

                <div className="template-preview-body">

                    <div className="template-preview-title">
                        {template.title}
                    </div>

                    {template.description && (
                        <div className="template-preview-description">
                            {template.description}
                        </div>
                    )}

                    <div className="template-preview-fields">

                        {fields
                            .slice(0, 4)
                            .map((field) => (
                                <div
                                    key={field.id}
                                    className="template-preview-field"
                                >
                                    <span>
                                        {field.label}
                                    </span>

                                    <div className="template-preview-input">
                                        {field.type === "RADIO" ||
                                        field.type === "CHECKBOX" ? (
                                            <>
                                                <i />
                                                <em>
                                                    Option
                                                </em>
                                            </>
                                        ) : (
                                            "Your answer..."
                                        )}
                                    </div>
                                </div>
                            ))}

                        {fields.length > 4 && (
                            <div className="template-more-fields">
                                +{fields.length - 4} more fields
                            </div>
                        )}

                    </div>

                </div>

            </div>

            <div className="template-card-content">

                <div className="template-card-top">

                    <div className="template-card-icon">
                        <DescriptionOutlinedIcon />
                    </div>

                    <span className="template-card-status">
                        Template
                    </span>

                </div>

                <h3>
                    {template.title}
                </h3>

                <p>
                    {template.description ||
                        "A ready-made form you can customize for your needs."}
                </p>

                <div className="template-card-meta">

                    <span>
                        {fields.length}{" "}
                        {fields.length === 1
                            ? "field"
                            : "fields"}
                    </span>

                    <span>
                        •
                    </span>

                    <span>
                        Ready to use
                    </span>

                </div>

                <div className="template-card-actions">

                    <button
                        type="button"
                        className="template-preview-button"
                    >
                        <VisibilityOutlinedIcon />

                        <span>
                            Preview
                        </span>
                    </button>

                    <button
                        type="button"
                        className={`template-save-button ${
                            isSaved
                                ? "saved"
                                : ""
                        }`}
                        onClick={handleSave}
                        disabled={
                            isSaving ||
                            isSaved
                        }
                    >
                        {isSaved ? (
                            <CheckOutlinedIcon />
                        ) : (
                            <AddOutlinedIcon />
                        )}

                        <span>
                            {isSaving
                                ? "Saving..."
                                : isSaved
                                    ? "Saved"
                                    : "Save template"}
                        </span>
                    </button>

                </div>

            </div>

        </article>
    );
};

export default TemplateCard;