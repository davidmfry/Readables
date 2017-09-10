import {FETCH_POST, FETCH_POSTS, DELETE_POST, ADD_VOTE, SUB_VOTE} from "../actions/actions_index";

export default function(state ={}, action)
{
    switch (action.type)
    {
        case FETCH_POSTS:
            return action.payload;
        default:
            return state;
    }
}