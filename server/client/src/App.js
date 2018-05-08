import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  handleLogin = () => {
    axios.get('/auth/google').then(res => {
      debugger;
    });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Heyyyyyy</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and
          save to reload.
        </p>
        <a href="/auth/google" target="_blank">
          Login
        </a>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}

export default App;
