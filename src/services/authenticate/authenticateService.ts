import { AuthenticatedInfo } from "../../models/authenticated-info/AuthenticatedInfo";
import axios, { AxiosError, AxiosResponse } from "axios";
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
        } catch (error) {
            let errorStatus: number = StatusCode.SERVER_ERROR;
            let errorMsg: string = "Unknown error";

            if (error instanceof AxiosError) {
                console.log(error);
                if (error.response?.status === StatusCode.UNAUTHORIZED) {
                    errorStatus = error.response?.status;
                    errorMsg = "Username or password incorrect";
                } else if (error.response?.status === StatusCode.BAD_REQUEST) {
                    errorStatus = error.response?.status;
                    errorMsg = error.message;
                }
            }

            throw new CustomError(errorStatus, errorMsg);
        }
    };
}
