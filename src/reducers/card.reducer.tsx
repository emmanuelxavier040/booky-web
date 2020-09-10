import { cardConstants } from '../constants/CardConstants';
import { groupConstants } from '../constants/GroupConstants';

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

export interface ICardListState {
    group: IGroupState,
    isloadingCards: boolean,
    isloadedCards: boolean,
    cardList: Array<ICardState>
    isCreatingCard: boolean,
    isCreatedCard: boolean
}


const defaultCardListState: ICardListState = {   
    group: {
        id: 0,
        context: '',
        adminIds: [],
        cardIds: [],
        cardQueueIds: []
    },
    isloadingCards: false,
    isloadedCards: false,
    cardList: [],
    isCreatingCard: false,
    isCreatedCard: true

}

export const cardListReducer = (state: ICardListState = defaultCardListState, action: any): ICardListState => {    
    let newList: Array<ICardState> = []
    switch (action.type) {

        case cardConstants.CARD_UPDATE_STATUS_CREATED:
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
