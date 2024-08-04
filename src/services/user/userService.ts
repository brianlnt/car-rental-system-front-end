import { AxiosResponse } from "axios";
import { User } from "../../models/User";
import apiInstance from "../apiInstance";
import { FilterAndSortTable } from "../../models/FilterAndSortTable";
import { Page } from "../../models/Page";
import { CustomError } from "../../utils/customError";
import { StatusCode } from "../../models/enums/StatusCodeEnum";

export class UserService {
    private USER_ENDPOINT: string = "/v1/users";

    addUser = async (user: User): Promise<User> => {
        const response: AxiosResponse = await apiInstance.post(
            this.USER_ENDPOINT,
            user
        );
        return response.data;
    };

    getAllUsers = async (): Promise<User[]> => {
        const response: AxiosResponse = await apiInstance.get(
            this.USER_ENDPOINT
        );
        return response.data;
    };

    getUsersByFilter = async (
        initFilterAndSortTable: FilterAndSortTable
    ): Promise<Page<User>> => {
        const response: AxiosResponse = await apiInstance.post(
            `${this.USER_ENDPOINT}/filter`,
            initFilterAndSortTable
        );
        return response.data;
    };

    getUserById = async (id: number): Promise<User> => {
        if (!id || id === 0) {
            throw new CustomError(
                StatusCode.SERVER_ERROR,
                "Id must be not null"
            );
        }
        const response: AxiosResponse = await apiInstance.get(
            `${this.USER_ENDPOINT}/${id}`
        );
        return response.data;
    };

    deleteUserById = async (id: number | undefined): Promise<void> => {
        if (!id || id === 0) {
            throw new CustomError(
                StatusCode.SERVER_ERROR,
                "Id must be not null"
            );
        }
        await apiInstance.delete(`${this.USER_ENDPOINT}/${id}`);
    };

    updateUserById = async (
        id: number | undefined,
        user: User
    ): Promise<void> => {
        if (!id || id === 0) {
            throw new CustomError(
                StatusCode.SERVER_ERROR,
                "Id must be not null"
            );
        }
        await apiInstance.patch(`${this.USER_ENDPOINT}/${id}`, user);
    };
}
