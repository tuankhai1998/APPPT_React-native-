import axiosClient from "./apiClient";
import { baseUrl, headers } from "./urlAPI";

const roomsApi = {
    getAll: () => {
        const url = '/rooms';
        return axiosClient.get(url);
    },

    get: (id) => {
        const url = `/rooms/${id}`;
        return axiosClient.get(url);
    },

    getAround: (payload) => {
        const url = `/rooms`;
        return axiosClient.post(url, payload);
    },

    getRent: (userID) => {
        const url = `/rents/${userID}`
        return axiosClient.get(url);
    },

    delRent: (params) => {
        const url = `/rents/${params}`
        return axiosClient.delete(url, headers());
    },

    update: (data) => {
        const url = `/renst`
        return axiosClient.put(url, data)
    },

    store: (data) => {
        const url = `/rents`;
        return axiosClient.post(url, data, headers())

    }
}

export default roomsApi; 