import { ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";

import "./CTASection.css";

const CTASection = () => {
    return (
        <section className="cta-section">
            <div className="cta-container">

                <div className="cta-glow" />

                <div className="cta-content">

                    <span className="cta-eyebrow">
                        START BUILDING
                    </span>

                    <h2>
                        Ready to create
                        <br />
                        your first form?
                    </h2>

                    <p>
                        Create a form, share it with anyone,
                        and start collecting responses today.
                    </p>

                    <Link
                        to="/register"
                        className="cta-button"
                    >
                        Get started for free
                        <ArrowForward />
                    </Link>

                </div>

            </div>
        </section>
    );
};

export default CTASection;