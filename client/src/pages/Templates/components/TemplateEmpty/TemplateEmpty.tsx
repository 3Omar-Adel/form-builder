import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

import "./TemplateEmpty.css";

const TemplateEmpty = () => {
    return (
        <div className="template-empty">

            <div className="template-empty-icon">
                <AutoAwesomeOutlinedIcon />
            </div>

            <h2>
                No templates found
            </h2>

            <p>
                We couldn't find any templates
                matching your search.
            </p>

        </div>
    );
};

export default TemplateEmpty;