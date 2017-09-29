import React, {Component} from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postVote, fetchPosts, fetchComments, fetchPostsInCategory } from "../actions/actions_index";

import moment from 'moment';

import * as utils from '../utilis';

class Post extends Component
{
    constructor(props)
    {
        super(props);
        // Used to store the comment count for the post
        this.state = {
            commentCount: 0
        }
    }
    componentDidMount()
    {
        utils.getCommentCount(this.props.id, (response) => {
            this.setState({commentCount:response.length})
        })
    }
    onClickHandlerUpVote()
    {
        // Checks if the user has navigated to the category view and then re-renders the view with the same category
        // posts
        if(this.props.categoryView)
        {
            this.props.upVote(this.props.id, this.props.voteScore, "upVote", "post");
            this.props.fetchPostsInCategory(this.props.categoryView)
        }
        else
        {
            this.props.upVote(this.props.id, this.props.voteScore, "upVote", "post");
            this.props.fetchPosts();
        }

    }

    onClickHandlerDownVote()
    {
        // Checks if the user has navigated to the category view and then re-renders the view with the same category
        // posts
        if(this.props.categoryView)
        {
            this.props.upVote(this.props.id, this.props.voteScore, "downVote", "post");
            this.props.fetchPostsInCategory(this.props.categoryView)
        }
        else
        {
            this.props.upVote(this.props.id, this.props.voteScore, "downVote", "post");
            this.props.fetchPosts();
        }
    }

    render() {
        const id = `/posts/${this.props.category}/${this.props.id}`;
        let time = moment(this.props.time);

        return (
            <div>
                <div className="box">
                    <div className="media">
                        <div className="media-left">
                            <i onClick={this.onClickHandlerUpVote.bind(this)} className="fa fa-arrow-up" aria-hidden="true"></i>
                            <p>{ this.props.voteScore }</p>
                            <i onClick={this.onClickHandlerDownVote.bind(this)} className="fa fa-arrow-down" aria-hidden="true"></i>
                        </div>
                        <div className="media-content">
                            <div className="content ">

                                <h1 className="title"><Link to={id}>{this.props.title}</Link></h1>
                                <div className="level">
                                    <div className="level-left">
                                        <div className="level-item">
                                            <strong>{this.props.author}</strong>
                                        </div>
                                        <div className="level-item">
                                            <small>{time.format('llll')}</small>
                                        </div>
                                        <div className="level-item">

                                        </div>
                                    </div>

                                    <div className="level-right">
                                        <div className="level-item">
                                            <span>Category: {this.props.category}</span>
                                        </div>
                                        <div className="level-item">
                                            <span> Comments: {this.state.commentCount}</span>
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    {this.props.body}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, {upVote: postVote, fetchPosts, fetchComments, fetchPostsInCategory})(Post);


