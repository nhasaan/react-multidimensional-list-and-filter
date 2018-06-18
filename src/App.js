import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Category from './Category';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Category />
        <p className="App-intro">
          Copyright @tutspaer.com.
        </p>
      </div>
    );
  }
}

export default App;
