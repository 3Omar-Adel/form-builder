import type { ReactNode } from "react";

import { ThemeProvider } from "./theme/ThemeProvider";

interface AppProvidersProps {
    children: ReactNode;
}

const AppProviders = ({
    children,
}: AppProvidersProps) => {
    return (
        <ThemeProvider>
                {children}
        </ThemeProvider>
    )
};

export default AppProviders;





