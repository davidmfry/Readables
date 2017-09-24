import React, {Component} from 'react';
import { connect } from 'react-redux';
import { commentVote, fetchComments, fetchPost } from "../actions/actions_index";
import moment from 'moment';


class Comment extends Component
{
    onClickHandlerUpVote()
    {
        this.props.commentVote(this.props.id, this.props.voteScore, "upVote");
        this.props.fetchComments(this.props.postId);
        this.props.fetchPost(this.props.postId)
        console.log(this.props.postId)
    }

    onClickHandlerDownVote()
    {
        this.props.commentVote(this.props.id, this.props.voteScore, "downVote");
        this.props.fetchComments(this.props.postId);
        this.props.fetchPost(this.props.postId)
    }
    render()
    {
        let time = moment(this.props.time);

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
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default connect(null, { commentVote, fetchComments, fetchPost })(Comment);

