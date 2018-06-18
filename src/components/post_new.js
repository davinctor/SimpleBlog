import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';


class PostNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const fieldClassName = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={fieldClassName}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <Field
            name="title"
            label="Title"
            component={this.renderField}
          />
          <Field
            name="categories"
            label="Categories"
            component={this.renderField}
          />
          <Field
            label="Post Content"
            name="content"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
          </form>
      </div>
    );
  }
}

function validate({title, categories, content}) {
  const errors = {};
  if (!title || title.length < 3) {
    errors.title = 'Enter a title that is at least 3 characters';
  }
  if (!categories) {
    errors.categories = 'Enter some categories';
  }
  if (!content) {
    errors.content = 'Enter some content';
  }
  return errors;
}

export default reduxForm({
  form: 'PostsNewForm',
  validate: validate
})(
  connect(null, { createPost })(PostNew)
);
