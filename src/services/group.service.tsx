import { apiService } from './api.service'


export const groupService = {
    getOneGroup,
    createNewGroup,   
    getMyGroups
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

function getOneGroup(id: number) {
    const requestOptions = {
        method: 'GET',
    }
    return callAPI(requestOptions, '/groups/'+id)
}

function createNewGroup(group: any) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(group)
    }    
    return callAPI(requestOptions, '/groups')
}


function getMyGroups() {
    const requestOptions = {
        method: 'GET',
    }
    return callAPI(requestOptions, '/groups')
}
