import { randomID } from "../constants/randomID";

const userReducer = (state = { login: false }, action) => {

    const { payload } = action;
    switch (action.type) {
        case 'CHECK_USER': {
            if (payload.length === 0) {
                return state = { login: false };
            } else {
                return state = { ...payload, login: true }
            }
        }
        case 'GET_USER': {
            return state;
        }
        case 'UPDATE_USER': {
            let newUser = { ...action.payload };
            state = newUser;
            return state;
        }

        default:
            return state;
    }
}

export default userReducer;