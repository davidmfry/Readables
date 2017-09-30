import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { createNewPost} from "../actions/actions_index";


class NewPost extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            categoryValue: "none"
        };

        this.handleCategoryChange = this.handleCategoryChange.bind(this);

    }


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

    handleCategoryChange(event)
    {
        this.setState({categoryValue: event.target.value})
    }

    renderCategoryField(field)
    {
        const { meta: { touched, error } } = field;
        const inputError = `input ${touched && error ? 'is-danger' : ''}`;
        const showErrorText = `${touched && error ? 'tag is-danger' : ''}`;

        return (
            <div className="field">
                <label className="label">Category</label>
                <p className="control">
                    <span className="select">
                        <select {...field.input} className={inputError} value={field.newValue} onChange={field.handleChange}  >
                            <option>none</option>
                            <option>react</option>
                            <option>redux</option>
                            <option>udacity</option>
                        </select>
                    </span>
                    <div className={showErrorText}>
                        {touched ? error : ' '}
                    </div>
                </p>
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
                <div className="control">
                    <textarea {...field.input} className={inputError} placeholder="Type your post in here..."></textarea>
                </div>
                <div className={showErrorText}>
                    {touched ? error : ' '}
                </div>

            </div>
        )
    }

    submit = (values) => {
        // values is all the data from the form
        this.props.createNewPost(values, () => {
            // Sends the user back to the home page after the new post has been add to the DB
            this.props.history.push('/');
        });
    };

    render() {

        const { handleSubmit } = this.props;
        return (
            <div className="block">
                <div className="box">
                    <h1 className="title">New Post</h1>
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
                            name="category"
                            newValue = {this.state.categoryValue}
                            handleChange = {this.handleCategoryChange}
                            component={this.renderCategoryField}
                        />

                        <Field
                            name="body"
                            component={this.renderBodyField}
                        />

                        <button type="submit" className="button is-success">Save Post</button>
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
    if (!values.title || values.title.trim().length === 0)
    {
        errors.title = "Please enter a title for your post!"
    }
    if (!values.author || values.author.trim().length === 0)
    {
        errors.author = "Please enter the author of this post!"
    }
    if(!values.category || values.category === 'none')
    {
        errors.category = "Please select a category"
    }
    if (!values.body || values.body.trim().length === 0)
    {
        errors.body = "Please enter some content for your post!"
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'NewPost'
})(
    connect(null, { createNewPost })(NewPost)
)