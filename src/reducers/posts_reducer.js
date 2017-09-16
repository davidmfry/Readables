import {FETCH_POST, FETCH_POSTS, FETCH_CATEGORIES ,DELETE_POST, ADD_VOTE, SUB_VOTE} from "../actions/actions_index";

export default function(state = {}, action)
{
    switch (action.type)
    {
        case FETCH_POSTS:
            return {...state, posts:action.payload.data};
        case FETCH_POST:
            return {...state, currentPost: action.payload.data};
        default:
            return state;
    }
}


// {...state, [action.payload.data.id]: action.payload.data };