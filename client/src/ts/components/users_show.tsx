// ------------------------------
// 以下、js → tsへ第一弾
// ------------------------------
// import React from 'react';
// import { connect } from 'react-redux';
// import { Field, reduxForm, FormErrors } from 'redux-form';
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

// // 追加---------------------------
// interface LoginFormData {
//   userName?: string;
// }
// // ------------------------------

// class UsersShow extends React.Component<Props> {
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
//   reduxForm({
//     validate,
//     form: 'userShowForm',
//     enableReinitialize: true,
//   })(UsersShow)
// );
