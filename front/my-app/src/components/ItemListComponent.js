import React from 'react';
import AddComponent from './AddComponent';
import ItemDetailComponent from './ItemDetailComponent';
import EditComponent from './EditComponent';
import logo from '../logo.png';
import styles from './myCss.css';
import ReactDOM from 'react-dom';
import delete_icon from '../assets/icons/delete_icon.png'
import edit_icon from '../assets/icons/edit_icon.png'
import { browserHistory } from 'react-router';

class ItemListComponent extends React.Component {
  render() {

    const ep = this.props.episode;

    return (
      <div className="item_list">
        <div className="item_list_data" key={ep.id} onClick={()=>this.clickItem(ep)}>
          <div className="item_list_span"> Code : {ep.code}</div> 
          <div  className="item_list_span"> Name : {ep.name}</div> 
          <div className="item_list_span">Note : {ep.note}</div>
        </div>
        <div className="button_div">
          <span onClick={()=> this.editItem(ep)}> <img className="edit_icon" src={edit_icon} /> </span>
          <span onClick={()=> this.deleteItem(ep.id)}> <img className="delete_icon" src={delete_icon} /> </span>
        </div>
      </div>
    )
  }

  clickItem(ep) {
    
    ReactDOM.render(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">EPISODES APP</h1>
        </header>
        <p className="App-intro">
          <ItemDetailComponent episode={ep} />
        </p>
      </div>, document.getElementById('root'));
  }

  constructor(props) {
    super(props);

    this.clickItem = this.clickItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  editItem(ep){
     ReactDOM.render(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">EPISODES APP</h1>
        </header>
        <p className="App-intro">
          <EditComponent episode={ep} />
        </p>
      </div>, document.getElementById('root'));
  }

  deleteItem(episodeId){
    var updateEpisodesList  =   this.props.updateEpisodesList;

    fetch('http://localhost:4000/api/episodes/' + episodeId, {
        method: 'DELETE'
    }).then(res => {
        updateEpisodesList();
    }).catch(err => console.log("error", err));
  }

}

export default ItemListComponent;