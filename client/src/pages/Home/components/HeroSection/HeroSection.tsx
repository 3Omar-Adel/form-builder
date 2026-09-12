import {
    ArrowForward,
    PlayArrow,
    // CheckCircleOutline,
} from "@mui/icons-material";

import {
    Link,
} from "react-router-dom";

import FormBuilderPreview from "../FormBuilderPreview/FormBuilderPreview";

import "./HeroSection.css";

const HeroSection = () => {
    return (
        <section className="hero">

            <div className="hero-background-glow hero-glow-one" />
            <div className="hero-background-glow hero-glow-two" />

            <div className="hero-container">

                <div className="hero-content">
                    <h1>
                        Build forms.
                        <br />

                        <span>
                            Share them.
                        </span>

                        <br />

                        <strong>
                            Get answers.
                        </strong>
                    </h1>

                    <p className="hero-description">
                        Create beautiful forms in minutes,
                        share them with anyone, and collect
                        responses in one simple place.
                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/register"
                            className="hero-primary-button"
                        >
                            Create your first form

                            <ArrowForward />
                        </Link>

                        <a
                            href="#how-it-works"
                            className="hero-secondary-button"
                        >
                            <PlayArrow />

                            See how it works
                        </a>

                    </div>

                    <div className="hero-trust">

                        <span>
                            {/* <CheckCircleOutline /> */}

                            No credit card required
                        </span>

                        <span className="hero-trust-dot">
                            •
                        </span>

                        <span>
                            Free to get started
                        </span>

                    </div>

                </div>

                <div className="hero-visual">

                    <FormBuilderPreview />

                </div>

            </div>
        </section>
    );
};

export default HeroSection;