import { User } from "../../models/User";
import axiosApiInstance from "../axiosApiInstance";

export class UserService {
    private USER_ENDPOINT: string = "/v1/users";

    addUser = async (user: User): Promise<User> => {
        const response: Response = await axiosApiInstance.post(
            this.USER_ENDPOINT,
            user
        );
        return await response.json();
    };

    getAllUsers = async (): Promise<User[]> => {
        const response: Response = await axiosApiInstance.get(
            this.USER_ENDPOINT
        );
        return await response.json();
    };

    getUserById = async (id: string): Promise<User> => {
        const response: Response = await axiosApiInstance.get(
            `${this.USER_ENDPOINT}/${id}`
        );
        return await response.json();
    };
}
