import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
//Middleware
import logger from "redux-logger";
import thunk from 'redux-thunk';
import promise from 'redux-promise';

//Reducers
import { reducers } from "./reducers/reducers_index";

//Component
import NewPost from './components/NewPost'
import PostDetails from './components/PostDetails'

import 'bulma/css/bulma.css'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AllPosts from "./components/AllPosts";



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
                    <Route path="/posts/new" component={NewPost}/>
                    <Route path="/posts/:id" component={PostDetails}/>
                    <Route path="/" component={AllPosts}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();



