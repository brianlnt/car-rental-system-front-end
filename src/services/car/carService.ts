import { AxiosResponse } from "axios";
import { Car } from "../../models/Car";
import apiInstance from "../apiInstance";

export class CarService {
    public initialCars: Car[] = [];
    private VEHICLE_ENDPOINT: string = "/v1/vehicles";

    addCar = async (car: Car): Promise<Car> => {
        const response: AxiosResponse = await apiInstance.post(
            this.VEHICLE_ENDPOINT,
            car
        );
        return await response.data;
    }

    getAllCars = async (): Promise<Car[]> => {
        const response: AxiosResponse = await apiInstance.get(
            this.VEHICLE_ENDPOINT
        );
        return await response.data;
    };
}