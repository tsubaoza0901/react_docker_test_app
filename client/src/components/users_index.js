import React from 'react';
import { connect } from 'react-redux';

import { readUsers } from '../actions';

class UsersIndex extends React.Component {
  componentDidMount() {
    this.props.readUsers();
  }
  render() {
    const props = this.props;
    return <React.Fragment></React.Fragment>;
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { readUsers };

export default connect(mapStateToProps, mapDispatchToProps)(UsersIndex);
