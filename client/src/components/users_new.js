import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { postUser } from '../actions';

class UsersNew extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  renderField(field) {
    const {
      input,
      label,
      type,
      meta: { touched, error },
    } = field;

    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    );
  }
  async onSubmit(values) {
    await this.props.postUser(values);
    this.props.history.push('/');
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <Field
            label="UserName"
            name="userName"
            type="text"
            component={this.renderField}
          />
        </div>
        <div>
          <input type="submit" value="Submit" disabled={false} />
          <Link to="/">Cancel</Link>
        </div>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.username) errors.username = 'Enter a UserName, please.';
  return errors;
};

// const mapStateToProps = (state) => ({ users: state.users });

const mapDispatchToProps = { postUser };

export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ validate, form: 'userNewForm' })(UsersNew));
