import { useNavigate } from "react-router-dom";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";

import "./BuilderHeader.css";

const BuilderHeader = () => {
    const navigate = useNavigate();

    return (
        <header className="builder-header">
            <div className="builder-header-left">
                <button
                    type="button"
                    className="builder-back-button"
                    onClick={() => navigate("/dashboard")}
                    aria-label="Back to dashboard"
                >
                    <ArrowBackOutlinedIcon />
                </button>

                <div className="builder-title-wrapper">
                    <h1 className="builder-title">
                        Create Form
                    </h1>

                    <p className="builder-subtitle">
                        Build and customize your form
                    </p>
                </div>
            </div>

            <div className="builder-header-actions">
                <button
                    type="button"
                    className="builder-header-button"
                >
                    <SaveOutlinedIcon />

                    <span>Save Draft</span>
                </button>

                <button
                    type="button"
                    className="builder-header-button primary"
                >
                    <PublishOutlinedIcon />

                    <span>Publish</span>
                </button>
            </div>
        </header>
    );
};

export default BuilderHeader;