import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Howler from 'howler';

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
      samples: [],
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
    this.playSampleFromLibrary = this.playSampleFromLibrary.bind(this);
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

  /** Triggers when you click on a sample in the sampleLibrary.
    @param {number} indexOfSampleClicked
  */
  playSampleFromLibrary(sampleClicked) {
    console.log(`Sample sound ${sampleClicked} clicked`);
    this.state.samples[sampleClicked].play();
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

    var sampleLibrary = [
      { name: 'bass', url: './audio_files/sound-bass.wav'},
      { name: 'clap', url: './audio_files/sound-electronicClap.wav'},
      { name: 'hat', url: './audio_files/sound-hat.wav'},
      { name: 'hat', url: './audio_files/sound-hat2.wav'},
      { name: 'kick', url: './audio_files/sound-kick.wav'},
      { name: 'kick', url: './audio_files/sound-kick2.wav'},
      { name: 'kick', url: './audio_files/sound-kick3.wav'},
      { name: 'percussion', url: './audio_files/sound-percussion.wav'},
      { name: 'pluck', url: './audio_files/sound-pluck.wav'},
      { name: 'snap', url: './audio_files/sound-snap.wav'},
      { name: 'snare', url: './audio_files/sound-snare.wav'},
      { name: 'speedy', url: './audio_files/sound-speedy.wav'},
      { name: 'synth', url: './audio_files/sound-synth.wav'},
      { name: 'trumpet', url: './audio_files/sound-trumpet.wav'},
      { name: 'vocal', url: './audio_files/sound-vocal.wav'},
      { name: 'yea', url: './audio_files/sound-vocoder.wav'}
    ];

    /** Loops over the sampleLibrary and returns each as a Howl object with methods
    */
    sampleLibrary = sampleLibrary.map( sample => {
      var newObj =  new Howl({
        src: [sample.url],
        autoplay: false,
        loop: false,
        onload:function(){
          console.log(sample, "LOADED");
        },
        onend: function() {
          console.log('Finished!');
        }
      });
      newObj.name = sample.name;
      return newObj;
    })

    this.setState({samples: sampleLibrary})
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
      <SampleLibrary samples={this.state.samples} sampleClick={this.playSampleFromLibrary}/>
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

//This event listener is needed or else the reactdom render will cause mocha test to fail
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Routes></Routes>, document.getElementById('main'));
});

export default Main;