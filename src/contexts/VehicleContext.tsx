import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { Vehicle } from "../models/Vehicle";

type StateType = {
    vehicles: Vehicle[];
    totalRows: number;
    selectedVehicleId: number;
    isCompletedAddVehicle: boolean;
    isCompletedEditVehicle: boolean;
    isCompletedDeleteVehicle: boolean;
    isShowAddVehicleDialog: boolean;
    isShowUpdateVehicleDialog: boolean;
    isShowDeleteVehicleDialog: boolean;
};

const initStateValue = {
    vehicles: [] as Vehicle[],
    totalRows: 0,
    selectedVehicleId: 0,
    isCompletedAddVehicle: false,
    isCompletedEditVehicle: false,
    isCompletedDeleteVehicle: false,
    isShowAddVehicleDialog: false,
    isShowUpdateVehicleDialog: false,
    isShowDeleteVehicleDialog: false,
};

export type ContextType = {
    vehicles: Vehicle[];
    totalRows: number;
    updateVehicles: Function;
    updateTotalRows: Function;
    selectedVehicleId: number;
    isCompletedAddVehicle: boolean;
    isCompletedEditVehicle: boolean;
    isCompletedDeleteVehicle: boolean;
    isShowAddVehicleDialog: boolean;
    isShowUpdateVehicleDialog: boolean;
    updateSelectedVehicleId: Function;
    updateIsCompletedAddVehicle: Function;
    updateIsCompletedEditVehicle: Function;
    updateIsCompletedDeleteVehicle: Function;
    updateIsShowAddVehicleDialog: Function;
    updateIsShowUpdateVehicleDialog: Function;
    updateIsShowDeleteVehicleDialog: Function;
};

const initContextValue = {
    ...initStateValue,
    updateVehicles: (vehicles: Vehicle[]) => {},
    updateTotalRows: (totalRows: number) => {},
    updateSelectedVehicleId: (selectedVehicleId: number) => {},
    updateIsCompletedAddVehicle: (isCompletedAddVehicle: boolean) => {},
    updateIsCompletedEditVehicle: (isCompletedEditVehicle: boolean) => {},
    updateIsCompletedDeleteVehicle: (isCompletedDeleteVehicle: boolean) => {},
    updateIsShowAddVehicleDialog: (isShowAddVehicleDialog: boolean) => {},
    updateIsShowUpdateVehicleDialog: (isShowUpdateVehicleDialog: boolean) => {},
    updateIsShowDeleteVehicleDialog: (isShowDeleteVehicleDialog: boolean) => {}
};

export const VehicleContext = createContext(initContextValue);

export function VehiclesContextComp() {
    const [state, setState] = useState<StateType>(initStateValue);

    const updateVehicles = (vehicles: Vehicle[]) => {
        setState((prev) => ({ ...prev, vehicles }));
    };

    const updateTotalRows = (totalRows: number) => {
        setState((prev) => ({ ...prev, totalRows }));
    };

    const updateSelectedVehicleId = (selectedVehicleId: number) => {
        setState((prev) => ({ ...prev, selectedVehicleId }));
    };

    const updateIsCompletedAddVehicle = (isCompletedAddVehicle: boolean) => {
        setState((prev) => ({ ...prev, isCompletedAddVehicle }));
    };

    const updateIsCompletedEditVehicle = (isCompletedEditVehicle: boolean) => {
        setState((prev) => ({ ...prev, isCompletedEditVehicle }));
    };

    const updateIsCompletedDeleteVehicle = (isCompletedDeleteVehicle: boolean) => {
        setState((prev) => ({ ...prev, isCompletedDeleteVehicle }));
    };

    const updateIsShowAddVehicleDialog = (isShowAddVehicleDialog: boolean) => {
        setState((prev) => ({ ...prev, isShowAddVehicleDialog }));
    };

    const updateIsShowUpdateVehicleDialog = (isShowUpdateVehicleDialog: boolean) => {
        setState((prev) => ({ ...prev, isShowUpdateVehicleDialog }));
    };

    const updateIsShowDeleteVehicleDialog = (isShowDeleteVehicleDialog: boolean) => {
        setState((prev) => ({ ...prev, isShowDeleteVehicleDialog }));
    };

    return (
        <VehicleContext.Provider value={{
                vehicles: state.vehicles,
                totalRows: state.totalRows,
                selectedVehicleId: state.selectedVehicleId,
                isCompletedAddVehicle: state.isCompletedAddVehicle,
                isCompletedEditVehicle: state.isCompletedEditVehicle,
                isCompletedDeleteVehicle: state.isCompletedDeleteVehicle,
                isShowAddVehicleDialog: state.isShowAddVehicleDialog,
                isShowUpdateVehicleDialog: state.isShowUpdateVehicleDialog,
                isShowDeleteVehicleDialog: state.isShowDeleteVehicleDialog,
                updateTotalRows,
                updateVehicles,
                updateSelectedVehicleId,
                updateIsCompletedAddVehicle,
                updateIsCompletedEditVehicle,
                updateIsCompletedDeleteVehicle,
                updateIsShowAddVehicleDialog,
                updateIsShowUpdateVehicleDialog,
                updateIsShowDeleteVehicleDialog
        }}>
            <Outlet />
        </VehicleContext.Provider>
    );
}
