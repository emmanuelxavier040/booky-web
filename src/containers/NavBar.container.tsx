import { connect } from 'react-redux'
import { ThunkDispatch } from "redux-thunk";
import { IAppReducer } from '../reducers/reducers'
import { IAuthenticationState } from '../reducers/authentication.reducer';


interface INavBarStateProps {
    authentication: IAuthenticationState
}

interface INavBarDispatchProps { }

export type NavBarProps = INavBarStateProps & INavBarDispatchProps

const mapStateToProps = (state: IAppReducer, props: any): INavBarStateProps => ({
    authentication: state.authentication,
    ...props
})

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppReducer, any, any>): INavBarDispatchProps => ({

})

export default connect(mapStateToProps, mapDispatchToProps)