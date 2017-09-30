import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPosts, fetchCategories, fetchPostsInCategory, fetchPostsByTimeStamp, fetchPostsByVote } from "../actions/actions_index";

//Components
import Post from '../components/Post'


class AllPosts extends Component
{
    componentDidMount()
    {
        this.props.fetchPosts();
        this.props.fetchCategories();

    }

    renderPosts()
    {
        const { posts } = this.props.posts;
        return posts.map(
                (post) => <Post key={post.id}
                                id={post.id}
                                title={post.title}
                                body={post.body}
                                author={post.author}
                                category={post.category}
                                voteScore={post.voteScore}
                                time={post.timestamp}
                />)


    }

    handleOnClickCategoryButton(categoryName)
    {
        this.props.fetchPostsInCategory(categoryName);
    }

    handleOnClickSortByTimestamp()
    {
        this.props.fetchPostsByTimeStamp();
    }

    handleOnClickSortByVote()
    {
        this.props.fetchPostsByVote();
    }

    renderCategories()
    {
        return this.props.categories.map( (category) => {
            return <Link to={`/posts/category/${category.path}`} key={category.name} onClick={ () => { this.handleOnClickCategoryButton(category.name)}} className="button is-primary smallSpaceLeft">{category.name}</Link>
        })
    }



    render() {

        const { posts } = this.props.posts;

        if (!posts)
        {
            return <div>Loading...</div>
        }
        return (
            <div  className="block">
                <div className="is-right">

                </div>
                <h1 className="title">Post Index</h1>
                <div className="columns">
                    <div className="column">
                        <Link to="/" className="button is-primary">All Posts</Link>
                        {this.renderCategories()}
                        <Link className="button is-info smallSpaceLeft" to="/posts/new" onClick={() => { console.log("clicked" +
                            " the link")}}>
                            Add a Post
                        </Link>
                    </div>
                    <div className="column">
                        <button className="button is-outlined" onClick={this.handleOnClickSortByTimestamp.bind(this)}>Sort By Time</button>
                        <button className="button is-outlined smallSpaceLeft" onClick={this.handleOnClickSortByVote.bind(this)}>Sort By Vote</button>
                    </div>

                </div>

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


export default connect(mapStateToProps, {fetchPosts, fetchCategories, fetchPostsInCategory, fetchPostsByTimeStamp, fetchPostsByVote})(AllPosts)