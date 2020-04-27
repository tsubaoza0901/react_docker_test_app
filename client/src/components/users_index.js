import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { readUsers } from '../actions';

class UsersIndex extends React.Component {
  componentDidMount() {
    this.props.readUsers();
  }
  renderUsers() {
    // keyエラー回避のためindexを追加
    return _.map(this.props.users, (user, index) => (
      <tr key={index}>
        <td>{user.id}</td>
        <td>{user.UserName}</td>
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

const mapStateToProps = (state) => ({ users: state.users });

const mapDispatchToProps = { readUsers };

export default connect(mapStateToProps, mapDispatchToProps)(UsersIndex);
