import React from 'react'
import { Route } from 'react-router-dom'
import { store } from '.'

import { userService } from './services/user.service'
import { userConstants } from './constants/UserConstants'
import GroupsHome from './components/Groups/GroupsHome';
import Login from './components/Login/Login';
const jwt_decode = require("jwt-decode")



export const PrivateRoute = (props: any) => {
    return (
        <Route
            {...props}
            render={(props2: any) => {
                return (
                    <AuthComponent
                        {...props2}
                        path={props.path}
                        renderComponent={props.componentToRender}
                    />
                )
            }}
        />
    )
}


class AuthComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props)
        this.state = {
            isauthenticated: false,
            renderComponent: () => {
                return (
                    <div>

                    </div>
                )
            }
        }
    }

    componentDidMount() {
        store.dispatch({ type: userConstants.TOKEN_AUTH_REQUEST })
        const authResponse = userService.authenticateToken();
        authResponse.then(
            (response:any) => {
                let userId: number = -1
                const token = localStorage.getItem('jwt_authorization')      
                if (token !== null) {
                    const clientInfo = (jwt_decode(token))
                    userId = clientInfo.id
                }
                store.dispatch({ type: userConstants.TOKEN_AUTH_SUCCESS, userId})
                let render = this.props.renderComponent
                if (this.props.path === '/login') {                   
                    render = GroupsHome
                }
                this.setState({
                    isauthenticated: true,
                    renderComponent: render
                })
            },
            (error:any) => {
                store.dispatch({ type: userConstants.TOKEN_AUTH_FAILURE })
                this.setState({
                    isauthenticated: false,
                    renderComponent: Login
                })
            }
        )
    }
    

    render() {  
        return (
            <this.state.renderComponent {...this.props}/>
        )
    }
}
