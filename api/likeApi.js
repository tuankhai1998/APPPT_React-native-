import axiosClient from "./apiClient";
import { headers } from "./urlAPI";

const likeApi = {
    get: (payload) => {
        console.log(payload)
        const { userID, token } = payload;
        const url = `/like/${userID}`;
        return axiosClient.get(url, {
            headers: headers(token)
        });
    },

    add: (params) => {
        console.log(params)
        const { data, token } = params;
        const url = `/like`;
        return axiosClient.post(url, data, {
            headers: headers(token)
        });
    },

    delete: (params) => {
        const { data, token } = params;
        const url = `/like/${data.id_user}`;
        return axiosClient.post(url, data, {
            headers: headers(token)
        });
    }


}

export default likeApi; 