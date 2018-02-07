
import React from 'react';


class ListComponent extends React.Component {
  render() {

      const { episodes } = this.state;

      console.log("episodes", episodes);

      return (
        <div>

        {episodes.map(ep =>
          <li key={ep.id}>
            <p> Code : {ep.code}</p> <p> Name : {ep.name}</p> <p>Note : {ep.note}</p>
          </li>
        )}
        </div>
      )
    }


  constructor(props) {
    super(props);

    this.state = {
      episodes: [],
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