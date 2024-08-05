import { AxiosResponse } from "axios";
import { Vehicle } from "../../models/Vehicle";
import apiInstance from "../apiInstance";
import { Page } from "../../models/Page";
import { FilterAndSortTable } from "../../models/FilterAndSortTable";
import { CustomError } from "../../utils/customError";
import { StatusCode } from "../../models/enums/StatusCodeEnum";

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

    getVehicleById = async (id: number): Promise<Vehicle> => {
        if (!id || id === 0) {
            throw new CustomError(
                StatusCode.SERVER_ERROR,
                "Id must be not null"
            );
        }
        const response: AxiosResponse = await apiInstance.get(
            `${this.VEHICLE_ENDPOINT}/${id}`
        );
        return response.data;
    };

    deleteVehicleById = async (id: number | undefined): Promise<void> => {
        if (!id || id === 0) {
            throw new CustomError(
                StatusCode.SERVER_ERROR,
                "Id must be not null"
            );
        }
        await apiInstance.delete(`${this.VEHICLE_ENDPOINT}/${id}`);
    };

    updateVehicleById = async (
        id: number | undefined,
        vehicle: Vehicle
    ): Promise<void> => {
        if (!id || id === 0) {
            throw new CustomError(
                StatusCode.SERVER_ERROR,
                "Id must be not null"
            );
        }
        await apiInstance.patch(`${this.VEHICLE_ENDPOINT}/${id}`, vehicle);
    };
}