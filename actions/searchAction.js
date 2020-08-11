export const search = (dataSearch) => {
    return {
        type: 'SEARCH',
        payload: dataSearch
    }
}

export const searchAdvanced = (dataSearch) => {
    return {
        type: 'SELECT_ADVANCED',
        payload: dataSearch
    }
}
