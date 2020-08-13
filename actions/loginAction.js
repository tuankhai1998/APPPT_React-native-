import loginApi from "../api/loginApi";

export const checkLogin = (user) => {
    return {
        type: 'CHECK_USER',
        payload: user
    }
}

export const checkLoginReq = user => dispatch => {

    try {
        loginApi.checkLogin(user).then(res => dispatch(checkLogin(res)));
    } catch (error) {
        console.log(error)
    }
}

export const getUser = () => {
    return {
        type: 'GET_USER',
    }
}

export const updateUser = (user) => {
    return {
        type: 'UPDATE_USER',
        payload: user
    }
}

export const logOut = () => {
    return {
        type: 'SIGN_OUT',
    }
}

export const updateUserReq = user => dispatch => {
    try {
        loginApi.update(user).then(res => dispatch(updateUser(user)));
    } catch (error) {
        console.log(error)
    }
}

export const createUserReq = user => dispatch => {
    try {
        loginApi.create(user).then(res => dispatch(checkLogin(user)));
    } catch (error) {
        console.log(error)
    }
}





