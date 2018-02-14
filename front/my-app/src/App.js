import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Prompt } from "react-router-dom";

import ListComponent from './components/ListComponent';
import AddComponent from "./components/AddComponent";

class App extends Component {
  render() {

const PreventingTransitionsExample = () => (
  <Router>
    <div>
        <div>
          <Link to="/">Acceuil</Link>
        </div>
        <div>
          <Link to="/add">Details</Link>
        </div>
    
      <Route path="/" exact component={ListComponent} />
      <Route path="/add" exact component={AddComponent} />
    </div>
  </Router>
);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">EPISODES APP</h1>
        </header>
        <p className="App-intro">
         <PreventingTransitionsExample/>
        </p>
      </div>
    );
  }
}

export default App;
