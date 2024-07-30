import { AxiosResponse } from "axios";
import { User } from "../../models/User";
import apiInstance from "../apiInstance";

export class UserService {
    private USER_ENDPOINT: string = "/v1/users";

    addUser = async (user: User): Promise<User> => {
        const response: AxiosResponse = await apiInstance.post(
            this.USER_ENDPOINT,
            user
        );
        return await response.data;
    };

    getAllUsers = async (): Promise<User[]> => {
        const response: AxiosResponse = await apiInstance.get(
            this.USER_ENDPOINT
        );
        return await response.data;
    };

    getUserById = async (id: string): Promise<User> => {
        const response: AxiosResponse = await apiInstance.get(
            `${this.USER_ENDPOINT}/${id}`
        );
        return await response.data;
    };
}