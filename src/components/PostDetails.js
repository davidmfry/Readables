import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {fetchPost, deletePost, fetchComments} from "../actions/actions_index";

import Comment from './Comment';

class PostDetails extends Component
{
    componentWillMount()
    {
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
        this.props.fetchComments(id);
    }

    onDeleteHandler()
    {
        const { id } = this.props.match.params;
        this.props.deletePost(id,  () => {
            // Sends the user back to the home page after the new post has been add to the DB
            this.props.history.push('/');
        });
    }

    renderComments()
    {
        return this.props.comments.map( (comment) => {
            return <Comment key={comment.id} author={comment.author} body={comment.body} />
        });
    }
    render() {
        const { post } = this.props;

        // Checks if post is undefined.  If it is undefined then the app will crash.
        // This is also a check to make sure the data has come from the api before reading the actual component
        if (!this.props.post)
        {
            return <div>Loading...</div>
        }
        else if (!this.props.comments)
        {
            return <div>Loading...</div>
        }
        else
        {
            return (
                <div>
                    <div className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <Link to="/" className="button is-primary">Back to post index</Link>
                            </div>
                        </div>

                        <div className="level-right">
                            <div className="level-item">
                                <button
                                    className="button is-danger"
                                    onClick={this.onDeleteHandler.bind(this)}
                                >
                                    Delete Post
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1 className="title">{post.title}</h1>
                        <h3 className="title">{post.author}</h3>
                        <p>{post.body}</p>
                    </div>

                    <div>
                        <h4 className="title is-4">Comments</h4>
                        {this.renderComments()}
                    </div>
                </div>
            );
        }

    }
}

function mapStateToProps({ postState }, ownProps)
{
    return {
        post: postState.currentPost,
        comments: postState.comments
    };
}

export default connect(mapStateToProps, {fetchPost, fetchComments,deletePost})(PostDetails);
