import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {fetchPost} from "../actions/actions_index";

class PostDetails extends Component
{
    componentWillMount()
    {
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    render() {
        const { post } = this.props;

        // Checks if post is undefined.  If it is undefined then the app will crash.
        // This is also a check to make sure the data has come from the api before reading the actual component
        if (!post)
        {
            return <div>Loading...</div>
        }
        return (
            <div>
                <Link to="/">Back to post index</Link>
                <h1 className="title">{post.title}</h1>
                <h3 className="subtitle">{post.author}</h3>
                <p>{post.body}</p>
            </div>
        );
    }
}

function mapStateToProps({ postState }, ownProps)
{
    return { post: postState};
}

export default connect(mapStateToProps, {fetchPost})(PostDetails);
