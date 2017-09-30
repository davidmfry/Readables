import React from 'react';
import { Link } from 'react-router-dom';


function NoMatch() {
    return (
        <div>
            <h1 className="is-size-1 ">404: Sorry cant find that page. Try again</h1>
            <Link className="button is-primary" to="/">Return to the Index</Link>
        </div>
    );
}

export default NoMatch;
