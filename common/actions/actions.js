import fetch from 'isomorphic-fetch'
export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const INVALIDATE_POSTS = 'INVALIDATE_POSTS'
export const SELECT_AUTHOR = 'SELECT_AUTHOR'
export const FETCH_ITEM = 'FETCH_ITEM'

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
    if(!(author in state.postsByAuthor)){
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
        posts: json.posts,
        receivedAt: Date.now()
    }
}
function fetchPosts(author){
    return dispatch=>{
        dispatch(requestPosts(author))
        return fetch('http://localhost:3000/api/list?author=${author}')
            .then(response=>response.json())
            .then(json=>dispatch(receivePosts(author,json)))
    }
}
export function fetchPostsIfNeeded(author){
    return (dispatch,getState) => {
        if(shouldFetchPosts(getState(),author)){
            console.log('拉取啊啊啊啊')
            return dispatch(fetchPosts(author))
        }
    }
}