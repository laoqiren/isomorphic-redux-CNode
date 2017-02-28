import fetch from 'isomorphic-fetch'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const INVALIDATE_POSTS = 'INVALIDATE_POSTS'
export const SELECT_AUTHOR = 'SELECT_AUTHOR'
export const FETCH_ITEM = 'FETCH_ITEM'
export const RECEIVE_USER = 'RECEIVE_USER'
export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'

function recieveUser(user){
    return {
        type: RECEIVE_USER,
        user
    }
}
export function fetchUser(){
    const token = localStorage.getItem('token');
    if(!token){
        return (dispatch)=>{
            return dispatch(recieveUser({}))
        }
    }
    return (dispatch)=>{
        const content = JSON.stringify({
                access_token: token
            })
        return fetch('/api/user',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json",
                "Content-Length": content.length.toString()
            },
            body: content
        }).then(res=>{
            if(res.ok){
                return res.json();
            } else {
                console.log('获取用户失败')
            }
        }).then(json=>{
            dispatch(recieveUser(json))
        })
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
        return fetch(`/api/detail/?id=${id}`)
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
        return fetch(`/api/post?author=${author}`)
            .then(response=>response.json())
            .then(json=>dispatch(receivePosts(author,json)))
    }
}
export function fetchPostsIfNeeded(author){
    return (dispatch,getState) => {
        if(shouldFetchPosts(getState(),author)){
            return dispatch(fetchPosts(author))
        }
    }
}