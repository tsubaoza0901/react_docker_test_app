// ------------------------------
// TypeScript（型安全未実装）※ material-uiあり
// ------------------------------

import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, InjectedFormProps, FormErrors } from 'redux-form';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import { postUser } from '../actions';

interface Props {
  postUser: any;
  history: any;
  handleSubmit: any;
  pristine: any;
  submitting: any;
  invalid: any;
}

interface State {}

// LoginFormDataの名称は今後のログイン機能実装にむけた仮設定
interface LoginFormData {
  userName?: string;
}

class UsersNew extends React.Component<
  InjectedFormProps<{}, Props> & Props,
  State
> {
  constructor(props: any) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
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
        {/* 元々のinputタグをTextFieldでレプレイス */}
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
  async onSubmit(values: any) {
    await this.props.postUser(values);
    this.props.history.push('/');
  }
  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    // styleの詳細設定
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
          {/* inputタグ（submitボタン）、Linkタグ（Cancelボタン）をRaisedButtonでレプレイス */}
          <RaisedButton
            label="Submit"
            type="submit"
            style={style}
            disabled={pristine || submitting || invalid}
          />
          <RaisedButton
            label="Cancel"
            style={style}
            containerElement={<Link to="/" />}
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

const mapDispatchToProps = { postUser };

export default connect(
  null,
  mapDispatchToProps
)(
  reduxForm<{}, Props>({ validate, form: 'userNewForm' })(UsersNew)
);

// ------------------------------
// TypeScript（型安全未実装）※ material-uiなし
// ------------------------------
// /*
// 【note】
// ・ReduxフォームとReact Reduxの接続
// https://github.com/CodeMeNatalie/Redux-Forms-with-TypeScript/blob/master/src/components/LoginForm/LoginForm.tsx
// */

// import React from 'react';
// import { connect } from 'react-redux';
// import { Field, reduxForm, InjectedFormProps, FormErrors } from 'redux-form';
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

// interface State { }

// // LoginFormDataの名称は今後のログイン機能実装にむけた仮設定
// interface LoginFormData {
//   userName?: string;
// }

// class UsersNew extends React.Component<InjectedFormProps<{}, Props> & Props, State> {
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
// )(reduxForm<{}, Props>({ validate, form: 'userNewForm' })(UsersNew));
