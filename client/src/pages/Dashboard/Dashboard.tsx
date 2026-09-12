import DashboardStats from "./components/DashboardStats/DashboardStats";
import DashboardFormsHeader from "./components/DashboardFormsHeader/DashboardFormsHeader";
import DashboardFormsTable from "./components/DashboardFormsTable/DashboardFormsTable";

import "./Dashboard.css";

const Dashboard = () => {
    return (
        <main className="dashboard">

            <div className="dashboardHeader">
                <h1>Dashboard</h1>

                <p>
                    Manage your forms and track your
                    submissions.
                </p>
            </div>

            <div className="dashboard-content">

                <DashboardStats />

                <section className="dashboard-forms-section">

                    <DashboardFormsHeader />

                    <DashboardFormsTable />

                </section>

            </div>

        </main>
    );
};

export default Dashboard;