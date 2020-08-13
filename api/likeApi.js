import axiosClient from "./apiClient";
import { headers } from "./urlAPI";

const likeApi = {
    get: (payload) => {
        const url = `/like/${payload}`;
        return axiosClient.get(url);
    },

    add: (data) => {
        console.log(headers())
        const url = `/like`;
        return axiosClient.post(url, data, headers());
    },

    delete: (payload) => {
        const url = `/like/${payload.id_user}`;
        return axiosClient.post(url, payload, headers());
    }


}

export default likeApi; 