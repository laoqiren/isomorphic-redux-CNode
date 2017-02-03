import React from 'react';
import {Route} from 'react-router';
import App from '../common/components/App';
import Item from '../common/components/Item';
const routes = (
    <Route path="/" component={App}>
            <Route path="/item/:id" component={Item}>
            </Route>
    </Route>
    );

export default routes;