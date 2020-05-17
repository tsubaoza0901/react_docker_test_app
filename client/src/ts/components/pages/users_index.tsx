// ------------------------------
// TypeScript（型安全実装）※ material-uiあり
// ------------------------------
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { store } from '../../../index';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { readUsers } from '../../actions';

interface Props {
  readUsers: any;
  users: any;
}

class UsersIndex extends React.Component<Props> {
  componentDidMount() {
    this.props.readUsers();
  }
  renderUsers() {
    return _.map(this.props.users, (user, index) => (
      <TableRow key={index}>
        <TableRowColumn>{user.id}</TableRowColumn>
        <TableRowColumn>
          <Link to={`/users/${user.id}`}>{user.userName}</Link>
        </TableRowColumn>
      </TableRow>
    ));
  }
  render() {
    // // styleの詳細設定
    // const style = {
    //   position: 'fixed',
    //   right: 12,
    //   bottom: 12,
    // };
    return (
      <React.Fragment>
        <FloatingActionButton
          style={{
            position: 'fixed',
            right: 12,
            bottom: 12,
          }}
          containerElement={<Link to="/users/new" />}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>UserName</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>{this.renderUsers()}</TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

// stateの型定義。storeのgetState関数の戻り型を、ReturnTypeで取得することで型安全を実装。
// https://qiita.com/hat3/items/9d9d2de9f956f0f008a6
type AllState = ReturnType<typeof store.getState>;

// 【重要】mapStateToProps：storeにあるstateの値（state.users）をusersという名前で取得。こうすることで、component内で、this.props.usersという形でpropsからstateの値を参照できる。
const mapStateToProps = (state: AllState) => ({ users: state.users });

// 【重要】mapDispatchToProps：actionCreater（readUsers）を渡すことで、mapStateToPropsと同様、component内でthis.props.readUsersという形で使用できるようになり、typeに応じたstateの変更処理をreducerで行えるようにしている。
const mapDispatchToProps = { readUsers };

// 【重要】connect関数の役割
// 1. 分断されたReduxのstoreからstate(状態)を取得できるようにすること
// 2. storeのstate(状態)を書き換えられるようにすること
export default connect(mapStateToProps, mapDispatchToProps)(UsersIndex);

// // ------------------------------
// // TypeScript（型安全未実装）※ material-uiあり
// // ------------------------------
// import React from 'react';
// import { connect } from 'react-redux';
// import _ from 'lodash';
// import { Link } from 'react-router-dom';
// import { store } from '../../index';
// // 追加---------------------------
// import {
//   Table,
//   TableBody,
//   TableHeader,
//   TableHeaderColumn,
//   TableRow,
//   TableRowColumn,
// } from 'material-ui/Table';
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentAdd from 'material-ui/svg-icons/content/add';
// // ------------------------------
// import { readUsers } from '../actions';

// interface Props {
//   readUsers: any;
//   users: any;
// }

// class UsersIndex extends React.Component<Props> {
//   componentDidMount() {
//     this.props.readUsers();
//   }
//   renderUsers() {
//     // keyエラー回避のためindexを追加
//     return _.map(this.props.users, (user, index) => (
//       <TableRow key={index}>
//         <TableRowColumn>{user.id}</TableRowColumn>
//         <TableRowColumn>
//           <Link to={`/users/${user.id}`}>{user.userName}</Link>
//         </TableRowColumn>
//       </TableRow>
//     ));
//   }
//   render() {
//     // // styleの詳細設定
//     // const style = {
//     //   position: 'fixed',
//     //   right: 12,
//     //   bottom: 12,
//     // };
//     return (
//       <React.Fragment>
//         {/* FloatingActionButton：ボタンの描画を表示 */}
//         {/* 追加ボタンのstyle設定のため style={style} を追加 */}
//         <FloatingActionButton
//           // style={style} ※ 型定義ができずエラーで使用できなかったため、一旦下記で代用
//           style={{
//             position: 'fixed',
//             right: 12,
//             bottom: 12,
//           }}
//           containerElement={<Link to="/users/new" />}
//         >
//           {/* 追加ボタンに＋（プラス）を表示 */}
//           <ContentAdd />
//         </FloatingActionButton>
//         <Table>
//           {/* displaySelectAll={false}：一覧表示左の全選択チェックボックスの非表示設定 */}
//           {/* adjustForCheckbox={false}：チェクボックスに合わせた項目名位置をデフォルトの状態チェックボックスがない状態に戻す設定 */}
//           <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
//             <TableRow>
//               <TableHeaderColumn>ID</TableHeaderColumn>
//               <TableHeaderColumn>UserName</TableHeaderColumn>
//             </TableRow>
//           </TableHeader>
//           {/* displayRowCheckbox={false}：bodyの各レコードにあるチェックボックスの非表示設定 */}
//           <TableBody displayRowCheckbox={false}>{this.renderUsers()}</TableBody>
//         </Table>
//       </React.Fragment>
//     );
//   }
// }

// // 【重要】storeにあるstateの値（state.users）をusersという名前で取得。こうすることで、component内で、this.props.usersという形でpropsからstateの値を参照できる。
// const mapStateToProps = (state: any) => ({ users: state.users });

// // 【重要】mapDispatchToPropsにactionCreater（readUsers）を渡すことで、mapStateToPropsと同様、component内でthis.props.readUsersという形で使用できるようになり、typeに応じたstateの変更処理をreducerで行えるようにしている。
// const mapDispatchToProps = { readUsers };

// // 【重要】connect関数の役割
// // 1. 分断されたReduxのstoreからstate(状態)を取得できるようにすること
// // 2. storeのstate(状態)を書き換えられるようにすること
// export default connect(mapStateToProps, mapDispatchToProps)(UsersIndex);

// ------------------------------
// TypeScript（型安全未実装）※ material-uiなし
// ------------------------------
// import React from 'react';
// import { connect } from 'react-redux';
// import _ from 'lodash';
// import { Link } from 'react-router-dom';
// import { readUsers } from '../actions';

// interface Props {
//   readUsers: any;
//   users: any;
// }

// class UsersIndex extends React.Component<Props> {
//   componentDidMount() {
//     this.props.readUsers();
//   }
//   renderUsers() {
//     // keyエラー回避のためindexを追加
//     return _.map(this.props.users, (user, index) => (
//       <tr key={index}>
//         <td>{user.id}</td>
//         <td>
//           <Link to={`/users/${user.id}`}>{user.userName}</Link>
//         </td>
//       </tr>
//     ));
//   }
//   render() {
//     return (
//       <React.Fragment>
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>UserName</th>
//             </tr>
//           </thead>
//           <tbody>{this.renderUsers()}</tbody>
//         </table>
//         <Link to="/users/new">New Users</Link>
//       </React.Fragment>
//     );
//   }
// }

// const mapStateToProps = (state: any) => ({ users: state.users });

// const mapDispatchToProps = { readUsers };

// export default connect(mapStateToProps, mapDispatchToProps)(UsersIndex);
