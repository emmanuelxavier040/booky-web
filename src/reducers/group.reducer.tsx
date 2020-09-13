import {groupConstants} from '../constants/GroupConstants';

export interface IGroupState {
    id: number,
    context: string,
    adminIds: Array<number>
    cardIds: Array<number>
}

export interface IGroupListState {
    isloadingGroups: boolean,
    isloadedGroups: boolean,
    groupList: Array<IGroupState>
    isCreatingGroup: boolean,
    isCreatedGroup: boolean
}


const defaultGroupListState: IGroupListState = {   
    isloadingGroups: true,
    isloadedGroups: false,
    groupList: [],
    isCreatingGroup: false,
    isCreatedGroup: true

}

export const groupListReducer = (state: IGroupListState = defaultGroupListState, action: any): IGroupListState => {    
    switch (action.type) {

        case groupConstants.GET_GROUPS_REQUEST_STARTED:
            return {...state, isloadingGroups:true, isloadedGroups: false}

        case groupConstants.SUCCESS_GET_GROUPS_REQUEST:
            return {...state, groupList: action.data }
        
        case groupConstants.FAILURE_GET_GROUPS_REQUEST:
            return {...state, isloadingGroups:false, isloadedGroups: false}

        case groupConstants.GET_GROUPS_REQUEST_ENDED:
            return {...state, isloadingGroups:false, isloadedGroups: true}

        case groupConstants.CREATE_GROUP_REQUEST_STARTED:
            return {...state, isCreatingGroup: true, isCreatedGroup: false}

        case groupConstants.SUCCESS_CREATE_GROUP_REQUEST:
            let newList = []
            newList = state.groupList
            newList.push(action.data)
            return {...state, isCreatedGroup: true, groupList: newList}

        case groupConstants.FAILURE_CREATE_GROUP_REQUEST:
            return {...state, isCreatedGroup: false}   

        // case groupConstants.CREATE_GROUP_REQUEST_ENDED:
        //         return {...state, isCreatingGroup: false}  

        default:
            return state
    }
}
