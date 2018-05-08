import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper blue accent-2">
          <a className="brand-logo">Emaily</a>
          <ul className="right">
            <li>
              <a>Login with Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
const styles = {
  logo: {
    marginLeft: '10x !important',
  },
};

export default Header;
