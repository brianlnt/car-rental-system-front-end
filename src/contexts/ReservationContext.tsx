import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { Role } from "../models/Role";
import { Reservation } from "../models/reservation";
import { boolean } from "yup";

type StateType = {
    reservations: Reservation[];
    totalRows: number;
    roles: Role[];
    selectedReservationId: number;
    isCompletedAddReservation: boolean;
    isCompletedEditReservation: boolean;
    isCompletedDeleteReservation: boolean;
    isShowAddReservationDialog: boolean;
    isShowUpdateReservationDialog: boolean;
    isShowReservationManagement: boolean;
};

const initStateValue: StateType = {
    reservations: [],
    totalRows: 0,
    roles: [],
    selectedReservationId: 0,
    isCompletedAddReservation: false,
    isCompletedEditReservation: false,
    isCompletedDeleteReservation: false,
    isShowAddReservationDialog: false,
    isShowUpdateReservationDialog: false,
    isShowReservationManagement: false,
};

export type ContextType = {
    reservations: Reservation[];
    totalRows: number;
    roles: Role[];
    selectedReservationId: number;
    isCompletedAddReservation: boolean;
    isCompletedEditReservation: boolean;
    isCompletedDeleteReservation: boolean;
    isShowAddReservationDialog: boolean;
    isShowUpdateReservationDialog: boolean;
    updateReservations: Function;
    updateTotalRows: Function;
    updateRoles: Function;
    updateSelectedReservationId: Function;
    updateIsCompletedAddReservation: Function;
    updateIsCompletedEditReservation: Function;
    updateIsCompletedDeleteReservation: Function;
    updateIsShowAddReservationDialog: Function;
    updateIsShowUpdateReservationDialog: Function;
    updateIsShowReservationManagement: Function;
};

const initContextValue = {
    ...initStateValue,
    updateReservations: (reservations: Reservation[]) => {},
    updateTotalRows: (totalRows: number) => {},
    updateRoles: (roles: Role[]) => {},
    updateSelectedReservationId: (selectedReservationId: number) => {},
    updateIsCompletedAddReservation: (isCompletedAddReservation: boolean) => {},
    updateIsCompletedEditReservation: (isCompletedEditReservation: boolean) => {},
    updateIsCompletedDeleteReservation: (isCompletedDeleteReservation: boolean) => {},
    updateIsShowAddReservationDialog: (isShowAddReservationDialog: boolean) => {},
    updateIsShowUpdateReservationDialog: (isShowUpdateReservationDialog: boolean) => {},
    updateIsShowReservationManagement: (isShowReservationManagement: boolean) => {},
};

export const ReservationContext = createContext(initContextValue);

export function ReservationContextComp() {
    const [state, setState] = useState<StateType>(initStateValue);

    const updateReservations = (reservations: Reservation[]) => {
        setState((prev) => ({ ...prev, reservations }));
    };

    const updateTotalRows = (totalRows: number) => {
        setState((prev) => ({ ...prev, totalRows }));
    };

    const updateRoles = (roles: Role[]) => {
        setState((prev) => ({ ...prev, roles }));
    };

    const updateSelectedReservationId = (selectedReservationId: number) => {
        setState((prev) => ({ ...prev, selectedReservationId }));
    };

    const updateIsCompletedAddReservation = (isCompletedAddReservation: boolean) => {
        setState((prev) => ({ ...prev, isCompletedAddReservation }));
    };

    const updateIsCompletedEditReservation = (isCompletedEditReservation: boolean) => {
        setState((prev) => ({ ...prev, isCompletedEditReservation }));
    };

    const updateIsCompletedDeleteReservation = (isCompletedDeleteReservation: boolean) => {
        setState((prev) => ({ ...prev, isCompletedDeleteReservation }));
    };

    const updateIsShowAddReservationDialog = (isShowAddReservationDialog: boolean) => {
        setState((prev) => ({ ...prev, isShowAddReservationDialog }));
    };

    const updateIsShowUpdateReservationDialog = (isShowUpdateReservationDialog: boolean) => {
        setState((prev) => ({ ...prev, isShowUpdateReservationDialog }));
    };

    const updateIsShowReservationManagement = (isShowReservationManagement: boolean) => {
        setState((prev) => ({ ...prev, isShowReservationManagement }));
    }

    return (
        <ReservationContext.Provider
            value={{
                reservations: state.reservations,
                totalRows: state.totalRows,
                roles: state.roles,
                selectedReservationId: state.selectedReservationId,
                isCompletedAddReservation: state.isCompletedAddReservation,
                isCompletedEditReservation: state.isCompletedEditReservation,
                isCompletedDeleteReservation: state.isCompletedDeleteReservation,
                isShowAddReservationDialog: state.isShowAddReservationDialog,
                isShowUpdateReservationDialog: state.isShowUpdateReservationDialog,
                isShowReservationManagement: state.isShowReservationManagement,
                updateReservations,
                updateTotalRows,
                updateRoles,
                updateSelectedReservationId,
                updateIsCompletedAddReservation,
                updateIsCompletedEditReservation,
                updateIsCompletedDeleteReservation,
                updateIsShowAddReservationDialog,
                updateIsShowUpdateReservationDialog,
                updateIsShowReservationManagement,
            }}
        >
            <Outlet />
        </ReservationContext.Provider>
    );
}
