import { apiService } from './api.service'


export const userService = {
    login,
    authenticateToken,
    logout
}


function login(response: any) {
    localStorage.setItem('google_token', response.tokenObj.id_token)
    const requestOptions = {
        methos: 'POST'
    }
    const loginResponse = apiService.apiCall('/login',requestOptions)
    .then(
        (result: any) => {
            if(result != null) {
                localStorage.setItem('jwt_authorization', result.jwt_token)
            }
        },
        (error: any) => {
            return Promise.reject(error)
        })
            
    return loginResponse
}

function authenticateToken() {    
    if(localStorage.getItem('jwt_authorization') == null) {
        return Promise.reject();
    }
    const requestOptions = {
        method: 'GET'
    }
    const authenticateResponse = apiService.apiCall(
        '/authorize',
        requestOptions
    )
    authenticateResponse
        .then(result => { if (result !== null){} })
        .catch(error => {
           logout()
        })
    return authenticateResponse
}


function logout() {
    localStorage.removeItem('google_token')
    localStorage.removeItem('jwt_authorization')
}
