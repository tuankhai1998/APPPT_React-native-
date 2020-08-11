import axiosClient from "./apiClient";
import Axios from "axios";
import { baseUrl } from "./urlAPI";

const roomsApi = {
    getAll: (token) => {
        const url = '/rooms';
        return axiosClient.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    },

    get: (id) => {
        const url = `/rooms/${id}`;
        return axiosClient.get(url);
    },

    getAround: (payload) => {
        const url = `/rooms`;
        return axiosClient.post(url, payload, {
            headers: {
                'Authorization': `Bearer ${payload.token}`
            }
        });
    },

    getRent: (userID) => {
        const url = `/rents/${userID}`
        return axiosClient.get(url);
    },

    delRent: (params) => {
        const url = `/rents/${params}`
        return axiosClient.delete(url);
    },

    update: (data) => {
        const url = `/renst`
        return axiosClient.put(url, data)
    },

    store: (data) => {
        const url = `/rents`;
        return fetch(`${baseUrl}${url}`, {
            method: 'POST',
            body: data,
            headers: {
                'content-type': 'multipart/form-data',
            }
        });

    }
}

export default roomsApi; 