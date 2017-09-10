import axios from 'axios';

export const FETCH_POSTS = "fetch_posts";
export const FETCH_POST = "fetch_post";
export const DELETE_POST = "delete_post";
export const ADD_VOTE = "add_vote";
export const SUB_VOTE = "sub_vote";



const BASE_URL = 'http://192.168.1.14:5001';
const header = { headers: {'Authorization': 'anything'} };

export function fetchPosts()
{
    const request = axios.get(`${BASE_URL}/posts`, header);

    // const request = () => fetch('/<mycategory>/posts', { headers: { 'AuthorizationReactND': 'whatever-you-want' }})
    //     .then(res => res.json())
    let data = request.then( (data) => {
        return data.data
    });

    return {
        type: FETCH_POSTS,
        payload: data
    }
}