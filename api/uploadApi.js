import axiosClient from "./apiClient";
import { headers } from "./urlAPI";

const uploadApi = {
    avatar: (file) => {
        const url = '/upload/avatar';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryAsfOWiFipv4WAqFQ',
            }
        }
        return axiosClient.post(url, file, headers());
    },

    rooms: (data) => {
        const url = `/upload/rooms`;
        return axiosClient.post(url, data);
    },

}

export default uploadApi; 