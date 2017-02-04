import React from 'react';
import {Route,IndexRoute} from 'react-router';
import App from '../common/components/App';
import Item from '../common/components/Item';
import List from '../common/components/List';
import Publish from '../common/components/Publish';
import Space from '../common/components/Space';
const routes = (
    <Route path="/" component={App}>
            <IndexRoute path="/list" component={List}/>
            <Route path="/item/:id" component={Item}/>
            <Route path="/space" component={Space}/>
    </Route>
    );

export default routes;