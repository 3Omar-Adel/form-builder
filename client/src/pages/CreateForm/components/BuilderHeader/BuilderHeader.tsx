import {
    useNavigate,
} from "react-router-dom";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import "./BuilderHeader.css";

interface BuilderHeaderProps {
    onSave: () => void;
    isSaving: boolean;
    isEditMode: boolean;
}

const BuilderHeader = ({
    onSave,
    isSaving,
    isEditMode,
}: BuilderHeaderProps) => {
    const navigate =
        useNavigate();

    return (
        <header className="builder-header">
            <div className="builder-header-left">

                <button
                    type="button"
                    className="builder-back-button"
                    onClick={() =>
                        navigate(
                            "/dashboard",
                        )
                    }
                    aria-label="Back to dashboard"
                >
                    <ArrowBackOutlinedIcon />
                </button>

                <div className="builder-title-wrapper">
                    <h1 className="builder-title">
                        {isEditMode
                            ? "Edit Form"
                            : "Create Form"}
                    </h1>

                    <p className="builder-subtitle">
                        {isEditMode
                            ? "Update and customize your form"
                            : "Build and customize your form"}
                    </p>
                </div>

            </div>

            <div className="builder-header-actionss">

                <button
                    type="button"
                    className="builder-header-buttonn"
                    onClick={onSave}
                    disabled={isSaving}
                >
                    <SaveOutlinedIcon />

                    <span>
                        {isSaving
                            ? "Saving..."
                            : isEditMode
                                ? "Save Changes"
                                : "Save Draft"}
                    </span>
                </button>


            </div>
        </header>
    );
};

export default BuilderHeader;
