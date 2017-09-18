import {FETCH_POST, FETCH_POSTS, FETCH_COMMENTS, FETCH_CATEGORIES ,DELETE_POST, ADD_VOTE, SUB_VOTE} from "../actions/actions_index";

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
        default:
            return state;
    }
}


// {...state, [action.payload.data.id]: action.payload.data };