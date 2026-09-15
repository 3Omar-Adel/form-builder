import { Link } from "react-router-dom";

import type { Form } from "../../../../../api/form.api";

import "./FormInfo.css";

interface FormInfoProps {
    form: Form;
}

const FormInfo = ({ form }: FormInfoProps) => {
    return (
        <section className="form-info">
            <div className="form-info-item">
                <span>ID</span>
                <strong title={form.id}>{form.id}</strong>
            </div>

            <div className="form-info-item">
                <span>Status</span>
                <strong>{form.status}</strong>
            </div>

            <div className="form-info-item">
                <span>Fields</span>
                <strong>{form._count?.fields ?? 0}</strong>
            </div>

            <Link
                to={`/forms/${form.id}/responses`}
                className="form-info-item form-info-item-link"
            >
                <span>Responses</span>
                <strong>{form._count?.responses ?? 0}</strong>
            </Link>
        </section>
    );
};

export default FormInfo;