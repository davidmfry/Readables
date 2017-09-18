import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { createComment } from "../actions/actions_index";


class NewComment extends Component
{
    renderTextField(field)
    {
        const { meta: { touched, error } } = field;
        const inputError = `input ${touched && error ? 'is-danger' : ''}`;
        const showErrorText = `${touched && error ? 'tag is-danger' : ''}`;

        return (
            <div className="field">
                <label className="label">{field.label}</label>
                <input
                    className={inputError}
                    type="text"
                    {...field.input}
                />
                <div className={showErrorText}>
                    {touched ? error : ' '}
                </div>

            </div>
        )
    }

    renderBodyField(field)
    {
        const { meta: { touched, error } } = field;
        const inputError = `textarea ${touched && error ? 'is-danger' : ''}`;
        const showErrorText = `${touched && error ? 'tag is-danger' : ''}`;

        return (
            <div className="field">
                <label className="label">Body</label>
                <p className="control">
                    <textarea {...field.input} className={inputError} placeholder="Type your post in here..."></textarea>
                </p>
                <div className={showErrorText}>
                    {touched ? error : ' '}
                </div>

            </div>
        )
    }


    submit = (values) => {
        const { id } = this.props;
        // values is all the data from the form
        this.props.createComment(id, values, () => {
            // Closes the new comment UI when the comment has been saved
            this.props.hideComment();

        });


    };

    render() {

        const { handleSubmit } = this.props;
        return (
            <div className="block">
                <div className="box">
                    <h1 className="title">New Comment</h1>
                    <form onSubmit={handleSubmit(this.submit.bind(this))}>
                        <Field
                            label="Title"
                            name="title"
                            component={this.renderTextField}
                        />
                        <Field
                            label="Author"
                            name="author"
                            component={this.renderTextField}
                        />


                        <Field
                            name="body"
                            component={this.renderBodyField}
                        />

                        <button type="submit" className="button is-success">Save Comment</button>
                        <Link to="/" className="button is-danger">Cancel</Link>
                    </form>
                </div>
            </div>
        );
    }
}

function validate(values)
{
    const errors = {};
    if (!values.title)
    {
        errors.title = "Please enter a title for your post!"
    }
    if (!values.author)
    {
        errors.author = "Please enter the author of this post!"
    }
    if (!values.body)
    {
        errors.body = "Please enter some content for your post!"
    }


    return errors;
}

export default reduxForm({
    validate,
    form: 'NewComment'
})(
    connect(null, { createComment })(NewComment)
)