import * as React from 'react'

import Home from './components/Home/Home';
import { PrivateRoute } from './PrivateRoute';
import Login from './components/Login/Login';
import PrimarySearchAppBar from './components/Navigation/NavBar';


const Main: React.StatelessComponent = () => {
    document.title = 'Booky'
    return (
        <div>
            <PrimarySearchAppBar />            
            <PrivateRoute exact path="/" componentToRender={Home} />
            <PrivateRoute exact path="/login" componentToRender={Login} />
        </div>
    )
}


export default Main
