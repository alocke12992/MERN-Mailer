import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NoMatch extends Component {
  render() {
    return (
      <h1>
        Page Not Found
        <Link to="/"> Home</Link>
      </h1>
    );
  }
}

export default NoMatch;
