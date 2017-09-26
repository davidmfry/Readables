import React, {Component} from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postVote, fetchPosts, fetchComments } from "../actions/actions_index";

import moment from 'moment';

import * as utils from '../utilis';

class Post extends Component
{
    constructor(props)
    {
        super(props);
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
        this.props.upVote(this.props.id, this.props.voteScore, "upVote", "post");
        this.props.fetchPosts();
    }

    onClickHandlerDownVote()
    {
        this.props.upVote(this.props.id, this.props.voteScore, "downVote", "post");
        this.props.fetchPosts();
    }

    render() {
        const id = `/posts/${this.props.id}`;
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



                {/*<div className="box">*/}
                {/*<h1 className="title"><Link to={id}>{props.title}</Link></h1>*/}
                {/*<p>{props.body}</p>*/}
                {/*<nav className="level">*/}
                {/*<div className="level-left">*/}
                {/*<p className="level-item"><strong>Votes: </strong> {props.voteScore} </p>*/}
                {/*</div>*/}
                {/*<div className="level-right">*/}
                {/*<p className="level-item"><strong>Author: </strong>  {props.author}</p>*/}
                {/*<p className="level-item"><strong>Category: </strong>  {props.category}</p>*/}
                {/*</div>*/}
                {/*</nav>*/}
                {/*</div>*/}

                {/*<div className="message">*/}
                {/*<div className="message-header">*/}
                {/*{props.title}*/}
                {/*</div>*/}
                {/*<div className="message-body">*/}
                {/*{props.body}*/}
                {/**/}
                {/*</div>*/}
                {/*</div>*/}

            </div>


        );
    }
}

export default connect(null, {upVote: postVote, fetchPosts, fetchComments})(Post);


