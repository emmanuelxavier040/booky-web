import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main';
import * as serviceWorker from './serviceWorker';
import { Router } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { reducers, IAppReducer } from './reducers/reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import createBrowserHistory from './history';

export const store = createStore<IAppReducer, any, any, any>(reducers)

console.log = function() {}

ReactDOM.render((
    <Provider store={store}>
        <Router history={createBrowserHistory}>
            <Main />
        </Router>
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
