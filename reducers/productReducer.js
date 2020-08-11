

const products = require('../location.json')

const initialState = [];

const productReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case 'SELECT_ALL': {
            state = [...payload];
            return state;
        }

        default:
            return state;
    }
}

export default productReducer;