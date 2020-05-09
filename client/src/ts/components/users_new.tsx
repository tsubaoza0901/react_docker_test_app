// ------------------------------
// 以下、js → tsへ第一弾
// ------------------------------
// import React from 'react';
// import { connect } from 'react-redux';
// import { Field, reduxForm, FormErrors } from 'redux-form';
// import { Link } from 'react-router-dom';

// import { postUser } from '../actions';

// interface Props {
//   postUser: any;
//   history: any;
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

// class UsersNew extends React.Component<Props> {
//   constructor(props: any) {
//     super(props);
//     this.onSubmit = this.onSubmit.bind(this);
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
//   async onSubmit(values: any) {
//     await this.props.postUser(values);
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

// const mapDispatchToProps = { postUser };

// export default connect(
//   null,
//   mapDispatchToProps
// )(reduxForm({ validate, form: 'userNewForm' })(UsersNew));
