import { createContext, ReactNode } from "react";
import { Outlet } from "react-router-dom";

export const RentalContext = createContext({});

export function RentalsContextComp() {
    return (
        <RentalContext.Provider value={{}}>
            <Outlet />
        </RentalContext.Provider>
    );
}
