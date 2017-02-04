import React from 'react';
import {Route,IndexRoute} from 'react-router';
import App from '../common/components/App';
import Item from '../common/components/Item';
import List from '../common/components/List';
import Publish from '../common/components/Publish';
import Space from '../common/components/Space';
import LogIn from '../common/components/LogIn';
import Reg from '../common/components/Reg';
const routes = (
    <Route path="/" component={App}>
            <IndexRoute component={List}/>
            <Route path="/item/:id" component={Item}/>
            <Route path="/space" component={Space}/>
            <Route path="/publish" component={Publish}/>
            <Route path="/logIn" component={LogIn}/>
            <Route path="/reg" component={Reg}/>
    </Route>
    );

export default routes;