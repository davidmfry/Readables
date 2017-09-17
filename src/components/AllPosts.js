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
        // if (Object.keys(this.props.posts).length === 0)
        // {
        //     console.log('empty array')
        // }
        // else
        // {
        //     return this.props.posts.map(
        //         (post) => <Post key={post.id} title={post.title} body={post.body} author={post.author} category={post.category}/>)
        // }
        const { posts } = this.props.posts;
        return posts.map(
                (post) => <Post key={post.id}
                                id={post.id}
                                title={post.title}
                                body={post.body}
                                author={post.author}
                                category={post.category}/>)


    }

    renderCategories()
    {
        // return this.props.categories.map(
        //     (category) => <li key={category.path}>{category.name}</li>)

        //console.log(this.props.categories[0])
        return this.props.categories.map( (category) => {
            return <li key={category.name}>{category.name}</li>
        })
    }



    render() {

        const { posts } = this.props.posts;
        if (!posts)
        {
            console.log("in loading");
            return <div>Loading...</div>
        }

        return (
            <div  className="block">
                <div className="is-right">
                    <Link className="button is-info" to="/posts/new" onClick={() => { console.log("clicked the link")}}>
                        Add a Post
                    </Link>
                </div>
                <h1 className="title">Post Index</h1>
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