import { apiService } from './api.service'


export const cardService = {
    getOneCard,
    createNewCard,
    updateCard,
    getAllCardsInGroup
    
}

function callAPI(requestOptions: any, path: any) {
    const response = apiService.apiCall(path, requestOptions)
    response
        .then(
            (response: any) => {
                return response
            },
            (error: any) => {
                return Promise.reject(error)
            }
        )
    return response
}

function getOneCard(id: number) {
    const requestOptions = {
        method: 'GET',
    }
    return callAPI(requestOptions, '/cards/'+id)
}

function createNewCard(card: any) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(card)
    }    
    return callAPI(requestOptions, '/cards')
}

function updateCard(card: any) {
    const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(card)
    }    
    return callAPI(requestOptions, '/cards/'+card.id)
}

function getAllCardsInGroup(id: number) {
    const requestOptions = {
        method: 'GET'
    }    
    return callAPI(requestOptions, '/groups/'+id+'/cards')
}
