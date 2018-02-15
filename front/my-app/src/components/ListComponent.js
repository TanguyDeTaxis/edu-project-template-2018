import React from 'react';
import AddComponent from './AddComponent';
import styles from './myCss.css';

class ListComponent extends React.Component {
  render() {

      const { episodes } = this.state;

      var updateEpisodesList  =   this.updateEpisodesList;

      console.log("episodes", episodes);

      return (
        <div className="inline_div">
        
        <div className="episodes_div">
          <h1>Episodes</h1>

          <div className="episodes_block">
          {episodes.map(ep =>
            <div className="item_list" key={ep.id}>
              <span> Code : {ep.code}</span> <span> Name : {ep.name}</span> <span>Note : {ep.note}</span>
            </div>
          )}
          </div>

        </div>

        <div className="form_div">

          <AddComponent updateEpisodesList={updateEpisodesList.bind(this)}/>
         
        </div>
        
        </div>
      )
    }


  constructor(props) {
    super(props);

    this.updateEpisodesList  = this.updateEpisodesList.bind(this);

    this.state = {
      episodes: []
    };
  }

  updateEpisodesList(){
    fetch("http://localhost:4000/api/episodes")
      .then(response => response.json())
      .then(data => { console.log("data", data); this.setState({ episodes: data }) })
      .catch( err => console.log("err", err));
  }

  componentDidMount() {
    this.updateEpisodesList();
  }
  
}

export default ListComponent;