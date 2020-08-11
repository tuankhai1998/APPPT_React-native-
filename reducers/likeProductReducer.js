


const initialState = [];

const likeReducer = (state = initialState, action) => {
    const { payload } = action;
    switch (action.type) {
        case 'SELECT_LIKE_ALL':
            return state = [...payload];
        case 'DELETE_PRODUCT_IN_LIKE_LIST': {
            let newListProduct = [...state];
            console.log(payload)
            newListProduct.splice(payload, 1);
            return state = [...newListProduct]
        }

        default:
            return state;
    }
}

export default likeReducer;