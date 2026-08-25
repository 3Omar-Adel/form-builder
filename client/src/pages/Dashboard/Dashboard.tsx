import "./Dashboard.css";

const forms = [
    {
        id: 1,
        name: "Customer Feedback Form",
        status: "Published",
        submissions: 128,
        responses: [
            "JD",
            "AS",
            "MK",
            "RN",
            "AL",
        ],
        updated: "2 hours ago",
    },
    {
        id: 2,
        name: "Contact Us",
        status: "Published",
        submissions: 64,
        responses: [
            "OM",
            "SA",
            "KL",
            "MA",
        ],
        updated: "Yesterday",
    },
    {
        id: 3,
        name: "Job Application",
        status: "Draft",
        submissions: 0,
        responses: [],
        updated: "3 days ago",
    },
    {
        id: 4,
        name: "Event Registration",
        status: "Published",
        submissions: 42,
        responses: [
            "AH",
            "NR",
            "YS",
        ],
        updated: "5 days ago",
    },
];

const Dashboard = () => {
    const totalForms = forms.length;

    const publishedForms = forms.filter(
        (form) => form.status === "Published",
    ).length;

    const totalSubmissions = forms.reduce(
        (total, form) => total + form.submissions,
        0,
    );

    return (
        <main className="dashboard-content">
            <div className="dashboard-page-header">
                <div>
                    <h2>Overview</h2>

                    <p>
                        Here's what's happening with your
                        forms.
                    </p>
                </div>

                <button className="create-form-button">
                    + Create form
                </button>
            </div>

            {/* Statistics */}

            <section className="dashboard-stats">
                <div className="stat-card">
                    <div className="stat-card-top">
                        <span>Total Forms</span>

                        <div className="stat-icon">
                            📄
                        </div>
                    </div>

                    <strong>{totalForms}</strong>

                    <p>
                        Forms you've created
                    </p>
                </div>

                <div className="stat-card">
                    <div className="stat-card-top">
                        <span>Published Forms</span>

                        <div className="stat-icon">
                            ✓
                        </div>
                    </div>

                    <strong>{publishedForms}</strong>

                    <p>
                        Currently live
                    </p>
                </div>

                <div className="stat-card">
                    <div className="stat-card-top">
                        <span>Total Submissions</span>

                        <div className="stat-icon">
                            ↗
                        </div>
                    </div>

                    <strong>{totalSubmissions}</strong>

                    <p>
                        Across all forms
                    </p>
                </div>
            </section>

            {/* Forms */}

            <section className="dashboard-forms">
                <div className="section-header">
                    <div>
                        <h3>Recent Forms</h3>

                        <p>
                            Manage and monitor your forms.
                        </p>
                    </div>

                    <button className="view-all-button">
                        View all
                    </button>
                </div>

                <div className="forms-table-wrapper">
                    <table className="forms-table">
                        <thead>
                            <tr>
                                <th>Form</th>
                                <th>Status</th>
                                <th>Submissions</th>
                                <th>Recent Responses</th>
                                <th>Last Updated</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {forms.map((form) => (
                                <tr key={form.id}>
                                    <td>
                                        <div className="form-name">
                                            <span className="form-icon">
                                                📄
                                            </span>

                                            <strong>
                                                {form.name}
                                            </strong>
                                        </div>
                                    </td>

                                    <td>
                                        <span
                                            className={`status-badge ${
                                                form.status ===
                                                "Published"
                                                    ? "published"
                                                    : "draft"
                                            }`}
                                        >
                                            <span />
                                            {form.status}
                                        </span>
                                    </td>

                                    <td>
                                        <strong>
                                            {
                                                form.submissions
                                            }
                                        </strong>
                                    </td>

                                    <td>
                                        <div className="response-avatars">
                                            {form.responses
                                                .slice(
                                                    0,
                                                    5,
                                                )
                                                .map(
                                                    (
                                                        response,
                                                        index,
                                                    ) => (
                                                        <span
                                                            key={
                                                                index
                                                            }
                                                            className="response-avatar"
                                                        >
                                                            {
                                                                response
                                                            }
                                                        </span>
                                                    ),
                                                )}

                                            {form.submissions >
                                                5 && (
                                                <span className="response-more">
                                                    +
                                                    {form.submissions -
                                                        5}
                                                </span>
                                            )}
                                        </div>
                                    </td>

                                    <td>
                                        <span className="updated-date">
                                            {form.updated}
                                        </span>
                                    </td>

                                    <td>
                                        <button className="form-action">
                                            ...
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
};

export default Dashboard;