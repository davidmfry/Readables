import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchPosts, fetchCategories } from "./actions/actions_index";

import 'bulma/css/bulma.css'
import './App.css';


class App extends Component
{
    componentDidMount()
    {
        this.props.fetchPosts();
        this.props.fetchCategories();

    }

    renderPosts()
    {
        // Check for an empty object before calling the map function
        if (Object.keys(this.props.posts).length === 0)
        {
            console.log('empty array')
        }
        else
        {
            return this.props.posts.map(
                (post) => <li key={post.id}>{post.title}</li>)
        }
    }



    renderCategories()
    {
        // Check for an empty object before calling the map function
        if (Object.keys(this.props.categories).length === 0) {
            console.log('empty array')
        }
        else
        {
            return this.props.categories.map(
                (category) => <li key={category.path}>{category.name}</li>)
        }
    }



        render() {
    return (
      <div className="App container">
        <h1>Home</h1>
          <ul>
              {this.renderCategories()}
          </ul>

          <ul>
              {this.renderPosts()}
          </ul>

          <a className="button is-dark">Dark</a>

      </div>
    );
  }
}

function mapStateToProps(state)
{
    return {
        posts: state.postState,
        categories: state.categoriesState
    }
}


export default connect(mapStateToProps, {fetchPosts, fetchCategories})(App)
