import React from 'react';
import AddComponent from './AddComponent';
import styles from './myCss.css';

class ListComponent extends React.Component {
  render() {

      const { episodes } = this.state;

      console.log("episodes", episodes);

      return (
        <div className="inline_div">
        
        <div className="episodes_div">
          <h1>Episodes</h1>

          {episodes.map(ep =>
            <li key={ep.id}>
              <p> Code : {ep.code}</p> <p> Name : {ep.name}</p> <p>Note : {ep.note}</p>
            </li>
          )}

        </div>

        <div className="form_div">

          <AddComponent episodes={this.state.episodes}/>
         
        </div>
        
        </div>
      )
    }


  constructor(props) {
    super(props);

    this.state = {
      episodes: []
    };
  }

  componentDidMount() {
    
    fetch("http://localhost:4000/api/episodes")
      .then(response => response.json())
      .then(data => { console.log("data", data); this.setState({ episodes: data }) })
      .catch( err => console.log("err", err));
  }
  
}

export default ListComponent;