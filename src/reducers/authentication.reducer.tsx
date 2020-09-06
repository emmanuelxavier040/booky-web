import {userConstants} from '../constants/UserConstants'

export interface IAuthenticationState {
    loggedIn: any,
    loggingIn: any,
    user: any
}


let user = JSON.parse(localStorage.getItem('user_token')+'')
const initialState = user ? {loggedIn: false, user, loggingIn: false }: { loggedIn: false, user: {}, loggingIn: false}

export function authenticationReducer(state: IAuthenticationState = initialState, action: any): IAuthenticationState {
    switch(action.type) {
        case userConstants.LOGIN_REQUEST:
            return {...state, loggingIn: true, user: action.user}

        case userConstants.LOGIN_SUCCESS:
            return {...state, loggingIn: false, loggedIn: true, user: action.user}

        case userConstants.LOGIN_FAILURE:
            return {...state, loggingIn: false, loggedIn: false, user: action.user}

        case userConstants.LOGOUT_REQUEST:
            return {...state, loggingIn: false, loggedIn: true }

        case userConstants.LOGOUT_SUCCESS:
            return {...state, loggingIn: false, loggedIn: false, user: {} }

        case userConstants.TOKEN_AUTH_REQUEST:
            return state

        case userConstants.TOKEN_AUTH_SUCCESS:
            return {...state, loggingIn: false, loggedIn: true }

        case userConstants.TOKEN_AUTH_FAILURE:
            return {...state, loggingIn: false, loggedIn: false, user: {} }

        case userConstants.LOGOUT_FAILURE:    
        default:
            return state
    }
}
