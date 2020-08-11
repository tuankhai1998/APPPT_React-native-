
export const baseUrl = 'http://192.168.1.169:5000'

export const imageUrl = `${baseUrl}/upload/`




export const headers = (token, ctype = 'application/json') => {
    return {
        headers: {
            'content-type': ctype,
            'Authorization': `Bearer ${token}`
        }
    }
}