import * as React from 'react'

import { PrivateRoute } from './PrivateRoute';
import Login from './components/Login/Login';
import PrimarySearchAppBar from './components/Navigation/NavBar';
import GroupsHome from './components/Groups/GroupsHome';
import GroupPage from './components/Groups/GroupPage';


const Main: React.StatelessComponent = () => {
    document.title = 'Booky'
    return (
        <div>
            <PrimarySearchAppBar />
            <PrivateRoute exact path="/login" componentToRender={Login} />
            <PrivateRoute exact path="/" componentToRender={GroupsHome} />      
            <PrivateRoute exact path="/groups/:groupId" componentToRender={GroupPage} />
        </div>
    )
}


export default Main
