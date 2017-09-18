import React from 'react';

function Comment(props)
{
    return (
        <div className="notification">
            <h6 className="title is-6">{props.author}</h6>
            <p>{props.body}</p>
        </div>

    );
}

export default Comment;
