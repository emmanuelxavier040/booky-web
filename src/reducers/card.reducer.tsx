import { cardConstants } from '../constants/CardConstants';
import { groupConstants } from '../constants/GroupConstants';

import { IGroupState } from '../reducers/group.reducer';

export interface ICardState {
    id: number,
    title: string,
    url: string,
    shortUrl: string,
    image: string,
    groupId: number
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
        cardIds: []
    },
    isloadingCards: false,
    isloadedCards: false,
    cardList: [],
    isCreatingCard: false,
    isCreatedCard: true

}

export const cardListReducer = (state: ICardListState = defaultCardListState, action: any): ICardListState => {    
    console.log(action)
    switch (action.type) {

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
            let newList = []
            newList = state.cardList
            newList.push(action.data)
            return {...state, isCreatedCard: true, cardList: newList}

        case cardConstants.FAILURE_CREATE_CARD_REQUEST:
            return {...state,  isCreatedCard: false}   

        // case groupConstants.CREATE_GROUP_REQUEST_ENDED:
        //         return {...state, isCreatingGroup: false}  

        default:
            return state
    }
}
