import { AxiosResponse } from "axios";
import apiInstance from "../apiInstance";
import { Page } from "../../models/Page";
import { FilterAndSortTable } from "../../models/FilterAndSortTable";
import { CustomError } from "../../utils/customError";
import { StatusCode } from "../../models/enums/StatusCodeEnum";
import { Reservation } from "../../models/reservation";

export class ReservationService {
    public initialReservations: Reservation[] = [];
    private RESERVATION_ENDPOINT: string = "/v1/reservations";

    addReservation = async (reservation: Reservation): Promise<Reservation> => {
        const response: AxiosResponse = await apiInstance.post(
            this.RESERVATION_ENDPOINT,
            reservation
        );
        return await response.data;
    }

    getAllReservations = async (): Promise<Reservation[]> => {
        const response: AxiosResponse = await apiInstance.get(
            this.RESERVATION_ENDPOINT
        );
        return response.data;
    };

    deleteReservationById = async (id: number | undefined): Promise<void> => {
        if (!id || id === 0) {
            throw new CustomError(
                StatusCode.SERVER_ERROR,
                "Id must be not null"
            );
        }
        await apiInstance.delete(`${this.RESERVATION_ENDPOINT}/${id}`);
    };
}