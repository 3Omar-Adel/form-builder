import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

import "./PublicFormSuccess.css";

const PublicFormSuccess = () => {
    return (
        <div className="public-form-success-page">
            <div className="public-form-success">
                <div className="public-form-success-icon">
                    <CheckOutlinedIcon />
                </div>

                <h1>Thank you!</h1>

                <p>
                    Your response has been submitted
                    successfully.
                </p>

                <span>
                    Your answers have been received.
                </span>
            </div>
        </div>
    );
};

export default PublicFormSuccess;