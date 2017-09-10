import { combineReducers } from 'redux';

//Reducers
import PostReducer from './posts_reducer';

export const reducers = combineReducers({
    posts: PostReducer
});




