import { combineReducers } from 'redux'
import { IAuthenticationState, authenticationReducer} from './authentication.reducer'

export interface IAppReducer {
  authentication: IAuthenticationState
}

export const reducers = combineReducers<IAppReducer>({
  authentication: authenticationReducer
})
