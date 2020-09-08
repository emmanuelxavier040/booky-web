import { combineReducers } from 'redux'
import { IAuthenticationState, authenticationReducer} from './authentication.reducer'
import { IGroupListState, groupListReducer} from './group.reducer'

export interface IAppReducer {
  authentication: IAuthenticationState
  groupList: IGroupListState
}

export const reducers = combineReducers<IAppReducer>({
  authentication: authenticationReducer,
  groupList: groupListReducer
})
