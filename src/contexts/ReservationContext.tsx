import { createContext } from "react";
import { Outlet } from "react-router-dom";

export const ReservationContext = createContext({});

export function ReservationContextComp() {
    return (
        <ReservationContext.Provider value={{}}>
            <Outlet />
        </ReservationContext.Provider>
    );
}
