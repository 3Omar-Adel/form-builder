import { useEffect, useState } from "react";
import DashboardStatsSkeleton from "./DashboardStatsSkeleton";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";

import {formApi, type Form,} from "../../../../api/form.api";

import "./DashboardStats.css";

const DashboardStats = () => {
    const [forms, setForms] = useState<Form[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getForms = async () => {
            try {
                setIsLoading(true);
                setError("");

                const response =
                    await formApi.getMyForms();

                setForms(response.data.forms);
            } catch (error) {
                console.error(error);

                setError(
                    "Failed to load dashboard statistics.",
                );
            } finally {
                setIsLoading(false);
            }
        };

        getForms();
    }, []);

    const totalForms = forms.length;

    const publishedForms = forms.filter(
        (form) => form.status === "PUBLISHED",
    ).length;

    const totalSubmissions = forms.reduce(
        (total, form) =>
            total + (form._count?.responses ?? 0),
        0,
    );

    const stats = [
        {
            label: "Total Forms",
            value: totalForms,
            icon: DescriptionOutlinedIcon,
        },
        {
            label: "Published Forms",
            value: publishedForms,
            icon: PublicOutlinedIcon,
        },
        {
            label: "Total Submissions",
            value: totalSubmissions,
            icon: ForumOutlinedIcon,
        },
    ];

    if (isLoading) {
    return <DashboardStatsSkeleton />;
}

    if (error) {
        return (
            <section className="stats">
                <p>{error}</p>
            </section>
        );
    }

    return (
        <section className="stats">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <article
                        key={stat.label}
                        className="stat-card"
                    >
                        <div className="stat-top">
                            <div className="stat-icon">
                                <Icon />
                            </div>

                            <span className="stat-label">
                                {stat.label}
                            </span>
                        </div>

                        <div className="stat-value">
                            <h2>{stat.value}</h2>
                        </div>
                    </article>
                );
            })}
        </section>
    );
};

export default DashboardStats;