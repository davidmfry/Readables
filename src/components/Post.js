import React from 'react';

function Post(props)
{
    return (
        <div>
            <div className="box">
                <h1 className="title">{props.title}</h1>
                <p>{props.body}</p>
                <nav className="level">
                    <div className="level-left">
                        <p className="level-item"><strong>Author:</strong>  {props.author}</p>
                        <p className="level-item"><strong>Category:</strong>  {props.category}</p>
                    </div>
                </nav>
            </div>

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

export default Post;
