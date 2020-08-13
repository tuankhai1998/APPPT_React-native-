import roomsApi from "../api/roomsAPI"

export const addProduct = (product) => {
    return {
        type: 'ADD_PRODUCT',
        payload: product
    }
}

const showAllProduct = (listProduct) => {
    return {
        type: 'SELECT_ALL',
        payload: listProduct
    }
}

export const fetchAllProducts = () => (dispatch) => {
    try {
        roomsApi.getAll().then(res => dispatch(showAllProduct(res))).catch(
            error => console.log(error)
        );

    } catch (error) {
        console.log(error)
    }
}

export const fetchProductAround = (payload) => dispatch => {
    try {
        roomsApi.getAround(payload).then(res => dispatch(showProductAround(res)));

    } catch (error) {
        console.log(error)
    }
}


const showProductAround = (listProduct) => {
    return {
        type: 'SELECT_PRODUCT_AROUND',
        payload: listProduct
    }
}