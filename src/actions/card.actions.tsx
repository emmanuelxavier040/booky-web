import { cardService } from '../services/card.service'
import { cardConstants } from '../constants/CardConstants'


export const cardActions = {
    updateCard,
    createCard,
    getCard,
    getAllCardsInGroup
}

function createCard(card: any) {
    return (dispatch: any) => {
        dispatch({ type: cardConstants.CREATE_CARD_REQUEST_STARTED })
        cardService.createNewCard({ ...card }).then(
            response => {
                dispatch({ type: cardConstants.SUCCESS_CREATE_CARD_REQUEST, data: response})
            },
            error => {
                dispatch({ type: cardConstants.FAILURE_CREATE_CARD_REQUEST })
            }
        )
        dispatch({ type: cardConstants.CREATE_CARD_REQUEST_ENDED })
    }
}

function updateCard(card: any) {
    return (dispatch: any) => {
        dispatch({ type: cardConstants.UPDATE_CARD_REQUEST_STARTED })
        cardService.updateCard({ ...card }).then(
            response => {
                dispatch({ type: cardConstants.SUCCESS_UPDATE_CARD_REQUEST, data: response})
            },
            error => {
                dispatch({ type: cardConstants.FAILURE_UPDATE_CARD_REQUEST })
            }
        )
        dispatch({ type: cardConstants.UPDATE_CARD_REQUEST_ENDED })
    }
}

function getCard(id: number) {
    return (dispatch: any) => {
        dispatch({ type: cardConstants.GET_CARD_REQUEST_STARTED })
        cardService.getOneCard(id).then(
            response => {
                dispatch({ type: cardConstants.SUCCESS_GET_CARD_REQUEST })
            },
            error => {
                dispatch({ type: cardConstants.FAILURE_GET_CARD_REQUEST })
            }
        )
        dispatch({ type: cardConstants.GET_CARD_REQUEST_ENDED })
    }

}

function getAllCardsInGroup(id: number) {
    return (dispatch: any) => {
        dispatch({ type: cardConstants.GET_CARDS_REQUEST_STARTED })
        cardService.getAllCardsInGroup(id).then(
            response => {                
                dispatch({ type: cardConstants.SUCCESS_GET_CARDS_REQUEST, data: response })
            },
            error => {
                dispatch({ type: cardConstants.FAILURE_GET_CARDS_REQUEST })
            }
        )
        dispatch({ type: cardConstants.GET_CARDS_REQUEST_ENDED })
    }

}
