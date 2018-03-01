import React from 'react';
import AddComponent from './AddComponent';
import styles from './myCss.css';
import ReactDOM from 'react-dom';
import back_icon from '../assets/icons/back_icon.png'
import logo from '../logo.png';

import ListComponent from './ListComponent';
import { BrowserRouter as Router, Route, Link, Prompt } from "react-router-dom";

class ItemDetailComponent extends React.Component {
  render() {

    const ep = this.props.episode;

    return (
      <div>
        <div className="padded_div">
          <span> Code : {ep.code}</span>
        </div>

        <div className="padded_div">
          <span> Name : {ep.name}</span>
        </div>

        <div className="padded_div">
          <span>Note : {ep.note}</span>
        </div>

         <img onClick={this.clickBack} className="back_button" src={back_icon} />

      </div >
    )
  }


  constructor(props) {
    super(props);

    this.clickBack = this.clickBack.bind(this)
  }

  clickBack() {
    ReactDOM.render(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">EPISODES APP</h1>
        </header>
        <p className="App-intro">
          <ListComponent />
        </p>
      </div>, document.getElementById('root'));
  }

}

export default ItemDetailComponent;