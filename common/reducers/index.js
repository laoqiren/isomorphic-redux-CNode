import {combineReducers} from 'redux';
import {
    SELECT_AUTHOR, INVALIDATE_POSTS,
  REQUEST_POSTS, RECEIVE_POSTS,FETCH_ITEM,LOG_IN,LOG_OUT,RECEIVE_USER
} from '../actions/actions';

function selectedAuthor(state="all",action){
    switch(action.type){
        case SELECT_AUTHOR:
            return action.author;
        default:
            return state;
    }
}
function user(state={ },action){
    switch(action.type){
        case LOG_IN:
            return action.user;
        case LOG_OUT:
            return {};
        case RECEIVE_USER:
            return action.user;
        default:
            return state;
    }
}
function item(state={
    title: '无',
    content: '该文章为空'
},action){
    switch(action.type){
        case FETCH_ITEM:
            return action.item
        default:
            return state
    }
}
function posts(state={
    isFetching: false,
    didInvalidate: false,
    items: []
},action){
    switch(action.type){
        case INVALIDATE_POSTS:
            return Object.assign({},state,{
                didInvalidate: true
            })
        case REQUEST_POSTS:
            return Object.assign({},state,{
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_POSTS:
            return Object.assign({},state,{
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receivedAt
            })
        default:
            return state;
    }
}

function postsByAuthor(state={},action){
    switch(action.type){
        case INVALIDATE_POSTS:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return Object.assign({},state,{
                [action.author]: posts(state[action.author],action)
            },{
                all: posts(state[action.author],action)
            })
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    postsByAuthor,
    selectedAuthor,
    item,
    user
})

export default rootReducer;