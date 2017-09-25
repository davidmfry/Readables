import React, {Component} from 'react';
import { connect } from 'react-redux';
import { commentVote, fetchComments, fetchPost, deleteComment } from "../actions/actions_index";
import moment from 'moment';

import EditComment from './EditComment';

class Comment extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            showEditComment: false
        }

    }

    onClickHandlerUpVote()
    {
        this.props.commentVote(this.props.id, this.props.voteScore, "upVote");
        this.props.fetchComments(this.props.postId);
        this.props.fetchPost(this.props.postId);
        console.log(this.props.postId);
    }

    onClickHandlerDownVote()
    {
        this.props.commentVote(this.props.id, this.props.voteScore, "downVote");
        this.props.fetchComments(this.props.postId);
        this.props.fetchPost(this.props.postId);
    }

    onEditHandler()
    {
        this.setState({showEditComment: true})
    }

    onDeleteHandler()
    {
        this.props.deleteComment(this.props.id,  () => {
            // Re-renders the page to show the comment has been removed
            this.props.fetchComments(this.props.postId);
            this.props.fetchPost(this.props.postId);
        });
    }

    hideEditComment()
    {
        this.setState({showEditComment: false})
    }

    render()
    {
        let time = moment(this.props.time);
        console.log( "In comments: " + this.state)
        return (

            <div className="box">
                <div className="media">
                    <div className="media-left">
                        <i onClick={this.onClickHandlerUpVote.bind(this)} className="fa fa-arrow-up" aria-hidden="true"></i>
                        <p>{ this.props.voteScore }</p>
                        <i onClick={this.onClickHandlerDownVote.bind(this)} className="fa fa-arrow-down" aria-hidden="true"></i>
                    </div>
                    <div className="media-content">
                        <div className="content ">
                            <p>
                                <strong>{this.props.author}</strong> <small>{time.format('llll')}</small>
                                <br/>
                                {this.props.body}

                            </p>
                            { this.state.showEditComment ? <EditComment
                                                                id={this.props.id}
                                                                author={this.props.author}
                                                                body={this.props.body}
                                                                hideEditComment={this.hideEditComment.bind(this)}/> : null}

                            {this.state.showEditComment ? <div> </div> : <div className="level">
                                <div className="level-left"></div>
                                <div className="level-right">
                                    <div className="level-item">
                                        <button className="button is-warning is-small" onClick={this.onEditHandler.bind(this)}>Edit</button>
                                    </div>
                                    <div className="level-item">
                                        <button className="button is-danger is-small" onClick={this.onDeleteHandler.bind(this)}>Delete</button>
                                    </div>
                                </div>
                            </div>}


                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default connect(null, { commentVote, fetchComments, fetchPost, deleteComment })(Comment);

