import { groupService } from '../services/group.service'
import { groupConstants } from '../constants/GroupConstants'


export const groupActions = {
    updateGroupTitle,
    createGroup,
    getGroup,
    getMyGroups,
    getAdminUsersOfGroup,
    addAdminForGroup,
    removeAdminFromGroup,
    createShortUrlWithExpiry
}


function updateGroupTitle(title: string) {
    return { type: groupConstants.ADD_TITLE, data: title }
}

function createGroup(group: any) {
    return (dispatch: any) => {
        dispatch({ type: groupConstants.CREATE_GROUP_REQUEST_STARTED })
        groupService.createNewGroup({ ...group }).then(
            response => {
                dispatch({ type: groupConstants.SUCCESS_CREATE_GROUP_REQUEST, data: response})
            },
            error => {
                dispatch({ type: groupConstants.FAILURE_CREATE_GROUP_REQUEST })
            }
        )
        dispatch({ type: groupConstants.CREATE_GROUP_REQUEST_ENDED })
    }
}

function getGroup(id: number) {
    return (dispatch: any) => {
        dispatch({ type: groupConstants.GET_GROUP_REQUEST_STARTED })
        groupService.getOneGroup(id).then(
            response => {
                dispatch({ type: groupConstants.SUCCESS_GET_GROUP_REQUEST, data: response })
            },
            error => {
                dispatch({ type: groupConstants.FAILURE_GET_GROUP_REQUEST })
            }
        )
        dispatch({ type: groupConstants.GET_GROUP_REQUEST_ENDED })
    }

}

function getMyGroups() {
    return (dispatch: any) => {
        dispatch({ type: groupConstants.GET_GROUPS_REQUEST_STARTED })
        groupService.getMyGroups().then(
            response => {
                dispatch({ type: groupConstants.SUCCESS_GET_GROUPS_REQUEST, data: response })
            },
            error => {
                dispatch({ type: groupConstants.FAILURE_GET_GROUPS_REQUEST })
            }
        )
        dispatch({ type: groupConstants.GET_GROUPS_REQUEST_ENDED })
    }

}

function getAdminUsersOfGroup(id: number) {
    return (dispatch: any) => {
        dispatch({ type: groupConstants.GET_GROUP_ADMINS_REQUEST_STARTED })
        groupService.getAdminUsersOfGroup(id).then(
            response => {
                dispatch({ type: groupConstants.SUCCESS_GET_GROUP_ADMINS_REQUEST, data: response })
            },
            error => {
                dispatch({ type: groupConstants.FAILURE_GET_GROUP_ADMINS_REQUEST })
            }
        )
        dispatch({ type: groupConstants.GET_GROUP_ADMINS_REQUEST_ENDED })
    }

}


function addAdminForGroup(id: number, user: any) {
    return (dispatch: any) => {
        dispatch({ type: groupConstants.ADD_GROUP_ADMIN_REQUEST_STARTED })
        groupService.addAdminForGroup(id, user).then(
            response => {
                dispatch({ type: groupConstants.SUCCESS_ADD_GROUP_ADMIN_REQUEST, data: user})
            },
            error => {
                dispatch({ type: groupConstants.FAILURE_ADD_GROUP_ADMIN_REQUEST })
            }
        )
        dispatch({ type: groupConstants.ADD_GROUP_ADMIN_REQUEST_ENDED })
    }
}

function removeAdminFromGroup(id: number, user: any) {
    return (dispatch: any) => {
        dispatch({ type: groupConstants.REMOVE_GROUP_ADMIN_REQUEST_STARTED })
        groupService.removeAdminFromGroup(id, user).then(
            response => {
                dispatch({ type: groupConstants.SUCCESS_REMOVE_GROUP_ADMIN_REQUEST, data: user})
            },
            error => {
                dispatch({ type: groupConstants.FAILURE_REMOVE_GROUP_ADMIN_REQUEST })
            }
        )
        dispatch({ type: groupConstants.REMOVE_GROUP_ADMIN_REQUEST_ENDED })
    }
}

function createShortUrlWithExpiry(url : any) {
    return (dispatch: any) => {
        dispatch({ type: groupConstants.CREATE_SHORTURL_REQUEST_STARTED })
        groupService.createShortUrlWithExpiry(url).then(
            response => {
                dispatch({ type: groupConstants.SUCCESS_CREATE_SHORTURL_REQUEST, data: response})
            },
            error => {
                dispatch({ type: groupConstants.FAILURE_CREATE_SHORTURL_REQUEST })
            }
        )
        dispatch({ type: groupConstants.CREATE_SHORTURL_REQUEST_ENDED })
    }
}