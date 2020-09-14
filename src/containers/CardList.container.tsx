import { connect } from 'react-redux'
import { ThunkDispatch } from "redux-thunk";

import { IAppReducer } from '../reducers/reducers'
import { cardActions } from '../actions/card.actions'
import { groupActions } from '../actions/group.actions';
import { userActions } from '../actions/user.actions';

import { ICardListState, IUserState } from '../reducers/card.reducer';
import { IAuthenticationState } from '../reducers/authentication.reducer';


interface ICardDispatchState {
    card: ICardListState
    groupId: number,
    authentication: IAuthenticationState

}


const mapStateToProps = (state: IAppReducer, props: any): ICardDispatchState => {
    return {
        card: state.cardList,
        groupId: props.groupId,
        authentication: state.authentication
    }
}

interface ICardDispatchToProps {
    createCard: (card: any) => any
    getCard: (id: number) => any
    updateCard: (card: any) => any
    getAllCardsInGroup: (groupId: number) => any
    getGroup: (id: number) => any
    deleteCard: (id: number) => any
    getAllCardsInQueue: (id: number) => any
    approveCardInQueue: (id: number) => any
    rejectCardInQueue: (id: number) => any
    getMatchingUsers: (match: string) => any
    getAdminUsersOfGroup: (id: number) => any
    addAdminForGroup: (id: number, user: IUserState) => any
    removeAdminFromGroup: (id: number, user: IUserState) => any
}

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppReducer, any, any>): ICardDispatchToProps => ({
    createCard: card => cardActions.createCard(card)(dispatch),
    getCard: id => cardActions.getCard(id)(dispatch),
    updateCard: card => cardActions.updateCard(card)(dispatch),
    getAllCardsInGroup: id => cardActions.getAllCardsInGroup(id)(dispatch),
    getGroup: id => groupActions.getGroup(id)(dispatch),
    deleteCard: id => cardActions.deleteCard(id)(dispatch),
    getAllCardsInQueue: id => cardActions.getAllCardsInQueue(id)(dispatch),
    approveCardInQueue: id => cardActions.approveCardInQueue(id)(dispatch),
    rejectCardInQueue: id => cardActions.rejectCardInQueue(id)(dispatch),
    getMatchingUsers: match => userActions.getMatchingUsers(match)(dispatch),
    getAdminUsersOfGroup: id => groupActions.getAdminUsersOfGroup(id)(dispatch),
    addAdminForGroup: (id, user) => groupActions.addAdminForGroup(id, user)(dispatch),
    removeAdminFromGroup: (id, user) => groupActions.removeAdminFromGroup(id, user)(dispatch)

})

export type CardProps = ICardDispatchState & ICardDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)