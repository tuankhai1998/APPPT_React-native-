import { randomID } from "../constants/randomID";

const initialState = [];



const rentReducer = (state = initialState, action) => {

    const { payload } = action

    switch (action.type) {
        case 'SELECT_ALL_RENT':
            return state = [...payload];
        // case 'ADD_RENT_PRODUCT': {
        //     let newListProduct = [...state];
        //     let newProduct = { ...payload, id: randomID(), rentState: true }
        //     newListProduct.push(newProduct);
        //     console.log(newListProduct)
        //     return state = [...newListProduct]
        // }
        case 'CHANGE_RENT_STATE': {
            let listProduct = [...state];
            for (let i = 0; i < listProduct.length; i++) {
                if (listProduct[i].id === payload.id) {
                    listProduct[i] = { ...payload }
                }
            }
            return state = [...listProduct]
        }
        case 'DELETE_RENT_PRODUCT': {
            let newListItem = [...state];
            newListItem.splice(payload, 1);
            return state = newListItem;
        }
        case 'GET_RENT_BY_ID': {
            let index = 0;
            // state.forEach((product, i) => {
            //     if (product.id === payload) index = i;
            // });

            return state[0];
        }
        default:
            return state;
    }
}

export default rentReducer;