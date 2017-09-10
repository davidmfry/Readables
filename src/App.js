import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from "./actions/actions_index";

import './App.css';


class App extends Component
{
    componentDidMount()
    {
        this.props.fetchPosts();
    }

    renderPosts()
    {

        //return this.props.posts.map( (post) => <li key={post.id}>{post.title}</li>)
    }

  render() {
    return (
      <div className="App">
        <h1>Home</h1>
          <ul>
              {this.renderPosts()}
          </ul>
      </div>
    );
  }
}

function mapStateToProps(state)
{
    return {
        posts: state.posts
    }
}


export default connect(mapStateToProps, {fetchPosts})(App)
