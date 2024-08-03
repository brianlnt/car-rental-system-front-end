import { createContext, ReactNode, useState } from "react";
import { Outlet } from "react-router-dom";
import { Vehicle } from "../models/Vehicle";

type StateType = {
    vehicles: Vehicle[];
    totalRows: number;
};

const initStateValue = {
    vehicles: [] as Vehicle[],
    totalRows: 0,
};

export type ContextType = {
    vehicles: Vehicle[];
    totalRows: number;
    updateVehicles: Function;
    updateTotalRows: Function;
};

const initContextValue = {
    ...initStateValue,
    updateVehicles: (vehicles: Vehicle[]) => {},
    updateTotalRows: (totalRows: number) => {},
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
    return (
        <VehicleContext.Provider value={{
                vehicles: state.vehicles,
                totalRows: state.totalRows,
                updateTotalRows,
                updateVehicles,
        }}>
            <Outlet />
        </VehicleContext.Provider>
    );
}
