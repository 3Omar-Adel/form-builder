import "./Settings.css";

import ProfileSection from "./components/ProfileSection/ProfileSection";
import PasswordSection from "./components/PasswordSection/PasswordSection";
import AppearanceSection from "./components/AppearanceSection/AppearanceSection";

const Settings = () => {
    return (
        <main className="settings-page">

            <header className="settings-header">
                <div>
                    <h1>Settings</h1>

                    <p>
                        Manage your account and preferences.
                    </p>
                </div>
            </header>

            <div className="settings-content">

                <ProfileSection />

                <PasswordSection />

                <AppearanceSection />

            </div>

        </main>
    );
};

export default Settings;