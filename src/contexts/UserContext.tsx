import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../models/User";
import { Role } from "../models/Role";

type StateType = {
    users: User[];
    totalRows: number;
    roles: Role[];
    selectedUserId: number;
    isCompletedAddUser: boolean;
    isCompletedEditUser: boolean;
    isCompletedDeleteUser: boolean;
    isShowAddUserDialog: boolean;
    isShowUpdateUserDialog: boolean;
    isShowDeleteUserDialog: boolean;
};

const initStateValue: StateType = {
    users: [],
    totalRows: 0,
    roles: [],
    selectedUserId: 0,
    isCompletedAddUser: false,
    isCompletedEditUser: false,
    isCompletedDeleteUser: false,
    isShowAddUserDialog: false,
    isShowUpdateUserDialog: false,
    isShowDeleteUserDialog: false,
};

export type ContextType = {
    users: User[];
    totalRows: number;
    roles: Role[];
    selectedUserId: number;
    isCompletedAddUser: boolean;
    isCompletedEditUser: boolean;
    isCompletedDeleteUser: boolean;
    isShowAddUserDialog: boolean;
    isShowUpdateUserDialog: boolean;
    updateUsers: Function;
    updateTotalRows: Function;
    updateRoles: Function;
    updateSelectedUserId: Function;
    updateIsCompletedAddUser: Function;
    updateIsCompletedEditUser: Function;
    updateIsCompletedDeleteUser: Function;
    updateIsShowAddUserDialog: Function;
    updateIsShowUpdateUserDialog: Function;
    updateIsShowDeleteUserDialog: Function;
};

const initContextValue = {
    ...initStateValue,
    updateUsers: (users: User[]) => {},
    updateTotalRows: (totalRows: number) => {},
    updateRoles: (roles: Role[]) => {},
    updateSelectedUserId: (selectedUserId: number) => {},
    updateIsCompletedAddUser: (isCompletedAddUser: boolean) => {},
    updateIsCompletedEditUser: (isCompletedEditUser: boolean) => {},
    updateIsCompletedDeleteUser: (isCompletedDeleteUser: boolean) => {},
    updateIsShowAddUserDialog: (isShowAddUserDialog: boolean) => {},
    updateIsShowUpdateUserDialog: (isShowUpdateUserDialog: boolean) => {},
    updateIsShowDeleteUserDialog: (isShowDeleteUserDialog: boolean) => {},
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

    const updateRoles = (roles: Role[]) => {
        setState((prev) => ({ ...prev, roles }));
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

    const updateIsShowDeleteUserDialog = (isShowDeleteUserDialog: boolean) => {
        setState((prev) => ({ ...prev, isShowDeleteUserDialog }));
    };

    return (
        <UserContext.Provider
            value={{
                users: state.users,
                totalRows: state.totalRows,
                roles: state.roles,
                selectedUserId: state.selectedUserId,
                isCompletedAddUser: state.isCompletedAddUser,
                isCompletedEditUser: state.isCompletedEditUser,
                isCompletedDeleteUser: state.isCompletedDeleteUser,
                isShowAddUserDialog: state.isShowAddUserDialog,
                isShowUpdateUserDialog: state.isShowUpdateUserDialog,
                isShowDeleteUserDialog: state.isShowDeleteUserDialog,
                updateUsers,
                updateTotalRows,
                updateRoles,
                updateSelectedUserId,
                updateIsCompletedAddUser,
                updateIsCompletedEditUser,
                updateIsCompletedDeleteUser,
                updateIsShowAddUserDialog,
                updateIsShowUpdateUserDialog,
                updateIsShowDeleteUserDialog,
            }}
        >
            <Outlet />
        </UserContext.Provider>
    );
}
