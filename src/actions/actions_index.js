import axios from 'axios';
import * as utils from '../utilis'

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const FETCH_CATEGORIES = 'fetch_categories';
export const FETCH_COMMENTS = 'fetch_comments';
export const CREATE_NEW_POST = 'create_new_post';
export const DELETE_POST = "delete_post";
export const ADD_VOTE = "add_vote";
export const SUB_VOTE = "sub_vote";



// Might need to changes this to localhost:#PORT
const BASE_URL = 'http://192.168.1.14:5001';
const header = { headers: {'Authorization': 'anything'} };

export function fetchPosts()
{
    let data = null;
    const request = axios.get(`${BASE_URL}/posts`, header);

    return {
        type: FETCH_POSTS,
        payload: request
    }
}

export function fetchPost(id)
{
    const request = axios.get(`${BASE_URL}/posts/${id}`, header);

    return {
        type: FETCH_POST,
        payload: request

    }
}

export function fetchCategories()
{
    const request = axios.get(`${BASE_URL}/categories`, header);

    return {
        type: FETCH_CATEGORIES,
        payload: request
    }
}

export function fetchComments(id)
{
    const request = axios.get(`${BASE_URL}/posts/${id}/comments`, header);

    return {
        type: FETCH_COMMENTS,
        payload: request
    }
}

export function createNewPost(values, callback)
{
    values.id = utils.createRandomId(10);
    values.timestamp = Date.now();
    const request = axios.post(`${BASE_URL}/posts`, values, header).then( () => callback());

    return {
        type: CREATE_NEW_POST,
        payload: request
    }
}

export function deletePost(id, callback)
{
    const request = axios.delete(`${BASE_URL}/posts/${id}`, header).then(() => callback());
    return{
        type: DELETE_POST,
        payload: id
    }
}