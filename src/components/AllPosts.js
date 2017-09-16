import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPosts, fetchCategories } from "../actions/actions_index";

//Components
import Post from './Post'


class AllPosts extends Component
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
                (post) => <Post key={post.id} title={post.title} body={post.body} author={post.author} category={post.category}/>)
        }
        // return this.props.posts.map(
        //         (post) => <Post key={post.id} title={post.title} body={post.body} author={post.author} category={post.category}/>)


    }



    renderCategories()
    {
        //Check for an empty object before calling the map function
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

        // if (Object.keys(this.props.posts).length === 0)
        // {
        //     console.log("in loading");
        //     return <div>Loading...</div>
        // }
        return (
            <div  className="block">
                <div className="is-right">
                    <Link className="button is-info" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <h1 className="title">Home</h1>
                <ul>
                    {this.renderCategories()}
                </ul>

                <div className="block">
                    {this.renderPosts()}
                </div>
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


export default connect(mapStateToProps, {fetchPosts, fetchCategories})(AllPosts)