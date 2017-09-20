import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { editPost, fetchPost, fetchCategories } from "../actions/actions_index";


class EditPost extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {selectValue: ''};

        this.handleOptionChange = this.handleOptionChange.bind(this);

    }

    componentWillMount()
    {
        const {id} = this.props.match.params;
        this.props.fetchPost(id).then( ({payload}) => {this.setState({selectValue: payload.data.category})});
        this.props.fetchCategories();
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
                    placeholder={field.currentValue}

                />
                <div className={showErrorText}>
                    {touched ? error : ' '}
                </div>

            </div>
        )
    }

    handleOptionChange(event)
    {
        this.setState({selectValue: event.target.value})
    }

    renderCategoryField(field)
    {
        return (
            <div className="field">
                <label className="label">Category</label>
                <p className="control">
                    <span className="select">
                        <select {...field.input} value={field.newValue} onChange={field.handleChange}>
                            {field.categories.map( (category) => {
                                return <option key={category.name}>{category.name}</option>
                            })}
                        </select>
                    </span>
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
                <p className="control">
                    <textarea {...field.input}
                              className={inputError}
                              placeholder={field.currentValue}>

                    </textarea>
                </p>
                <div className={showErrorText}>
                    {touched ? error : ' '}
                </div>

            </div>
        )
    }

    submit = (values) => {
        // values is all the data from the form
        const {id} = this.props.match.params;
        this.props.editPost(values, id, () => {
            // Sends the user back to the home page after the new post has been add to the DB
            this.props.history.push(`/posts/${id}`);
        });
    };

    render() {

        const { handleSubmit } = this.props;
        const { id } = this.props.match.params;
        if(!this.props.post)
        {
            return <div>loading...</div>
        }
        return (

            <div className="block">
                <div className="box">
                    <h1 className="title">Edit Post</h1>
                    <form onSubmit={handleSubmit(this.submit.bind(this))}>
                        <Field
                            label="Title"
                            name="title"
                            currentValue={this.props.post.title}
                            component={this.renderTextField}
                        />
                        <Field
                            label="Author"
                            name="author"
                            currentValue={this.props.post.author}
                            component={this.renderTextField}
                        />

                        <Field
                            name="category"
                            categories ={this.props.categories}
                            currentValue = {this.props.post.category}
                            newValue = {this.state.selectValue}
                            handleChange = {this.handleOptionChange}
                            component={this.renderCategoryField}
                        />

                        <Field
                            name="body"
                            currentValue={this.props.post.body}
                            component={this.renderBodyField}
                        />

                        <button type="submit" className="button is-success">Save Post</button>
                        <Link to={`/posts/${id}`} className="button is-danger">Cancel</Link>
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


    // return errors;
}

function mapStateToProps(state)
{
    return {
        post: state.postState.currentPost,
        categories: state.categoriesState
    }
}

export default reduxForm({
    validate,
    form: 'EditPost'
})(
    connect(mapStateToProps, { editPost, fetchPost, fetchCategories })(EditPost)
)