import React from 'react';
import ListComponent from './ListComponent';

import ReactDOM from 'react-dom';
import back_icon from '../assets/icons/back_icon.png'
import logo from '../logo.png';

class EditComponent extends React.Component {
  render() {

    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <label>
            Name:
                  <input type="text" value={this.state.episode.name} onChange={this.handleChangeName} />
            Code:
                  <input type="text" value={this.state.episode.code} onChange={this.handleChangeCode} />
            Note:
                  <input type="number" value={this.state.episode.note} onChange={this.handleChangeNote} />
          </label>
          <input type="submit" value="Validate" />
        </form>

        <img onClick={this.clickBack} className="back_button" src={back_icon} />

      </div>
    )
  }

  handleChangeName(event) {
    let state = this.state.episode;
    state.name = event.target.value;
    this.setState({ episode: state });
  }

  handleChangeCode(event) {
    let state = this.state.episode;
    state.code = event.target.value;
    this.setState({ episode: state });
  }

  handleChangeNote(event) {
    let state = this.state.episode;
    state.note = event.target.value;
    this.setState({ episode: state });
  }

  handleSubmit(event) {

    event.preventDefault();

    var updateEpisodesList = this.props.updateEpisodesList;

    fetch('http://localhost:4000/api/episodes/' + this.state.episode.id, {
      method: 'PUT',
      body: JSON.stringify({
        id : this.state.episode.id,
        name: this.state.episode.name,
        code: this.state.episode.code,
        note: this.state.episode.note
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => {
      this.clickBack();
      updateEpisodesList();
    }).catch(err => console.log("error", err));

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

  constructor(props) {
    super(props);

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeNote = this.handleChangeNote.bind(this);
    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      episode: props.episode
    };

    this.clickBack = this.clickBack.bind(this);

  }

  componentDidMount() {
  }

}

export default EditComponent;