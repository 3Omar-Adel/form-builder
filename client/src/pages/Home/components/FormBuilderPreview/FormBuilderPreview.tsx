import {
    Add,
    CalendarToday,
    CheckBox,
    DragIndicator,
    EmailOutlined,
    Numbers,
    RadioButtonChecked,
    ShortText,
    Subject,
    ArrowDropDown,
    SaveOutlined,
} from "@mui/icons-material";

import "./FormBuilderPreview.css";

const FormBuilderPreview = () => {
    return (
        <div className="preview-wrapper">

            {/* Live Preview */}

            <div className="preview-floating preview-live">
                <span className="preview-live-dot" />

                <span>
                    Live preview
                </span>
            </div>


            {/* Builder Window */}

            <div className="preview-window">

                {/* Header */}

                <header className="preview-header">

                    <div className="preview-header-left">

                        <button
                            type="button"
                            className="preview-back"
                        >
                            <DragIndicator />
                        </button>

                        <div className="preview-title">
                            <strong>
                                Create Form
                            </strong>

                            <span>
                                Build and customize your form
                            </span>
                        </div>

                    </div>


                    <button
                        type="button"
                        className="preview-save"
                    >
                        <SaveOutlined />

                        <span>
                            Save Draft
                        </span>
                    </button>

                </header>


                {/* Body */}

                <div className="preview-body">

                    {/* Fields Sidebar */}

                    <aside className="preview-sidebar">

                        <h4>
                            Fields
                        </h4>

                        <p>
                            Click or drag a field into your form
                        </p>

                        <PreviewField
                            icon={<ShortText />}
                            label="Text"
                        />

                        <PreviewField
                            icon={<EmailOutlined />}
                            label="Email"
                        />

                        <PreviewField
                            icon={<Numbers />}
                            label="Number"
                        />

                        <PreviewField
                            icon={<Subject />}
                            label="Textarea"
                        />

                        <PreviewField
                            icon={<ArrowDropDown />}
                            label="Select"
                        />

                        <PreviewField
                            icon={<RadioButtonChecked />}
                            label="Radio"
                        />

                        <PreviewField
                            icon={<CheckBox />}
                            label="Checkbox"
                        />

                        <PreviewField
                            icon={<CalendarToday />}
                            label="Date"
                        />

                    </aside>


                    {/* Form */}

                    <div className="preview-form">

                        <div className="preview-form-card">

                            <h2>
                                Customer Feedback
                            </h2>

                            <p>
                                We'd love to hear what you think!
                            </p>


                            <label>
                                What's your name?
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your name"
                                readOnly
                            />


                            <label>
                                How was your experience?
                            </label>

                            <div className="preview-options">

                                <span>
                                    <i />
                                    Excellent
                                </span>

                                <span>
                                    <i />
                                    Good
                                </span>

                                <span>
                                    <i />
                                    Average
                                </span>

                                <span>
                                    <i />
                                    Poor
                                </span>

                            </div>


                            <label>
                                Any suggestions?
                            </label>

                            <textarea
                                placeholder="Type your answer here..."
                                readOnly
                            />


                            <button className="preview-submit">
                                Submit
                            </button>

                        </div>

                    </div>


                    {/* Settings */}

                    <aside className="preview-settings">

                        <h4>
                            Field settings
                        </h4>

                        <span className="preview-label">
                            Question
                        </span>

                        <div className="preview-input">
                            How was your experience?
                        </div>

                        <span className="preview-label">
                            Type
                        </span>

                        <div className="preview-input">
                            Radio

                            <ArrowDropDown />
                        </div>

                        <div className="preview-required">
                            <span>
                                Required
                            </span>

                            <span className="preview-toggle" />
                        </div>

                        <span className="preview-label">
                            Options
                        </span>

                        {[
                            "Excellent",
                            "Good",
                            "Average",
                            "Poor",
                        ].map((option) => (
                            <div
                                className="preview-option"
                                key={option}
                            >
                                {option}

                                <span>
                                    ×
                                </span>
                            </div>
                        ))}

                        <button className="preview-add-option">
                            <Add />

                            Add option
                        </button>

                    </aside>

                </div>

            </div>


            {/* Responses */}

            <div className="preview-floating preview-responses">

                <div className="preview-bars">
                    <span />
                    <span />
                    <span />
                </div>

                <strong>
                    128
                </strong>

                <small>
                    Responses
                </small>

            </div>


            {/* Form Link */}

            <div className="preview-floating preview-link">

                <div className="preview-link-icon">
                    ↗
                </div>

                <strong>
                    Form link
                </strong>

                <small>
                    copied!
                </small>

            </div>

        </div>
    );
};


interface PreviewFieldProps {
    icon: React.ReactNode;
    label: string;
}

const PreviewField = ({
    icon,
    label,
}: PreviewFieldProps) => {
    return (
        <button
            type="button"
            className="preview-field"
        >
            <div className="preview-field-icon">
                {icon}
            </div>

            {label}

        </button>
    );
};

export default FormBuilderPreview;