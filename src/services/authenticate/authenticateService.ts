import { AuthenticatedInfo } from "../../models/authenticated-info/AuthenticatedInfo";
import axios, { AxiosResponse } from "axios";
import { LocalStorageService } from "../localStorageService";
import { StatusCode } from "../../models/enums/StatusCodeEnum";
import { CustomError } from "../../utils/customError";

export class AuthenticateService {
    authenticate = async (
        username: string,
        password: string
    ): Promise<void> => {
        try {
            const response: AxiosResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/pub/authenticate`,
                {
                    username: username,
                    password: password,
                }
            );
            const authenticatedInfo: AuthenticatedInfo = response.data;
            const localStorageService = new LocalStorageService();
            localStorageService.saveTokenAndUserInfo(authenticatedInfo);
        } catch (error: any) {
            let errorMsg: string = "Unknown error";
            if (error.status === StatusCode.UNAUTHORIZED) {
                errorMsg = "Username or password incorrect";
            } else if (error.status === StatusCode.BAD_REQUEST) {
                errorMsg = error.message;
            }

            throw new CustomError(error.status, errorMsg, error.statusText);
        }
    };
}
