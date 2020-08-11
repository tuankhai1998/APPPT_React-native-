import axiosClient from "./apiClient";

const uploadApi = {
    avatar: (file) => {
        const url = '/upload/avatar';
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryAsfOWiFipv4WAqFQ',
                
            }
        }
        return axiosClient.post(url, file, config);
    },

    rooms: (params) => {
        const url = `/upload/rooms`;
        return axiosClient.post(url, params);
    },

}

export default uploadApi; 