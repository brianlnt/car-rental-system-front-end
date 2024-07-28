import axios from "axios";
import { LocalStorageService } from "./localStorageService";
import { StatusCode } from "../models/enums/StatusCodeEnum";
import { CustomError } from "../utils/customError";

const axiosApiInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

axiosApiInstance.interceptors.request.use(
    (config) => {
        const localStorageService = new LocalStorageService();
        const accessToken: string | null = localStorageService.getAccessToken();

        if (accessToken && config.headers) {
            config.headers.token = accessToken;
            config.headers.Accept = "application/json";
            config.headers["Content-Type"] = "application/json";
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosApiInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.status === StatusCode.UNAUTHORIZED) {
            window.location.href = "/login";
        } else if (error.status === StatusCode.BAD_REQUEST) {
            throw new CustomError(
                error.status,
                error.message,
                error.statusText
            );
        } else {
            window.location.href = "/error";
        }
    }
);

export default axiosApiInstance;
