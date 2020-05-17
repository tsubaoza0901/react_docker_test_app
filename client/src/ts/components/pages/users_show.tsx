// ------------------------------
// TypeScript（型安全未実装）※ material-uiあり
// ------------------------------
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps, FormErrors } from 'redux-form';
import { Link } from 'react-router-dom';
// 追加---------------------------
import RaiseButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
// ------------------------------

import { getUser, deleteUser, putUser } from '../../actions';

interface Props {
  match: any;
  getUser: any;
  deleteUser: any;
  history: any;
  putUser: any;
  handleSubmit: any;
  pristine: any;
  submitting: any;
  invalid: any;
}

interface State {}

interface LoginFormData {
  userName?: string;
}

class UsersShow extends React.Component<
  InjectedFormProps<{}, Props> & Props,
  State
> {
  constructor(props: any) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) this.props.getUser(id);
  }
  renderField(field: any) {
    const {
      input,
      label,
      type,
      meta: { touched, error },
    } = field;

    return (
      <div>
        {/* TextFieldへリプレイス */}
        <TextField
          hintText={label}
          floatingLabelText={label}
          type={type}
          errorText={touched && error}
          {...input}
          fullWidth={true}
        />
      </div>
    );
  }
  async onDeleteClick() {
    const { id } = this.props.match.params;
    await this.props.deleteUser(id);
    this.props.history.push('/');
  }
  async onSubmit(values: any) {
    await this.props.putUser(values);
    this.props.history.push('/');
  }
  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    const style = { margin: 12 };
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
          {/* RaiseButtonへリプレイス */}
          <RaiseButton
            label="Submit"
            type="submit"
            style={style}
            disabled={pristine || submitting || invalid}
          />
          <RaiseButton
            label="Cancel"
            style={style}
            containerElement={<Link to="/" />}
          />
          <RaiseButton
            label="Delete"
            style={style}
            onClick={this.onDeleteClick}
          />
        </div>
      </form>
    );
  }
}

const validate = (values: any) => {
  const errors: FormErrors<LoginFormData> = {};

  if (!values.userName) errors.userName = 'Enter a UserName, please.';
  return errors;
};

const mapStateToProps = (state: any, ownProps: any) => {
  const user = state.users[ownProps.match.params.id];
  return { initialValues: user, user };
};

const mapDispatchToProps = { deleteUser, getUser, putUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  reduxForm<{}, Props>({
    validate,
    form: 'userShowForm',
    enableReinitialize: true,
  })(UsersShow)
);

// ------------------------------
// TypeScript（型安全未実装）※ material-uiなし
// ------------------------------
// import React from 'react';
// import { connect } from 'react-redux';
// import { Field, reduxForm, InjectedFormProps, FormErrors } from 'redux-form';
// import { Link } from 'react-router-dom';

// import { getUser, deleteUser, putUser } from '../actions';

// interface Props {
//   match: any;
//   getUser: any;
//   deleteUser: any;
//   history: any;
//   putUser: any;
//   handleSubmit: any;
//   pristine: any;
//   submitting: any;
//   invalid: any;
// }

// interface State {}

// interface LoginFormData {
//   userName?: string;
// }

// class UsersShow extends React.Component<
//   InjectedFormProps<{}, Props> & Props,
//   State
// > {
//   constructor(props: any) {
//     super(props);
//     this.onSubmit = this.onSubmit.bind(this);
//     this.onDeleteClick = this.onDeleteClick.bind(this);
//   }
//   componentDidMount() {
//     const { id } = this.props.match.params;
//     if (id) this.props.getUser(id);
//   }
//   renderField(field: any) {
//     const {
//       input,
//       label,
//       type,
//       meta: { touched, error },
//     } = field;

//     return (
//       <div>
//         <input {...input} placeholder={label} type={type} />
//         {touched && error && <span>{error}</span>}
//       </div>
//     );
//   }
//   async onDeleteClick() {
//     const { id } = this.props.match.params;
//     await this.props.deleteUser(id);
//     this.props.history.push('/');
//   }
//   async onSubmit(values: any) {
//     await this.props.putUser(values);
//     this.props.history.push('/');
//   }
//   render() {
//     const { handleSubmit, pristine, submitting, invalid } = this.props;
//     return (
//       <form onSubmit={handleSubmit(this.onSubmit)}>
//         <div>
//           <Field
//             label="UserName"
//             name="userName" // jsonデータのキー名
//             type="text"
//             component={this.renderField}
//           />
//         </div>
//         <div>
//           <input
//             type="submit"
//             value="Submit"
//             disabled={pristine || submitting || invalid}
//           />
//           <Link to="/">Cancel</Link>
//           <Link to="/" onClick={this.onDeleteClick}>
//             Delete
//           </Link>
//         </div>
//       </form>
//     );
//   }
// }

// const validate = (values: any) => {
//   const errors: FormErrors<LoginFormData> = {};

//   if (!values.userName) errors.userName = 'Enter a UserName, please.';
//   return errors;
// };

// const mapStateToProps = (state: any, ownProps: any) => {
//   const user = state.users[ownProps.match.params.id];
//   return { initialValues: user, user };
// };

// const mapDispatchToProps = { deleteUser, getUser, putUser };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(
//   reduxForm<{}, Props>({
//     validate,
//     form: 'userShowForm',
//     enableReinitialize: true,
//   })(UsersShow)
// );
