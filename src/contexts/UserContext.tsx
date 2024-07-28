import { createContext, ReactNode } from "react";
import { Outlet } from "react-router-dom";

export const UserContext = createContext({});

export function UsersContextComp() {
    return (
        <UserContext.Provider value={{}}>
            <Outlet />
        </UserContext.Provider>
    );
}
