import {
    FETCH_POST,
    FETCH_POSTS,
    FETCH_COMMENTS,
    FETCH_POSTS_IN_CATEGORY,
    POST_VOTE,
    COMMENT_VOTE} from "../actions/actions_index";

export default function(state = {}, action)
{
    switch (action.type)
    {
        case FETCH_POSTS:
            const data = action.payload.data.filter((post) => post.deleted === false);
            return {...state, posts:data};
        case FETCH_POST:
            return {...state, currentPost: action.payload.data};
        case FETCH_COMMENTS:
            return {...state, comments: action.payload.data};
        case FETCH_POSTS_IN_CATEGORY:
            return {...state, posts: action.payload.data}
        case POST_VOTE:
            return state;
        case COMMENT_VOTE:
            return state;
        default:
            return state;
    }
}


// {...state, [action.payload.data.id]: action.payload.data };