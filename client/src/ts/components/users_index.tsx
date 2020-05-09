// ------------------------------
// 以下、js → tsへ第二弾
// ------------------------------
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { readUsers } from '../actions';

interface Props {
  readUsers: any;
  users: any;
}

class UsersIndex extends React.Component<Props> {
  componentDidMount() {
    this.props.readUsers();
  }
  renderUsers() {
    // keyエラー回避のためindexを追加
    return _.map(this.props.users, (user, index) => (
      <tr key={index}>
        <td>{user.id}</td>
        <td>
          <Link to={`/users/${user.id}`}>{user.userName}</Link>
        </td>
      </tr>
    ));
  }
  render() {
    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>UserName</th>
            </tr>
          </thead>
          <tbody>{this.renderUsers()}</tbody>
        </table>
        <Link to="/users/new">New Users</Link>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => ({ users: state.users });

const mapDispatchToProps = { readUsers };

export default connect(mapStateToProps, mapDispatchToProps)(UsersIndex);

// ------------------------------
// 以下、js → tsへ第一弾
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
