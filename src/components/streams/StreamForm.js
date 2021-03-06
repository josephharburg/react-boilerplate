import React from 'react';
import {Field, reduxForm } from 'redux-form';
//field is a Component we can use the information from a form. it is not what is rendered
// to the screen. this Component is from redux-form library that makes a form. The name gives the name for it.


class StreamForm extends React.Component {
  renderError({ error, touched }){
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }


  renderInput = ({input, label, meta}) => {
    const className = `field ${meta.error && meta.touched ? 'error': ''}`;
    return (
      <div className={className}>
      <label>{label}</label>
      <input {...input} />
      {this.renderError(meta)}
      </div>
      );
  }
// ^^^^ this uses new syntax. What is happening is the argument is the input being typed in the field
// is going to be added to all the values in the redux-form input object. We want to update all the input values so
//that we dont have to type all of them out. for example: input.value or perhaps input.name

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }
// using redux-form automatically does the preventDefault when submitting a form so we dont have to.

  render() {
  return (
    <form onSubmit={this.props.handleSubmit(this.onSubmit)}className="ui form error">
      <Field name="title" component={this.renderInput} label="Enter Title"/>
      <Field name="description" component={this.renderInput} label="Enter Description"/>
      <button className="ui button primary">Submit</button>
    </form>
  )
}
};
//^^^^^ the Field component will add props not in the original Field component itself into whatever
//function etc. is passed into the component prop. i.e. label is not in the field component so it will automatically
// be passed into this.renderInput. This can then be used as an argument in renderInput.
//^^^^^^^ form---- the prop onSubmit is using the handleSubmit property is a callback function already written in the redux-form middleware.
//then we use OUR onSubmit function.

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title= 'Enter a title!';
  }

  if (!formValues.description) {
    errors.description = 'Enter a Description!'
  }

  return errors;
};
//^^^^^ redux-form matches the keyvalue name in the errors object to the prop from field name="" then it
//passes the error message to the meta property in redux-form.
export default reduxForm({
  form: 'streamForm',
  validate: validate
}) (StreamForm);
// the syntax for reduxForm is the same as react-redux but the reduxForm does not require argumnets
//but rather an object using the form, the name we give the form is whatever we want it to be.
