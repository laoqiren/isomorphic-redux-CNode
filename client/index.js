import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router,Route,browserHistory} from 'react-router';
import counterApp from '../common/reducers';
import storeApp from '../common/configStore';
import routesApp from '../common/routes';
const initState = window.__INITIAL_STATE__;

const store = storeApp(initState);

ReactDOM.render(
    <Provider store={store}>
       <Router history={browserHistory}>
        {routesApp}
       </Router>
    </Provider>,
    document.getElementById('container'));