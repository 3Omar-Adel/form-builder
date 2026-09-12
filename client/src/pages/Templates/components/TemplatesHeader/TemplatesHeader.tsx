import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

import "./TemplatesHeader.css";

interface TemplatesHeaderProps {
    templateCount: number;
}

const TemplatesHeader = ({
    templateCount,
}: TemplatesHeaderProps) => {
    return (
        <section className="templates-header">

            <div className="templates-header-content">

                <div className="templates-header-icon">
                    <AutoAwesomeOutlinedIcon />
                </div>

                <div className="templates-header-text">

                    <div className="templates-header-title">
                        <h1>
                            Templates
                        </h1>

                        <span>
                            {templateCount}
                        </span>
                    </div>

                    <p>
                        Start faster with ready-made
                        forms designed for different
                        needs.
                    </p>

                </div>

            </div>

        </section>
    );
};

export default TemplatesHeader;
