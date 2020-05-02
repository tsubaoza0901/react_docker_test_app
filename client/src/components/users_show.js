import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { getUser, deleteUser, putUser } from '../actions';

class UsersShow extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) this.props.getUser(id);
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
  async onDeleteClick() {
    const { id } = this.props.match.params;
    await this.props.deleteUser(id);
    this.props.history.push('/');
  }
  async onSubmit(values) {
    await this.props.putUser(values);
    this.props.history.push('/');
  }
  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
          <Field
            label="UserName"
            name="userName" // jsonデータのキー名
            type="text"
            component={this.renderField}
          />
        </div>
        <div>
          <input
            type="submit"
            value="Submit"
            disabled={pristine || submitting || invalid}
          />
          <Link to="/">Cancel</Link>
          <Link to="/" onClick={this.onDeleteClick}>
            Delete
          </Link>
        </div>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.userName) errors.userName = 'Enter a UserName, please.';
  return errors;
};

const mapStateToProps = (state, ownProps) => {
  const user = state.users[ownProps.match.params.id];
  return { initialValues: user, user };
};

const mapDispatchToProps = { deleteUser, getUser, putUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm({ validate, form: 'userShowForm', enableReinitialize: true })(
    UsersShow
  )
);
