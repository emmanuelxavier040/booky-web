import { userConstants } from '../constants/UserConstants'
import { userService } from '../services/user.service'

export interface UserActionType {
    loginUser: (value: any) => any
    logoutUser: () => any
}

export const userActions = {
    loginUser,
    logoutUser
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
        console.log('logging out')
        // dispatch({ type: userConstants.LOGOUT_REQUEST })
        userService.logout();
        // dispatch({ type: userConstants.LOGOUT_SUCCESS })
    }
}