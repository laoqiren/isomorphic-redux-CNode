import fetch from 'isomorphic-fetch'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const INVALIDATE_POSTS = 'INVALIDATE_POSTS'
export const SELECT_AUTHOR = 'SELECT_AUTHOR'
export const FETCH_ITEM = 'FETCH_ITEM'
export const FETCH_USER = 'FETCH_USER'
export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'

export function fetchUser(user){
    return {
        type: FETCH_USER,
        user
    }
}
export function logIn(user){
    return {
        type: LOG_IN,
        user
    }
}
export function logOut(){
    return {
        type: LOG_OUT
    }
}
function receiveItem(json){
    return {
        type: FETCH_ITEM,
        item: json.data
    }
}
export function selectAuthor(author){
    return {
        type: SELECT_AUTHOR,
        author
    }
}
export function fetchItem(id){
    return dispatch=>{
        return fetch(`http://localhost:3000/api/detail/?id=${id}`)
        .then(res=>{
            return res.json()
        })
        .then(json=>{
            dispatch(receiveItem(json))
        })
    }
}
export function invalidatePosts(author){
    return {
        type: INVALIDATE_POSTS,
        author
    }
}

function shouldFetchPosts(state,author){
    if(!state.postsByAuthor[author]){
        console.log('hey, I am heare')
        return true;
    } else {
        const posts = state.postsByAuthor[author];
        if(posts.isFetching) {
            return false;
        } else {
            return posts.didInvalidate;
        }
    }
}
function requestPosts(author){
    return {
        type: REQUEST_POSTS,
        author
    }
}
function receivePosts(author,json){
    return {
        type: RECEIVE_POSTS,
        author,
        posts: json,
        receivedAt: Date.now()
    }
}
function fetchPosts(author){
    return dispatch=>{
        dispatch(requestPosts(author))
        return fetch(`http://localhost:3000/api/post?author=${author}`)
            .then(response=>response.json())
            .then(json=>dispatch(receivePosts(author,json)))
    }
}
export function fetchPostsIfNeeded(author){
    return (dispatch,getState) => {
        if(shouldFetchPosts(getState(),author)){
            console.log('我在拉取啊啊啊啊')
            return dispatch(fetchPosts(author))
        }
    }
}