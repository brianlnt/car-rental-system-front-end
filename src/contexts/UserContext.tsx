import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../models/User";

type StateType = {
    users: User[];
    totalRows: number;
    selectedUserId: number;
    isCompletedAddUser: boolean;
    isCompletedEditUser: boolean;
    isCompletedDeleteUser: boolean;
    isShowAddUserDialog: boolean;
    isShowUpdateUserDialog: boolean;
};

const initStateValue: StateType = {
    users: [] as User[],
    totalRows: 0,
    selectedUserId: 0,
    isCompletedAddUser: false,
    isCompletedEditUser: false,
    isCompletedDeleteUser: false,
    isShowAddUserDialog: false,
    isShowUpdateUserDialog: false,
};

export type ContextType = {
    users: User[];
    updateUsers: Function;
    totalRows: number;
    updateTotalRows: Function;
    selectedUserId: number;
    isCompletedAddUser: boolean;
    isCompletedEditUser: boolean;
    isCompletedDeleteUser: boolean;
    isShowAddUserDialog: boolean;
    isShowUpdateUserDialog: boolean;
    updateSelectedUserId: Function;
    updateIsCompletedAddUser: Function;
    updateIsCompletedEditUser: Function;
    updateIsCompletedDeleteUser: Function;
    updateIsShowAddUserDialog: Function;
    updateIsShowUpdateUserDialog: Function;
};

const initContextValue = {
    ...initStateValue,
    updateUsers: (users: User[]) => {},
    updateTotalRows: (totalRows: number) => {},
    updateSelectedUserId: (selectedUserId: number) => {},
    updateIsCompletedAddUser: (isCompletedAddUser: boolean) => {},
    updateIsCompletedEditUser: (isCompletedEditUser: boolean) => {},
    updateIsCompletedDeleteUser: (isCompletedDeleteUser: boolean) => {},
    updateIsShowAddUserDialog: (isShowAddUserDialog: boolean) => {},
    updateIsShowUpdateUserDialog: (isShowUpdateUserDialog: boolean) => {},
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

    const updateSelectedUserId = (selectedUserId: number) => {
        setState((prev) => ({ ...prev, selectedUserId }));
    };

    const updateIsCompletedAddUser = (isCompletedAddUser: boolean) => {
        setState((prev) => ({ ...prev, isCompletedAddUser }));
    };

    const updateIsCompletedEditUser = (isCompletedEditUser: boolean) => {
        setState((prev) => ({ ...prev, isCompletedEditUser }));
    };

    const updateIsCompletedDeleteUser = (isCompletedDeleteUser: boolean) => {
        setState((prev) => ({ ...prev, isCompletedDeleteUser }));
    };

    const updateIsShowAddUserDialog = (isShowAddUserDialog: boolean) => {
        setState((prev) => ({ ...prev, isShowAddUserDialog }));
    };

    const updateIsShowUpdateUserDialog = (isShowUpdateUserDialog: boolean) => {
        setState((prev) => ({ ...prev, isShowUpdateUserDialog }));
    };

    return (
        <UserContext.Provider
            value={{
                users: state.users,
                totalRows: state.totalRows,
                selectedUserId: state.selectedUserId,
                isCompletedAddUser: state.isCompletedAddUser,
                isCompletedEditUser: state.isCompletedEditUser,
                isCompletedDeleteUser: state.isCompletedDeleteUser,
                isShowAddUserDialog: state.isShowAddUserDialog,
                isShowUpdateUserDialog: state.isShowUpdateUserDialog,
                updateTotalRows,
                updateUsers,
                updateSelectedUserId,
                updateIsCompletedAddUser,
                updateIsCompletedEditUser,
                updateIsCompletedDeleteUser,
                updateIsShowAddUserDialog,
                updateIsShowUpdateUserDialog,
            }}
        >
            <Outlet />
        </UserContext.Provider>
    );
}
