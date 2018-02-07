
import React from 'react';


class ListComponent extends React.Component {
  render() {

      const { episodes } = this.state;

      console.log("episodes", episodes);

      return (
        <div>

        {episodes.map(ep =>
          <div>
            {ep}
          </div>
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
    fetch("/api/episodes")
      .then(response => response.json())
      .then(data => this.setState({ episodes: data }));
  }
  

}

export default ListComponent;