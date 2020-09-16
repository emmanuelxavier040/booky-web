import { connect } from 'react-redux'
import { ThunkDispatch } from "redux-thunk";

import { IAppReducer } from '../reducers/reducers'
import { groupActions } from '../actions/group.actions'

import { IGroupListState } from '../reducers/group.reducer';
import { IAuthenticationState } from '../reducers/authentication.reducer';
import { groupConstants } from '../constants/GroupConstants';

interface IGroupDispatchState {
    group: IGroupListState
    authentication: IAuthenticationState
}


const mapStateToProps = (state: IAppReducer, props: any): IGroupDispatchState => {
    return {
        group: state.groupList,
        authentication: state.authentication
    }
}

interface IGroupDispatchToProps {
    createGroup: (group: any) => any
    getGroup: (id: number) => any
    getMyGroups: () => any
    createShortUrlWithExpiry: (url: any) => any
    clearUrlState: () => any

}

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppReducer, any, any>): IGroupDispatchToProps => ({
    createGroup: group => groupActions.createGroup(group)(dispatch),
    getGroup: id => groupActions.getGroup(id)(dispatch),
    getMyGroups: () => groupActions.getMyGroups()(dispatch),
    createShortUrlWithExpiry: url => groupActions.createShortUrlWithExpiry(url)(dispatch),
    clearUrlState: () => { dispatch({ type: groupConstants.CLEAR_SHORTURL_STATE })}
})

export type GroupProps = IGroupDispatchState & IGroupDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)