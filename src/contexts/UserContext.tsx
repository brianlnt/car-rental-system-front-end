import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../models/User";

type StateType = {
    users: User[];
    totalRows: number;
};

const initStateValue = {
    users: [] as User[],
    totalRows: 0,
};

export type ContextType = {
    users: User[];
    totalRows: number;
    updateUsers: Function;
    updateTotalRows: Function;
};

const initContextValue = {
    ...initStateValue,
    updateUsers: (users: User[]) => {},
    updateTotalRows: (totalRows: number) => {},
};

export const UserContext = createContext(initContextValue);

export function UsersContextComp() {
    const [state, setState] = useState<StateType>(initStateValue);

    const updateUsers = (users: User[]) => {
        setState((prev) => ({ ...prev, users }));
    };

    const updateTotalRows = (totalRows: number) => {
        setState((prev) => ({ ...prev, totalRows }));
    };

    return (
        <UserContext.Provider
            value={{
                users: state.users,
                totalRows: state.totalRows,
                updateTotalRows,
                updateUsers,
            }}
        >
            <Outlet />
        </UserContext.Provider>
    );
}
