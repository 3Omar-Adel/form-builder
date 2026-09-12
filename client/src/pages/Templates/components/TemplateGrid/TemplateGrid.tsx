import type { Form } from "../../../../api/form.api";

import TemplateCard from "../TemplateCard/TemplateCard";

import "./TemplateGrid.css";

interface TemplateGridProps {
    templates: Form[];
    isLoading: boolean;
    onSave: (templateId: string) => Promise<void>;
}

const TemplateGrid = ({
    templates,
    isLoading,
    onSave,
}: TemplateGridProps) => {
    if (isLoading) {
        return (
            <div className="template-grid">

                {Array.from({
                    length: 6,
                }).map((_, index) => (
                    <div
                        key={index}
                        className="template-skeleton"
                    />
                ))}

            </div>
        );
    }

    return (
        <div className="template-grid">

            {templates.map((template) => (
                <TemplateCard
                    key={template.id}
                    template={template}
                    onSave={onSave}
                />
            ))}

        </div>
    );
};

export default TemplateGrid;