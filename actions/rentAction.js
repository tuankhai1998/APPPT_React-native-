import roomsApi from "../api/roomsAPI"

export const getRentById = (id) => {
    return {
        type: 'GET_RENT_BY_ID',
        payload: id
    }
}

export const showAllRent = (listRentProduct) => {
    return {
        type: 'SELECT_ALL_RENT',
        payload: listRentProduct
    }
}


export const fetchAllRent = userID => dispatch => {
    try {
        roomsApi.getRent(userID).then(res => dispatch(showAllRent(res)));
    } catch (error) {
        console.log(error)
    }
}

export const updateRent = (productRent) => {
    return {
        type: 'UPDATE_RENT',
        payload: productRent
    }
}

export const updateRentReq = (product) => dispatch => {
    try {
        roomsApi.update(product).then(res => fetchAllRent(product.user_id))
    } catch (error) {

    }
}


export const addRentReq = data => dispatch => {
    try {
        return roomsApi.store(data).then(res => fetchAllRent(res))
    } catch (error) {

    }
}

export const addRent = (productRent) => {
    return {
        type: 'ADD_RENT_PRODUCT',
        payload: productRent
    }
}


export const changeRentState = (product) => {
    return {
        type: 'CHANGE_RENT_STATE',
        payload: product
    }
}

export const deleteRent = (index) => {
    return {
        type: 'DELETE_RENT_PRODUCT',
        payload: index
    }
}


export const deleteRentReq = (roomID, index) => dispatch => {
    try {
        roomsApi.delRent(roomID).then(res => dispatch(deleteRent(index)));
    } catch (error) {
        console.log(error)
    }
}
