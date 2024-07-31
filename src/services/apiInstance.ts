import axios, { AxiosError } from "axios";
import { SessionStorageService } from "./sessionStorageService";
import { StatusCode } from "../models/enums/StatusCodeEnum";
import { CustomError } from "../utils/customError";

const apiInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

apiInstance.interceptors.request.use(
    (config) => {
        const sessionStorageService = new SessionStorageService();
        const accessToken: string | null =
            sessionStorageService.getAccessToken();

        if (accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            config.headers.Accept = "application/json";
            config.headers["Content-Type"] = "application/json";
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error instanceof AxiosError) {
            if (error.response?.status === StatusCode.UNAUTHORIZED) {
                const sessionStorageService = new SessionStorageService();
                sessionStorageService.clearSessionStorage();
                window.location.href = "/login";
            } else if (error.response?.status === StatusCode.BAD_REQUEST) {
                throw new CustomError(
                    error.response?.status,
                    error.response?.statusText
                );
            } else {
                window.location.href = "/error";
            }
        } else {
            window.location.href = "/error";
        }
    }
);

export default apiInstance;
