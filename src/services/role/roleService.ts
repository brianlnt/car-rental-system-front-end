import { AxiosResponse } from "axios";
import apiInstance from "../apiInstance";
import { Role } from "../../models/Role";

export class RoleService {
    private ROLE_ENDPOINT: string = "/v1/roles";

    getAllRoles = async (): Promise<Role[]> => {
        const response: AxiosResponse = await apiInstance.get(
            this.ROLE_ENDPOINT
        );
        return response.data;
    };
}
