import axiosClient from "./apiClient";
import { headers } from "./urlAPI";

const loginApi = {
    checkLogin: (params) => {
        const url = '/login';
        return axiosClient.post(url, { ...params });
    },

    update: (params) => {
        const url = `/user/${params.id}`;
        return axiosClient.post(url, params.newUser, headers());
    },

    getProfile: (id) => {
        const url = `/user/${id}`;
        return axiosClient.get(url);
    },

    create: (params) => {
        const url = `/user`;
        return axiosClient.post(url, params);
    },
}

export default loginApi; 