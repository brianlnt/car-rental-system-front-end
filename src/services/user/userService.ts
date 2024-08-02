import { AxiosResponse } from "axios";
import { User } from "../../models/User";
import apiInstance from "../apiInstance";
import { FilterAndSortTable } from "../../models/FilterAndSortTable";
import { Page } from "../../models/Page";

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

    getUserById = async (id: string): Promise<User> => {
        const response: AxiosResponse = await apiInstance.get(
            `${this.USER_ENDPOINT}/${id}`
        );
        return response.data;
    };
}
