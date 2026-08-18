import { SERVER_URL } from "@/config/api.config";
import { errorCatch, getContentType } from "./api.helper";
import { CreateAxiosDefaults } from "axios";
import axios from "axios";
import { getAccessToken, removeFromStorage } from "@/services/auth/auth.token.service";
import { authService } from "@/services/auth/auth.service";

const options: CreateAxiosDefaults = {
    baseURL: SERVER_URL,
    headers: getContentType(),
    withCredentials: true,
}

const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use(config => {
    const accessToken = getAccessToken();
    if (config?.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

axiosWithAuth.interceptors.response.use(response => response, async error => {
    const originalRequest = error.config;
    if ((error.response.status === 401 || 
        errorCatch(error) === 'jwt expired' || 
        errorCatch(error) === 'jwt must be provided'
    ) && !originalRequest._retry) {
        originalRequest._retry = true;
        originalRequest.IsRetry = true;
        try {
            await authService.getNewTokens();
            return axiosWithAuth(originalRequest);
        } catch (error) {
            if (errorCatch(error) === 'jwt expired') {
                removeFromStorage();
            }
        }
    }

    throw error;
});

export { axiosClassic, axiosWithAuth };