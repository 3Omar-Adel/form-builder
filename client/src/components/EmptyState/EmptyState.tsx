import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import "./EmptyState.css";

interface EmptyStateProps {
    title: string;
    description: string;
    buttonText: string;
    onButtonClick: () => void;
}

const EmptyState = ({
    title,
    description,
    buttonText,
    onButtonClick,
}: EmptyStateProps) => {
    return (
        <div className="empty-state">
            <div className="empty-state-icon">
                <DescriptionOutlinedIcon />
            </div>

            <h3>{title}</h3>

            <p>{description}</p>

            <button
                type="button"
                className="empty-state-button"
                onClick={onButtonClick}
            >
                {buttonText}
            </button>
        </div>
    );
};

export default EmptyState;