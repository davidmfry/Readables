import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {fetchPost, deletePost} from "../actions/actions_index";

class PostDetails extends Component
{
    componentWillMount()
    {
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeleteHandler()
    {
        const { id } = this.props.match.params;
        this.props.deletePost(id,  () => {
            // Sends the user back to the home page after the new post has been add to the DB
            this.props.history.push('/');
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


                <h1 className="title">{post.title}</h1>
                <h3 className="subtitle">{post.author}</h3>
                <p>{post.body}</p>
            </div>
        );
    }
}

function mapStateToProps({ postState }, ownProps)
{
    return { post: postState.currentPost};
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostDetails);
