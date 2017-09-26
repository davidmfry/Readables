import axios from 'axios';
import * as utils from '../utilis'

import {BASE_URL, header} from '../appVaribles'

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const FETCH_POSTS_BY_TIMESTAMP = 'fetch_posts_by_timestamp';
export const FETCH_POSTS_BY_VOTE = 'fetch_posts_by_vote';
export const FETCH_POSTS_IN_CATEGORY = 'fetch_posts_in_category';
export const FETCH_CATEGORIES = 'fetch_categories';
export const FETCH_COMMENTS = 'fetch_comments';
export const CREATE_NEW_POST = 'create_new_post';
export const EDIT_POST = 'edit_post';
export const EDIT_COMMENT = 'edit_comment';
export const CREATE_NEW_COMMENT = 'create_new_comment';
export const DELETE_POST = "delete_post";
export const POST_VOTE = "post_vote";
export const COMMENT_VOTE = "down_vote";



// Might need to changes this to localhost:#PORT
// const BASE_URL = 'http://192.168.1.9:5001';
// const header = { headers: {'Authorization': 'anything'} };

export function fetchPosts()
{
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

export function fetchPostsByTimeStamp()
{
    const request = axios.get(`${BASE_URL}/posts`, header);
    return {
        type: FETCH_POSTS_BY_TIMESTAMP,
        payload: request
    }
}

export function fetchPostsByVote()
{
    const request = axios.get(`${BASE_URL}/posts`, header);
    return {
        type: FETCH_POSTS_BY_VOTE,
        payload: request
    }
}

export function fetchPostsInCategory(category)
{
    const request = axios.get(`${BASE_URL}/${category}/posts`, header);
    return {
        type: FETCH_POSTS_IN_CATEGORY,
        payload: request,
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
    let categoryLower = values.category.toLowerCase();
    values.id = utils.createRandomId(10);
    values.timestamp = Date.now();
    values.category = categoryLower;
    const request = axios.post(`${BASE_URL}/posts`, values, header).then( () => callback());

    return {
        type: CREATE_NEW_POST,
        payload: request
    }
}

export function editPost(values, id , callback)
{
    values.timestamp = Date.now();
    const request = axios.put(`${BASE_URL}/posts/${id}`, values, header).then( () => callback());

    return {
        type: EDIT_POST,
        payload: request
    }

}

export function editComment(values, id, callback)
{

    values.timestamp = Date.now();
    const request = axios.put(`${BASE_URL}/comments/${id}`, values, header).then( () => callback());

    return {
        type: EDIT_COMMENT,
        payload: id
    }
}

export function createComment(id, values, callback)
{
    values.id = utils.createRandomId(10);
    values.parentId = id;
    values.timestamp = Date.now();

    const request = axios.post(`${BASE_URL}/comments`, values, header).then( () => callback());
    console.log(request.data);

    return {
        type: CREATE_NEW_COMMENT,
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

export function deleteComment(id, callback)
{
    const request = axios.delete(`${BASE_URL}/comments/${id}`, header).then(() => callback());
    return{
        type: DELETE_POST,
        payload: id
    }
}



export function postVote(id, currentVoteScore, voteCondition)
{
    let value = {};
    switch (voteCondition)
    {
        case "upVote":
            value = {voteScore: currentVoteScore + 1};
            break;
        case "downVote":
            value = {voteScore: currentVoteScore - 1};
            break;
        default:
            break;
    }

    const request = axios.put(`${BASE_URL}/posts/${id}`,value, header);

    return{
        type: POST_VOTE,
        payload: id
    }
}

export function commentVote(id, currentVoteScore, voteCondition)
{
    let value = {};
    switch (voteCondition)
    {
        case "upVote":
            value = {voteScore: currentVoteScore + 1};
            break;
        case "downVote":
            value = {voteScore: currentVoteScore - 1};
            break;
        default:
            break;

    }

    const request = axios.put(`${BASE_URL}/comments/${id}`,value, header);

    return{
        type: COMMENT_VOTE,
        payload: id
    }
}