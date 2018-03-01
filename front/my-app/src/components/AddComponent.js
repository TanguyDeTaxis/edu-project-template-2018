
import React from 'react';


class AddComponent extends React.Component {
  render() {

      return (
        <div>
              <form className="form" onSubmit={this.handleSubmit}>
                <label>
                  Name:
                  <input className="form_input" type="text" value={this.state.episode.name} onChange={this.handleChangeName} />
                  Code:
                  <input className="form_input" type="text" value={this.state.episode.code} onChange={this.handleChangeCode} />
                  Note: 
                  <input className="form_input" type="number" value={this.state.episode.note} onChange={this.handleChangeNote} />
                </label>
                <input type="submit" value="Add" />
          </form>

        </div>
      )
    }

    handleChangeName(event) {
    let state = this.state.episode;
    state.name = event.target.value;
    this.setState({episode: state});
  }  

  handleChangeCode(event) {
    let state = this.state.episode;
    state.code = event.target.value;
    this.setState({episode: state});
  }  

   handleChangeNote(event) {
    let state = this.state.episode;
    state.note = event.target.value;
    this.setState({episode: state});
  } 

  handleSubmit(event) {

    event.preventDefault();

    var updateEpisodesList  =   this.props.updateEpisodesList;

    fetch('http://localhost:4000/api/episodes', {
        method: 'POST',
        body: JSON.stringify({
          name : this.state.episode.name,
          code : this.state.episode.code,
          note : this.state.episode.note
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => {
        console.log("res", res);
        updateEpisodesList();
    }).catch(err => console.log("error", err));

  }

  constructor(props) {
    super(props);

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeNote = this.handleChangeNote.bind(this);
    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      episode: {
        name : '',
        code : '',
        note : ''
      }
    };
  }

  componentDidMount() {
  }
  
}

export default AddComponent;