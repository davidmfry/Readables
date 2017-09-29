import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Switch } from 'react-router-dom';

//Middleware
import thunk from 'redux-thunk';
import promise from 'redux-promise';

//Reducers
import { reducers } from "./reducers/reducers_index";

//Component
import NewPost from './components/NewPost'
import PostDetails from './components/PostDetails'
import AllPosts from "./components/AllPosts";
import EditPost from './components/EditPost';
import CategoryPost from './components/CategoryPosts';
import NoMatch from './components/NoMatch';

import 'bulma/css/bulma.css'
import './index.css';
import registerServiceWorker from './registerServiceWorker';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,
    composeEnhancers(
        applyMiddleware(thunk, promise)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div className="container">
                <Switch>
                    <Route path="/posts/category/:category" component={CategoryPost}/>
                    <Route path="/posts/new" component={NewPost}/>
                    <Route path="/posts/edit/:id" component={EditPost}/>
                    <Route path="/posts/:category/:id" component={PostDetails}/>
                    <Route path="/" component={AllPosts}/>
                    <Route component={NoMatch}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();



