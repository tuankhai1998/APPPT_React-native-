import axiosClient from "./apiClient";

const loginApi = {
    checkLogin: (params) => {
        const url = '/login';
        return axiosClient.post(url, { ...params });
    },

    update: (params) => {
        const url = `/user/${params.id}`;
        return axiosClient.post(url, params.newUser);
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