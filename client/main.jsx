import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

// import Library from './components/Library.jsx';
import NaviBar from './components/NaviBar.jsx';
import SoundBoard from './components/SoundBoard.jsx';
import ControlPanel from './components/ControlPanel.jsx';
import SampleLibrary from './components/SampleLibrary.jsx';

/** Main component behavior
 * States:
 * Sequence object to describe the song
 * @constructor
 */
class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      samples: [
        { // to be replaced with real sound objectsource: 'soundLocation.wav', toggle: true
        source: './audio_files/sound-synth.wav', playing: false
        },
        {
        source: './audio_files/sound-electronicClap.wav', playing: false
        },
        {
        source: './audio_files/sound-kick.wav', playing: false
        }
      ],
      bpm: 120, // moved bpm outside of sequence to make it modular
      sequence: [
        { // changed sequence type to Array from objec to make it easier to map in soundboard component.
        beat:
          undefined, row:
          [
            0, 0, 0, 0, 0, 0, 0, 0
          ]
        }, {
        beat:
          undefined, row:
          [
            0, 0, 0, 0, 0, 0, 0, 0
          ]
        }, {
        beat:
          undefined, row:
          [
            0, 0, 0, 0, 0, 0, 0, 0
          ]
        }, {
        beat:
          undefined, row:
          [
            0, 0, 0, 0, 0, 0, 0, 0
          ]
        }
      ]
    };
    this.updatePlay = this.updatePlay.bind(this);
    this.cellClickHandler = this.cellClickHandler.bind(this);
    this.registerClickHandler = this.registerClickHandler.bind(this);
    this.sampleClickHandler = this.sampleClickHandler.bind(this);
  }


  /** UpdatePlay is passed to the ControlPanel component
    //Clicking the play or stop button will update the entire sounds state -- something to potentially refactor
    @param {boolean} playStatus
    */
  updatePlay(playStatus) {
    var newStatus = Object.assign({}, this.state.samples);
    newStatus[0].playing = playStatus;
    this.setState({sounds:newStatus});
  }


  /** Triggers when you click on a row header in the soundboard. .*/
  registerClickHandler(rowNumber) {
    console.log('Register Clicked at row ' +rowNumber);
  }

  /** Triggers when you click on a sample in the sampleLibrary. .*/
  sampleClickHandler(sampleClicked) {
    console.log(`Sample sound ${sampleClicked} clicked`);
    var newStatus = Object.assign({}, this.state.samples);
    newStatus[sampleClicked].playing =! newStatus[sampleClicked].playing;
    this.setState( {samples: newStatus} );

    // TODO for Kamie: play sound on click
  }




  /** Click Handler for soundboard. Toggles sound for each 1/8th duration.

  */
  cellClickHandler(row,col) { console.
    log(`clicked at ${row}, ${col}`);
    var newRow = this.state.sequence[row].row;
    if (newRow[col] === 0) {
      newRow[col] = 1;
    } else {
    newRow[col] = 0;
    }
    this.setState(() => {
      this.state.sequence[row].row = newRow;
      return {sequence:this.state.sequence};
    });

  }

  componentDidMount() {
    console.log('props including react router props are,', this.props);
  }


  /** Login to the app
  * @param {string} username
  * @param {string} password
  */
  loginCB(username,password) {
    axios.post('/login', {
      username: username,
      password: password
    })
    .then((res) => {
      console.log('successful login');
      window.location ='/member';
    })
    .catch((err) => {console.
      log('error during login');
    });
  }

  /** Create new account for the app
  * @param {string} username
  * @param {string} password
  */
  createAcctCB(username,password) {
    axios.post('/createuser', {
      username: username,
      password: password
    })
    .then((res) => {
      console.log('successful acct creation');
      window.location ='/member';
    })
    .catch((err) => {
      console.log('error during acct creation');
    });
  }

  /** Logout of the app
  */
  logoutCB() {
    axios.post('/logout', {}).then((res) => {
      console.log('successful logout');
      window.location ='/';
    })
    .catch((err) => {
      console.log('error during logout');
    });
  }

  render() {return(
    <div id="container">
      <NaviBar loggedIn={this.props.loggedIn} loginCB={this.loginCB.bind(this)} creatAcctCB={this.createAcctCB.bind(this)} logoutCB={this.logoutCB.bind(this)}/>
      <SampleLibrary samples={this.state.samples} sampleClick={this.sampleClickHandler}/>
      <ControlPanel loggedIn={this.props.loggedIn} samples={this.state.samples} togglePlay={this.updatePlay}/>
      <SoundBoard sequence={this.state.sequence} cellClick={this.cellClickHandler} registerClick={this.registerClickHandler}/>
    </div> )
  }
}

/**
* Routes is setup so that Main component is able to render slightly differently for these 3 situations
*  Not logged in at root /; demo mode only
*  Logged in to /member; can save and share sequences
*    If loggedIn===true, Main component should render extra things such as User's saved seqeunces in a list
*    on the righthand side
*    Also, the top navbar should change to a "logout" button
*  Sharing /users/:username/:sequenceName; same as demo mode but with shared sequence loaded on the player
* @constructor
*/
const
Routes = () =>(
  <Router>
  <Switch>
    <Route exact path="/" render={() => <Main loggedIn={false}/>}/>
    <Route exact path="/member" render={() => <Main loggedIn={true}/>}/>
    <Route exact path="/users/:username/:sequenceName" render={(props) => <Main loggedIn={false} username={props.match.params.username} sequenceName={props.match.params.sequenceName}/>}/>
  </Switch>
</Router> )

ReactDOM.render(<Routes></Routes>,document.getElementById('main'));
