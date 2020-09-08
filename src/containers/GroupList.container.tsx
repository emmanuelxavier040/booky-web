import { connect } from 'react-redux'
import { ThunkDispatch } from "redux-thunk";

import { IAppReducer } from '../reducers/reducers'
import { groupActions } from '../actions/group.actions'

import { IGroupListState } from '../reducers/group.reducer';


interface IGroupDispatchState {
    group: IGroupListState
}


const mapStateToProps = (state: IAppReducer, props: any): IGroupDispatchState => {
    return {
        group: state.groupList
    }
}

interface IGroupDispatchToProps {
    createGroup: (group: any) => any
    getGroup: (id: number) => any
    getMyGroups: () => any

}

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppReducer, any, any>): IGroupDispatchToProps => ({
    createGroup: group => groupActions.createGroup(group)(dispatch),
    getGroup: id => groupActions.getGroup(id)(dispatch),
    getMyGroups: () => groupActions.getMyGroups()(dispatch)
})

export type GroupProps = IGroupDispatchState & IGroupDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)