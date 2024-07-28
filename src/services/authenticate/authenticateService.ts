import { AuthenticatedInfo } from "../../models/authenticated-info/AuthenticatedInfo";
import axiosApiInstance from "../axiosApiInstance";
import { LocalStorageService } from "../localStorageService";

export class AuthenticateService {
    authenticate = async (
        username: string,
        password: string
    ): Promise<void> => {
        const response: Response = await axiosApiInstance.post(
            "/pub/authenticate",
            { username: username, password: password }
        );
        const authenticatedInfo: AuthenticatedInfo = await response.json();
        const localStorageService = new LocalStorageService();
        localStorageService.saveTokenAndUserInfo(authenticatedInfo);
    };
}
