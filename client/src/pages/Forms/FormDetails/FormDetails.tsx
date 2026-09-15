import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { formApi, type Form } from "../../../api/form.api";

import FormInfo from "./components/FormInfo/FormInfo";
import FormActions from "./components/FormActions/FormActions";
import FormPreview from "./components/FormPreview/FormPreview";
import FormDetailsSkeleton from "./components/FormDetailsSkeleton/FormDetailsSkeleton";

import "./FormDetails.css";

const FormDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [form, setForm] = useState<Form | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getForm = async () => {
            if (!id) {
                setError("Form ID is missing.");
                setIsLoading(false);
                return;
            }

            try {
                const response = await formApi.getById(id);
                setForm(response.data.form);
            } catch (error) {
                console.error("Failed to load form:", error);
                setError("Failed to load form. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        getForm();
    }, [id]);

    if (isLoading) {
        return <FormDetailsSkeleton />;
    }

    if (error) {
        return (
            <div className="form-details-page">
                <div className="form-details-error">
                    {error}
                </div>
            </div>
        );
    }

    if (!form) {
        return (
            <div className="form-details-page">
                <div className="form-details-error">
                    Form not found.
                </div>
            </div>
        );
    }

    return (
        <div className="form-details-page">
            <div className="form-details-container">
                <div className="form-details-topbar">
                    <button
                        type="button"
                        className="form-details-back"
                        onClick={() => navigate("/forms")}
                    >
                        <ArrowBackOutlinedIcon />
                        <span>Back to Forms</span>
                    </button>
                </div>

                <FormInfo form={form} />

                <FormActions
                    form={form}
                    onFormUpdate={setForm}
                />

                <FormPreview form={form} />
            </div>
        </div>
    );
};

export default FormDetails;