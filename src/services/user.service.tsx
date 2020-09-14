import { apiService } from './api.service'


export const userService = {
    login,
    authenticateToken,
    logout,
    getMatchingUsers
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

function callAPI(requestOptions: any, path: any) {
    const response = apiService.apiCall(path, requestOptions)
    response
        .then(
            (response: any) => {
                return response
            },
            (error: any) => {
                return Promise.reject(error)
            }
        )
    return response
}

function getMatchingUsers(match: string) {
    const requestOptions = {
        method: 'GET'
    }         
    return callAPI(requestOptions, '/users/'+match)
}
