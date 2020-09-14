import { cardService } from '../services/card.service'
import { cardConstants } from '../constants/CardConstants'


export const cardActions = {
    updateCard,
    createCard,
    getCard,
    getAllCardsInGroup,
    deleteCard,
    getAllCardsInQueue,
    approveCardInQueue,
    rejectCardInQueue
}

function createCard(card: any) {
    return (dispatch: any) => {
        dispatch({ type: cardConstants.CREATE_CARD_REQUEST_STARTED })
        cardService.createNewCard({ ...card }).then(
            response => {
                dispatch({ type: cardConstants.SUCCESS_CREATE_CARD_REQUEST})
                if(response.status === 'CREATED')
                    dispatch({ type: cardConstants.CARD_CREATION_STATUS_CREATED, data: response})
                else
                    dispatch({ type: cardConstants.CARD_CREATION_STATUS_PENDING})                                
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
                dispatch({ type: cardConstants.SUCCESS_UPDATE_CARD_REQUEST })
                if(response.status === 'UPDATED')
                    dispatch({ type: cardConstants.CARD_UPDATE_STATUS_UPDATED, data: response})
                else
                    dispatch({ type: cardConstants.CARD_UPDATE_STATUS_PENDING})     
                
            },
            error => {
                dispatch({ type: cardConstants.FAILURE_UPDATE_CARD_REQUEST })
            }
        )
        dispatch({ type: cardConstants.UPDATE_CARD_REQUEST_ENDED })
    }
}

function deleteCard(id: number) {
    return (dispatch: any) => {
        dispatch({ type: cardConstants.DELETE_CARD_REQUEST_STARTED })
        cardService.deleteCard(id).then(
            response => {                
                dispatch({ type: cardConstants.SUCCESS_DELETE_CARD_REQUEST })
                if(response === 'DELETED')
                    dispatch({ type: cardConstants.CARD_DELETE_STATUS_DELETED, data: id })
                else
                    dispatch({ type: cardConstants.CARD_DELETE_STATUS_PENDING})                
            },
            error => {
                dispatch({ type: cardConstants.FAILURE_DELETE_CARD_REQUEST })
            }
        )
        dispatch({ type: cardConstants.DELETE_CARD_REQUEST_ENDED })
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

function getAllCardsInQueue(id: number) {
    return (dispatch: any) => {
        dispatch({ type: cardConstants.GET_CARDS_IN_QUEUE_REQUEST_STARTED })
        cardService.getAllCardsInQueue(id).then(
            response => {                
                dispatch({ type: cardConstants.SUCCESS_GET_CARDS_IN_QUEUE_REQUEST, data: response })
            },
            error => {
                dispatch({ type: cardConstants.FAILURE_GET_CARDS_IN_QUEUE_REQUEST })
            }
        )
        dispatch({ type: cardConstants.GET_CARDS_IN_QUEUE_REQUEST_ENDED })
    }

}

function approveCardInQueue(id: number) {
    return (dispatch: any) => {
        dispatch({ type: cardConstants.APPROVE_CARD_IN_QUEUE_REQUEST_STARTED })
        cardService.approveCardInQueue(id).then(
            response => {                
                dispatch({ type: cardConstants.SUCCESS_APPROVE_CARD_IN_QUEUE_REQUEST, data: {queueCardId: id, response} })
               },
            error => {
                dispatch({ type: cardConstants.FAILURE_APPROVE_CARD_IN_QUEUE_REQUEST })
            }
        )
        dispatch({ type: cardConstants.APPROVE_CARD_IN_QUEUE_REQUEST_ENDED })
    }
}

function rejectCardInQueue(id: number) {
    return (dispatch: any) => {
        dispatch({ type: cardConstants.REJECT_CARD_IN_QUEUE_REQUEST_STARTED })
        cardService.rejectCardInQueue(id).then(
            response => {                
                dispatch({ type: cardConstants.SUCCESS_REJECT_CARD_IN_QUEUE_REQUEST, data: id })
               },
            error => {
                dispatch({ type: cardConstants.FAILURE_REJECT_CARD_IN_QUEUE_REQUEST })
            }
        )
        dispatch({ type: cardConstants.REJECT_CARD_IN_QUEUE_REQUEST_ENDED })
    }
}