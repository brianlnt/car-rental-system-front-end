import { createContext, ReactNode } from "react";
import { Outlet } from "react-router-dom";

export const DashboardContext = createContext({});

export function DashboardsContextComp() {
    return (
        <DashboardContext.Provider value={{}}>
            <Outlet />
        </DashboardContext.Provider>
    );
}
