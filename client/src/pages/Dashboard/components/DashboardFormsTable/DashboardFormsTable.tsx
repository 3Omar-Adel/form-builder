import { useEffect, useState } from "react";
import DashboardFormsTableSkeleton from "./DashboardFormsTableSkeleton";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import EmptyState from "../../../../components/EmptyState/EmptyState";
import Pagination from "./Pagination/Pagination";
import { useNavigate } from "react-router-dom";

import {
    formApi,
    type Form,
} from "../../../../api/form.api";

import "./DashboardFormsTable.css";

const DashboardFormsTable = () => {

    const navigate = useNavigate();

    const [forms, setForms] = useState<Form[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const formsPerPage = 6;

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

                setError("Failed to load forms.");
            } finally {
                setIsLoading(false);
            }
        };

        getForms();
    }, []);

    const formatUpdatedAt = (
        updatedAt: string,
    ) => {
        const updatedDate = new Date(updatedAt);
        const now = new Date();

        const difference =
            now.getTime() -
            updatedDate.getTime();

        const minutes = Math.floor(
            difference / (1000 * 60),
        );

        const hours = Math.floor(
            minutes / 60,
        );

        const days = Math.floor(
            hours / 24,
        );

        if (minutes < 1) {
            return "Just now";
        }

        if (minutes < 60) {
            return `${minutes} ${minutes === 1
                    ? "minute"
                    : "minutes"
                } ago`;
        }

        if (hours < 24) {
            return `${hours} ${hours === 1
                    ? "hour"
                    : "hours"
                } ago`;
        }

        if (days === 1) {
            return "Yesterday";
        }

        if (days < 7) {
            return `${days} days ago`;
        }

        return updatedDate.toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
            },
        );
    };

    const totalPages = Math.ceil(
        forms.length / formsPerPage,
    );

    const startIndex =
        (currentPage - 1) * formsPerPage;

    const currentForms = forms.slice(
        startIndex,
        startIndex + formsPerPage,
    );



    if (isLoading) {
        return <DashboardFormsTableSkeleton />;
    }

    if (error) {
        return (
            <div className="dashboard-table-wrapper">
                <div className="dashboard-table-state">
                    {error}
                </div>
            </div>
        );
    }

    if (forms.length === 0) {
        return (
            <EmptyState
                title="No forms yet"
                description="Create your first form and start collecting responses."
                buttonText="Create your first form"
                onButtonClick={() => navigate("/forms/new")}
            />
        );
    }

    return (
        <div className="dashboard-table-container">
            <div className="dashboard-table-wrapper">
                <table className="dashboard-forms-table">

                    <thead>
                        <tr>
                            <th>Form Title</th>
                            <th>Status</th>
                            <th>Submissions</th>
                            <th>Recent Responses</th>
                            <th>Last Updated</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentForms.map((form) => {
                            const responsesCount =
                                form._count?.responses ??
                                0;

                            return (
                                <tr key={form.id}>

                                    <td>
                                        <div className="dashboard-form-name">
                                            <span>
                                                {form.title}
                                            </span>
                                        </div>
                                    </td>

                                    <td>
                                        <span
                                            className={`dashboard-status ${form.status.toLowerCase()}`}
                                        >
                                            {form.status ===
                                                "PUBLISHED" && (
                                                    <CheckCircleOutlineOutlinedIcon />
                                                )}

                                            {form.status ===
                                                "DRAFT" && (
                                                    <AccessTimeOutlinedIcon />
                                                )}

                                            {form.status ===
                                                "ARCHIVED" && (
                                                    <ArchiveOutlinedIcon />
                                                )}

                                            {form.status}
                                        </span>
                                    </td>

                                    <td>
                                        <span className="dashboard-submissions">
                                            {responsesCount}
                                        </span>
                                    </td>

                                    <td>
                                        {responsesCount > 0 ? (
                                            <span className="dashboard-response-count">
                                                {responsesCount}{" "}
                                                {responsesCount ===
                                                    1
                                                    ? "response"
                                                    : "responses"}
                                            </span>
                                        ) : (
                                            <span className="dashboard-no-responses">
                                                —
                                            </span>
                                        )}
                                    </td>

                                    <td>
                                        <span className="dashboard-last-updated">
                                            {formatUpdatedAt(
                                                form.updatedAt,
                                            )}
                                        </span>
                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default DashboardFormsTable;
