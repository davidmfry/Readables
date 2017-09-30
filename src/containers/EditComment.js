import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { connect } from 'react-redux';

import { editComment } from "../actions/actions_index";


class EditComment extends Component
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
                    placeholder={field.currentValue}
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
                    <textarea {...field.input} className={inputError} placeholder={field.currentValue}></textarea>
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
        this.props.editComment(values, id, () => {
            // Closes the edit comment UI when the comment has been saved
            this.props.hideEditComment();
        });




    };

    render() {

        const { handleSubmit } = this.props;
        return (
            <div className="block">
                <div className="box">
                    <h1 className="title">Editing Comment {this.props.title} </h1>
                    <form onSubmit={handleSubmit(this.submit.bind(this))}>
                        <Field
                            label="Author"
                            name="author"
                            currentValue={this.props.author}
                            component={this.renderTextField}
                        />


                        <Field
                            name="body"
                            currentValue={this.props.body}
                            component={this.renderBodyField}
                        />

                        <button type="submit" className="button is-success">Save Comment</button>
                        <button onClick={() => {this.props.hideEditComment()}} className="button is-danger smallSpaceLeft">Cancel</button>
                    </form>
                </div>
            </div>
        );
    }
}

function validate(values)
{
    // const errors = {};
    // if (!values.title)
    // {
    //     errors.title = "Please enter a title for your post!"
    // }
    // if (!values.author)
    // {
    //     errors.author = "Please enter the author of this post!"
    // }
    // if (!values.body)
    // {
    //     errors.body = "Please enter some content for your post!"
    // }
    //
    //
    // return errors;
}

export default reduxForm({
    validate,
    form: 'EditComment'
})(
    connect(null, { editComment })(EditComment)
)