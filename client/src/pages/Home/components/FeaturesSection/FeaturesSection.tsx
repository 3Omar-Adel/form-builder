import {
    AutoFixHigh,
    Link as LinkIcon,
    BarChart,
    Security,
} from "@mui/icons-material";

import "./FeaturesSection.css";

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
    className: string;
}

const features: Feature[] = [
    {
        icon: <AutoFixHigh />,
        title: "Easy to build",
        description:
            "Drag and drop fields to create beautiful forms in minutes.",
        className: "purple",
    },
    {
        icon: <LinkIcon />,
        title: "Share anywhere",
        description:
            "Get a unique link and share your form with anyone.",
        className: "green",
    },
    {
        icon: <BarChart />,
        title: "Collect responses",
        description:
            "View and analyze your responses in one simple dashboard.",
        className: "orange",
    },
    {
        icon: <Security />,
        title: "Secure & private",
        description:
            "Your forms and responses stay organized and protected.",
        className: "blue",
    },
];

const FeaturesSection = () => {
    return (
        <section
            className="features-section"
            id="features"
        >
            <div className="features-container">

                <div className="section-heading">

                    <span className="section-eyebrow">
                        WHY FORM BUILDER
                    </span>

                    <h2>
                        Everything you need
                        <br />
                        to create amazing forms.
                    </h2>

                    <p>
                        Simple tools that help you create,
                        share, and understand your forms.
                    </p>

                </div>

                <div className="features-grid">

                    {features.map((feature) => (
                        <article
                            className="feature-card"
                            key={feature.title}
                        >
                            <div
                                className={`feature-icon ${feature.className}`}
                            >
                                {feature.icon}
                            </div>

                            <div className="feature-content">

                                <h3>
                                    {feature.title}
                                </h3>

                                <p>
                                    {feature.description}
                                </p>

                            </div>

                            <span className="feature-arrow">
                                →
                            </span>
                        </article>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default FeaturesSection;