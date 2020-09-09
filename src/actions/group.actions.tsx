import { groupService } from '../services/group.service'
import { groupConstants } from '../constants/GroupConstants'


export const groupActions = {
    updateGroupTitle,
    createGroup,
    getGroup,
    getMyGroups
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
