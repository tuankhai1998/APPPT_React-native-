import { randomID } from "../constants/randomID";

const userReducer = (state = { login: true }, action) => {

    const { payload } = action;
    switch (action.type) {
        case 'CHECK_USER': {
            if (payload.length === 0) {
                return state = { login: true };
            } else {
                return state = { ...payload, login: false }
            }
        }
        case 'GET_USER': {
            return state;
        }
        case 'UPDATE_USER': {
            let newUser = { ...action.payload, ...state };
            state = newUser;
            return state;
        }
        case 'SIGN_OUT': {
            return state = { login: true };
        }

        default:
            return state;
    }
}

export default userReducer;