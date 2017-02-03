import {createStore,applyMiddleware,compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducerApp from '../common/reducers/index';
//import DevTools from '../client/devTools';
import { composeWithDevTools } from 'redux-devtools-extension';


 //const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 /*
export default function(initState){
    return createStore(
        reducerApp,
        initState,
        applyMiddleware(
            thunkMiddleware
        )
        
    );
}*/

export default function(initState){
    
    return createStore(reducerApp,initState,composeWithDevTools(
        applyMiddleware(thunkMiddleware)
    ))
}
