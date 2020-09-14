import { cardConstants } from '../constants/CardConstants';
import { groupConstants } from '../constants/GroupConstants';
import { userConstants } from '../constants/UserConstants';

import { IGroupState } from '../reducers/group.reducer';

export interface ICardState {
    id: number,
    title: string,
    url: string,
    shortUrl: string,
    image: string,
    groupId: number,
    status: string,
    description: string
}

export interface ICardQueueState extends ICardState {
    cardId: number
}

export interface IUserState {
    userId: number,
    email: string,
    firstName: string, 
    lastName: string
}

export interface ICardListState {
    group: IGroupState,
    isloadingCards: boolean,
    isloadedCards: boolean,
    cardList: Array<ICardState>
    isCreatingCard: boolean,
    isCreatedCard: boolean,
    cardQueueList: Array<ICardQueueState>
    adminsList: Array<IUserState>
    usersList: Array<IUserState>
}


const defaultCardListState: ICardListState = {   
    group: {
        id: 0,
        context: '',
        adminIds: [],
        cardIds: []
    },
    isloadingCards: false,
    isloadedCards: false,
    cardList: [],
    isCreatingCard: false,
    isCreatedCard: true,
    cardQueueList: [],
    adminsList: [],
    usersList: []

}



export const cardListReducer = (state: ICardListState = defaultCardListState, action: any): ICardListState => {    
    let newList: Array<ICardState> = []
    let newQueueList: Array<ICardQueueState> = []
    let newUserList: Array<IUserState> = []
    switch (action.type) {

        case groupConstants.SUCCESS_REMOVE_GROUP_ADMIN_REQUEST:
            newUserList = state.adminsList.filter(admin => admin.userId !== action.data.userId)
            return { ...state, adminsList: newUserList }

        case groupConstants.SUCCESS_ADD_GROUP_ADMIN_REQUEST:
            newUserList = state.adminsList
            newUserList.push(action.data)
            return { ...state, adminsList: newUserList }

        case userConstants.SUCCESS_GET_MATCHING_USERS_REQUEST:
            return { ...state, usersList: action.data}

        case groupConstants.SUCCESS_GET_GROUP_ADMINS_REQUEST:
            return { ...state, adminsList: action.data }

        case cardConstants.SUCCESS_REJECT_CARD_IN_QUEUE_REQUEST:
            newQueueList = state.cardQueueList.filter(card => card.id !== action.data)
            return { ...state, cardQueueList: newQueueList}

        case cardConstants.SUCCESS_APPROVE_CARD_IN_QUEUE_REQUEST:
            const approvedCard: ICardQueueState = state.cardQueueList.filter(card => card.id === action.data.queueCardId)[0]
            newQueueList = state.cardQueueList.filter(card => card.id !== action.data.queueCardId)            
            newList = state.cardList            
            
            if(approvedCard.status === "PENDING_FOR_CREATION")
                newList.push(action.data.response)            
            else if(approvedCard.status === "PENDING_FOR_UPDATE")
                newList = state.cardList.map(card => { return card.id !== approvedCard.cardId? card : action.data.response})

            return { ...state, cardQueueList:  newQueueList,  isCreatedCard: true, cardList: newList }

        case cardConstants.SUCCESS_GET_CARDS_IN_QUEUE_REQUEST:  
            return { ...state, cardQueueList: action.data }

        case cardConstants.CARD_DELETE_STATUS_DELETED:
            newList = state.cardList.filter(card => card.id !== action.data)
            return { ...state, cardList: newList}

        case cardConstants.CARD_UPDATE_STATUS_UPDATED:
            newList = state.cardList.map(card => { return card.id !== action.data.id? card : action.data})      
            return { ...state, cardList: newList}

        case groupConstants.SUCCESS_GET_GROUP_REQUEST:
            return { ...state, group: action.data }

        case cardConstants.GET_CARDS_REQUEST_STARTED:
            return {...state, isloadingCards:true, isloadedCards: false}

        case cardConstants.SUCCESS_GET_CARDS_REQUEST:
            return {...state, cardList: action.data }
        
        case cardConstants.FAILURE_GET_CARDS_REQUEST:
            return {...state, isloadingCards:false, isloadedCards: false}

        case cardConstants.GET_CARDS_REQUEST_ENDED:
            return {...state, isloadingCards:false, isloadedCards: true}

        case cardConstants.CREATE_CARD_REQUEST_STARTED:
            return {...state, isCreatingCard: true, isCreatedCard: false}

        case cardConstants.SUCCESS_CREATE_CARD_REQUEST:
            return state            
        
        case cardConstants.CARD_CREATION_STATUS_CREATED:
            newList = state.cardList
            newList.push(action.data)
            return {...state, isCreatedCard: true, cardList: newList}
        
        case cardConstants.CARD_CREATION_STATUS_PENDING:
            return state        
            
        case cardConstants.FAILURE_CREATE_CARD_REQUEST:
            return {...state,  isCreatedCard: false}   

        // case groupConstants.CREATE_GROUP_REQUEST_ENDED:
        //         return {...state, isCreatingGroup: false}  

        default:
            return state
    }
}
