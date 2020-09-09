import { combineReducers } from 'redux'
import { IAuthenticationState, authenticationReducer} from './authentication.reducer'
import { IGroupListState, groupListReducer} from './group.reducer'
import { ICardListState, cardListReducer} from './card.reducer'


export interface IAppReducer {
  authentication: IAuthenticationState
  groupList: IGroupListState
  cardList: ICardListState
}

export const reducers = combineReducers<IAppReducer>({
  authentication: authenticationReducer,
  groupList: groupListReducer,
  cardList: cardListReducer
})
