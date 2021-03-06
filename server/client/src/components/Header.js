import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Payments from './Payments';

class Header extends React.Component {
  renderContent() {
    const { auth } = this.props;
    switch (auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payments />
          </li>,
          <li key="2">Credits: {auth.credits}</li>,
          <li key="3">
            <a href="/api/logout">Logout</a>
          </li>,
        ];
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper blue accent-2">
          <Link to={this.props.auth ? '/surveys' : '/'} className="brand-logo">
            Mern Mail
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default withRouter(connect(mapStateToProps)(Header));
