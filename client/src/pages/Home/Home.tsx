import { useTheme } from "../../app/providers/theme/useTheme";

const Home = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <main className="home">
            <section className="home-card">
                <span className="home-badge">Form Builder</span>

                <h1>Welcome to Form Builder</h1>

                <p>
                    Build powerful forms, manage submissions, and create
                    beautiful experiences.
                </p>

                <div className="theme-info">
                    Current theme: <strong>{theme}</strong>
                </div>

                <button
                    type="button"
                    className="theme-button"
                    onClick={toggleTheme}
                >
                    Switch to {theme === "light" ? "Dark" : "Light"} Mode
                </button>
            </section>
        </main>
    );
};

export default Home;