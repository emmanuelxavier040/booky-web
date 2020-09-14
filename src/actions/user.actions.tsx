import { userConstants } from '../constants/UserConstants'
import { userService } from '../services/user.service'

export interface UserActionType {
    loginUser: (value: any) => any
    logoutUser: () => any
    getMatchingUsers: (match: string) => any
}

export const userActions = {
    loginUser,
    logoutUser,
    getMatchingUsers
}

function loginUser(response: any) {
    return (dispatch: any) => {
        const userId = response.profileObj.googleId
        dispatch(request(userId))
        userService.login(response).then( 
            (response: any) => {
                dispatch(success(userId))
            },
            (error: any) => {
                dispatch(failure(userId))
            })
    }

    function request(user: any) {
        return { type: userConstants.LOGIN_REQUEST, user }
    }

    function success(user: any) {
        return { type: userConstants.LOGIN_SUCCESS, user }
    }

    function failure(user: any) {
        return { type: userConstants.LOGIN_FAILURE, user }
    }
}

function logoutUser() {
    return (dispatch: any) => {
        // dispatch({ type: userConstants.LOGOUT_REQUEST })
        userService.logout();
        // dispatch({ type: userConstants.LOGOUT_SUCCESS })
    }
}

function getMatchingUsers(match: string) {
    return (dispatch: any) => {
        dispatch({ type: userConstants.GET_MATCHING_USERS_REQUEST_STARTED })
        userService.getMatchingUsers(match).then(
            response => {                
                dispatch({ type: userConstants.SUCCESS_GET_MATCHING_USERS_REQUEST, data: response })},
            error => {
                dispatch({ type: userConstants.FAILURE_GET_MATCHING_USERS_REQUEST })
            }
        )
        dispatch({ type: userConstants.GET_MATCHING_USERS_REQUEST_ENDED })
    }
}
