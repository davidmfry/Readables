import { combineReducers } from 'redux';

//Reducers
import PostReducer from './posts_reducer';
import CategoriesReducer from './categories_reducer'

export const reducers = combineReducers({
    postState: PostReducer,
    categoriesState: CategoriesReducer
});




