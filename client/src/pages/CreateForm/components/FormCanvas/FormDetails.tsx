import type { ChangeEvent } from "react";

import "./FormDetails.css";

interface FormDetailsProps {
    title: string;
    description: string | undefined;

    onChangeTitle: (value: string) => void;
    onChangeDescription: (value: string) => void;
}

const FormDetails = ({
    title,
    description,
    onChangeTitle,
    onChangeDescription,
}: FormDetailsProps) => {

    
    const handleTitleChange = (
        event: ChangeEvent<HTMLInputElement>,
    ) => {
        onChangeTitle(event.target.value);
    };

    const handleDescriptionChange = (
        event: ChangeEvent<HTMLTextAreaElement>,
    ) => {
        onChangeDescription(event.target.value);
    };

    return (
        <section className="form-details">
            <div className="form-details-row">
                <label
                    htmlFor="form-title"
                    className="form-details-label"
                >
                    Title
                </label>

                <input
                    id="form-title"
                    type="text"
                    className="form-details-input"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Untitled form"
                />
            </div>

            <div className="form-details-row form-details-description-row">
                <label
                    htmlFor="form-description"
                    className="form-details-label"
                >
                    Description
                </label>

                <textarea
                    id="form-description"
                    className="form-details-input form-details-textarea"
                    value={description ?? ""}
                    onChange={handleDescriptionChange}
                    placeholder="Add a description..."
                    rows={2}
                />
            </div>
        </section>
    );
};

export default FormDetails;
