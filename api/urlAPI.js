import { AsyncStorage } from "react-native";

export const baseUrl = 'http://192.168.1.109:5000'

export const imageUrl = `${baseUrl}/upload/`;


let Token = '';

export const getToken = async () => {
    try {
        await AsyncStorage.getItem('user').then(user => {
            Token = JSON.parse(user).token;
            return JSON.parse(user).token
        })
    } catch (error) {
        console.log(error)
    }
    return;
}

export const headers = (ctype = 'application/json') => {
    return {
        headers: {
            'content-type': ctype,
            'Authorization': `Bearer ${Token}`
        }
    }


}