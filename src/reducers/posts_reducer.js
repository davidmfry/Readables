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
            const data = action.payload.data.filter((post) => post.deleted === false)
                .sort( (element1, element2) => element2.voteScore - element1.voteScore);
            return {...state, posts:data};
        case FETCH_POST:
            return {...state, currentPost: action.payload.data};
        case FETCH_COMMENTS:
            const commentData = action.payload.data.filter( (comment) => comment.deleted == false)
                .sort( (element1, element2) => element2.voteScore - element1.voteScore);
            return {...state, comments: commentData};
        case FETCH_POSTS_IN_CATEGORY:
            const postCategoryData = action.payload.data.filter((post) => post.deleted === false)
                .sort( (element1, element2) => element2.voteScore - element1.voteScore);
            return {...state, posts: postCategoryData}
        case POST_VOTE:
            return state;
        case COMMENT_VOTE:
            return state;
        default:
            return state;
    }
}

function sortHighToLow(element1, element2)
{
    return element2 - element1;
}

// {...state, [action.payload.data.id]: action.payload.data };