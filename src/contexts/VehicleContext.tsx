import { createContext, ReactNode } from "react";
import { Outlet } from "react-router-dom";

export const VehicleContext = createContext({});

export function VehiclesContextComp() {
    return (
        <VehicleContext.Provider value={{}}>
            <Outlet />
        </VehicleContext.Provider>
    );
}
