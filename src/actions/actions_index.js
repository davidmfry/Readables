import axios from 'axios';

export const FETCH_POSTS = "fetch_posts";
export const FETCH_POST = "fetch_post";
export const FETCH_CATEGORIES = 'fetch_categories';
export const DELETE_POST = "delete_post";
export const ADD_VOTE = "add_vote";
export const SUB_VOTE = "sub_vote";



const BASE_URL = 'http://192.168.1.14:5001';
const header = { headers: {'Authorization': 'anything'} };

export function fetchPosts()
{
    const request = axios.get(`${BASE_URL}/posts`, header);

    return {
        type: FETCH_POSTS,
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