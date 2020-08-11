
const initialState = [];

const aroundReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case 'SELECT_PRODUCT_AROUND':
            return state = [...payload];


        default:
            return state;
    }
}

export default aroundReducer;