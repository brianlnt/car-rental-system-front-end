import { AxiosResponse } from "axios";
import { Vehicle } from "../../models/Vehicle";
import apiInstance from "../apiInstance";
import { Page } from "../../models/Page";
import { FilterAndSortTable } from "../../models/FilterAndSortTable";

export class VehicleService {
    public initialVehicles: Vehicle[] = [];
    private VEHICLE_ENDPOINT: string = "/v1/vehicles";

    addVehicle = async (vehicle: Vehicle): Promise<Vehicle> => {
        const response: AxiosResponse = await apiInstance.post(
            this.VEHICLE_ENDPOINT,
            vehicle
        );
        return await response.data;
    }

    getAllVehicles = async (): Promise<Vehicle[]> => {
        const response: AxiosResponse = await apiInstance.get(
            this.VEHICLE_ENDPOINT
        );
        return response.data;
    };

    getVehiclesByFilter = async (
        initFilterAndSortTable: FilterAndSortTable
    ): Promise<Page<Vehicle>> => {
        const response: AxiosResponse = await apiInstance.post(
            `${this.VEHICLE_ENDPOINT}/filter`,
            initFilterAndSortTable
        );
        return response.data;
    };
}