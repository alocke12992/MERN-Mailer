import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/index';

class FetchUser extends React.Component {
  state = { loaded: false };

  componentDidMount() {
    const { isAuthenticated, dispatch } = this.props;
    if (isAuthenticated) this.loaded();
    else dispatch(fetchUser(this.loaded));
  }

  componentWillReceiveProps() {
    if (!this.state.loaded) this.loaded();
  }

  loaded = () => {
    this.setState({ loaded: true });
  };

  render() {
    return this.state.loaded ? this.props.children : null;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth,
  };
};

export default connect(mapStateToProps)(FetchUser);
