import type { ReactNode } from "react";

import { Provider } from "react-redux";

import { store } from "../../redux/store";

import { ThemeProvider } from "./theme/ThemeProvider";

interface AppProvidersProps {
    children: ReactNode;
}

const AppProviders = ({
    children,
}: AppProvidersProps) => {
    return (
        <Provider store={store}>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </Provider>
    );
};

export default AppProviders;