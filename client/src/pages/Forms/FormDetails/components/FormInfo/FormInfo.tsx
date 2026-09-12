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

                <strong title={form.id}>
                    {form.id}
                </strong>
            </div>

            <div className="form-info-item">
                <span>Status</span>

                <strong>
                    {form.status}
                </strong>
            </div>

            <div className="form-info-item">
                <span>Fields</span>

                <strong>
                    {form._count?.fields ?? 0}
                </strong>
            </div>

            <div className="form-info-item">
                <span>Responses</span>

                <strong>
                    {form._count?.responses ?? 0}
                </strong>
            </div>
        </section>
    );
};

export default FormInfo;