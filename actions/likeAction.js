import likeApi from "../api/likeApi"

const addLikeProduct = (product) => {
    return {
        type: 'ADD_LIKE_PRODUCT',
        payload: product
    }
}

export const addLikeProductReq = payload => dispatch => {
    try {
        likeApi.add(payload).then(res => dispatch(selectAllLikeReq({ userID: payload.id_user })));
    } catch (error) {
        console.log(error)
    }
}

const deleteProductInLikeList = (index) => {
    return {
        type: 'DELETE_PRODUCT_IN_LIKE_LIST',
        payload: index
    }
}

export const deleteProductInLikeReq = payload => dispatch => {
    try {
        likeApi.delete(payload).then(res => dispatch(deleteProductInLikeList(payload.index)));
    } catch (error) {
        console.log(error)
    }
}


const selectAllLike = (listProduct) => {
    return {
        type: 'SELECT_LIKE_ALL',
        payload: listProduct
    }
}

export const selectAllLikeReq = (payload) => dispatch => {
    try {
        likeApi.get(payload).then(res => {
            dispatch(selectAllLike(res))
        });

    } catch (error) {
        console.log(error)
    }
}


export const checkLikeProduct = (id) => {
    return {
        type: 'CHECK_LIKE_PRODUCT',
        payload: id
    }
}