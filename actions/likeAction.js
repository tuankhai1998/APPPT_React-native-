import likeApi from "../api/likeApi"

const addLikeProduct = (product) => {
    return {
        type: 'ADD_LIKE_PRODUCT',
        payload: product
    }
}

export const addLikeProductReq = payload => dispatch => {
    let { data, token } = payload

    try {
        likeApi.add(payload).then(res => dispatch(selectAllLikeReq({ userID: data.id_user, token })));
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
        likeApi.delete(payload).then(res => dispatch(deleteProductInLikeList(payload.data.index)));
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


export const checlLikeProduct = (id) => {
    return {
        type: 'CHECK_LIKE_PRODUCT',
        payload: id
    }
}