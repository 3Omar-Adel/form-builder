import {
    DarkMode,
    LightMode,
} from "@mui/icons-material";

import {
    useTheme,
} from "../../../../app/providers/theme/useTheme";

import "./AppearanceSection.css";


const AppearanceSection = () => {
    const {
        theme,
        toggleTheme,
    } = useTheme();

    const isDark =
        theme === "dark";

    return (
        <section className="settings-card">
            <div className="appearance-section">
                <div className="appearance-info">
                    <div className="appearance-icon">
                        {isDark ? (
                            <DarkMode />
                        ) : (
                            <LightMode />
                        )}

                    </div>

                    <div>
                        <h2>Appearance</h2>

                        <p>
                            Customize how Formly
                            looks on your device.
                        </p>
                    </div>

                </div>

                <button
                    type="button"
                    className="theme-toggle-setting"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                >

                    <span
                        className={
                            !isDark
                                ? "theme-option active"
                                : "theme-option"
                        }
                    >
                        <LightMode />
                        Light
                    </span>

                    <span
                        className={
                            isDark
                                ? "theme-option active"
                                : "theme-option"
                        }
                    >
                        <DarkMode />
                        Dark
                    </span>

                </button>

            </div>

        </section>
    );
};

export default AppearanceSection;