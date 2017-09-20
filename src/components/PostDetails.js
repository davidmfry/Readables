import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {fetchPost, deletePost, fetchComments} from "../actions/actions_index";

import Comment from './Comment';
import NewComment from './NewComment'

class PostDetails extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            showNewComment: false,
            parentId: this.props.match.params
        };
        // makes sure this stays in context of PostDetails when hideComment is called from another component
        this.hideComment = this.hideComment.bind(this);
    }

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

    onHandleMakeComment()
    {
        this.setState({showNewComment: true});
    }

    hideComment()
    {
        const { id } = this.props.match.params;

        // This is called from <NewComment/>
        this.setState({showNewComment: false});
        this.props.fetchComments(id);
    }
    renderComments()
    {
        return this.props.comments.map( (comment) => {
            return <Comment key={comment.id} author={comment.author} body={comment.body} />
        });
    }
    render() {
        const { post } = this.props;
        const { id } = this.props.match.params;


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
                                <Link to={`/posts/edit/${id}`} className="button is-warning">Edit Post</Link>
                            </div>
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

                    <div className="comment-btn">
                        <button className="button is-info"  onClick={this.onHandleMakeComment.bind(this)}>Make Comment</button>
                    </div>

                    { this.state.showNewComment ? <NewComment id={id} hideComment={this.hideComment}/> : null}

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

export default connect(mapStateToProps, {fetchPost, fetchComments, deletePost})(PostDetails);
