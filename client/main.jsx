import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Howler from 'howler';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
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
      intervalId: undefined, // interval id for SoundBoard loop
      playstatus: 'stopped', //'playing', 'paused', or 'stopped'
      loopButton: false,
      samples: [],
      bpm: 120, // moved bpm outside of sequence to make it modular
      sequence: [
        {
          sampleIndex: undefined, // index from the SampleLibrary setup during ComponentDidMount
          row: [ 0, 0, 0, 0, 0, 0, 0, 0 ]
        },
        {
          sampleIndex: undefined,
          row: [ 0, 0, 0, 0, 0, 0, 0, 0 ]
        },
        {
          sampleIndex: undefined,
          row: [ 0, 0, 0, 0, 0, 0, 0, 0 ]
        },
        {
          sampleIndex: undefined,
          row: [ 0, 0, 0, 0, 0, 0, 0, 0 ]
        }
      ]
    };
    //session binds
    this.loginCB = this.loginCB.bind(this);
    this.createAcctCB = this.createAcctCB.bind(this);
    this.logoutCB = this.logoutCB.bind(this);

    //ControlPanel binds
    this.playClicked = this.playClicked.bind(this);
    this.pauseClicked = this.pauseClicked.bind(this);
    this.stopClicked = this.stopClicked.bind(this);
    this.loopClicked = this.loopClicked.bind(this);
    this.saveClicked = this.saveClicked.bind(this);
    this.shareClicked = this.shareClicked.bind(this);
    this.playSequence = this.playSequence.bind(this);

    // SoundLibrary binds
    this.playSampleFromLibrary = this.playSampleFromLibrary.bind(this);
    this.addSampleToBoard = this.addSampleToBoard.bind(this);

    // SoundBoard binds
    this.removeSampleFromBoard = this.removeSampleFromBoard.bind(this);
    this.toggleSoundOnBoard = this.toggleSoundOnBoard.bind(this);
  }

  /** When you doubleClick on a sample in the sampleLibrary, this function updates the sequence state adding it to the SoundBoard
    @param {number} indexOfSampleClicked
  */
  addSampleToBoard(sampleClicked) {
    for (var i = 0; i < this.state.sequence.length; i++) {
      if (this.state.sequence[i].sampleIndex === undefined) {
        var newSequence = Object.assign([], this.state.sequence);
        newSequence[i].sampleIndex = sampleClicked;
        this.setState({sequence: newSequence});
        break;
      }
    }
  }

  /** When you click on the X next to a sample name in the soundboard, this function removes the sample from the sequence and soundboard
     @param {number} indexOfSampleClicked
  */
  removeSampleFromBoard(sampleClicked) {
    var newSequence = Object.assign([], this.state.sequence);
    newSequence[sampleClicked].sampleIndex = undefined;
    this.setState({sequence: newSequence});
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
  toggleSoundOnBoard( row, col) {
    console.log(`clicked at ${row}, ${col}`);
    if (this.state.sequence[row].sampleIndex) {
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

  }

  componentDidMount() {
    console.log('props including react router props are,', this.props);

    var sampleLibrary = [
      { sampleId: 0, name: 'bass', url: './audio_files/sound-bass.wav'},
      { sampleId: 1, name: 'clap', url: './audio_files/sound-electronicClap.wav'},
      { sampleId: 2, name: 'hat1', url: './audio_files/sound-hat.wav'},
      { sampleId: 3, name: 'hat2', url: './audio_files/sound-hat2.wav'},
      { sampleId: 4, name: 'kick1', url: './audio_files/sound-kick.wav'},
      { sampleId: 5, name: 'kick2', url: './audio_files/sound-kick2.wav'},
      { sampleId: 6, name: 'kick3', url: './audio_files/sound-kick3.wav'},
      { sampleId: 7, name: 'percussion', url: './audio_files/sound-percussion.wav'},
      { sampleId: 8, name: 'pluck', url: './audio_files/sound-pluck.wav'},
      { sampleId: 9, name: 'snap', url: './audio_files/sound-snap.wav'},
      { sampleId: 10, name: 'snare', url: './audio_files/sound-snare.wav'},
      { sampleId: 11, name: 'speedy', url: './audio_files/sound-speedy.wav'},
      { sampleId: 12, name: 'synth', url: './audio_files/sound-synth.wav'},
      { sampleId: 13, name: 'trumpet', url: './audio_files/sound-trumpet.wav'},
      { sampleId: 14, name: 'vocal', url: './audio_files/sound-vocal.wav'},
      { sampleId: 15, name: 'yea', url: './audio_files/sound-vocoder.wav'}
    ];

    /** Loops over the sampleLibrary and returns each as a Howl object with methods
    */
    sampleLibrary = sampleLibrary.map( (sample, index) => {
      var newObj =  new Howl({
        src: [sample.url],
        autoplay: false,
        loop: false,
        onload:function(){
          // console.log(sample, "LOADED");
        },
        onend: function() {
          // console.log('Finished!');
        }
      });
      newObj.name = sample.name;
      newObj.sampleId = index;
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
      console.log('error during acct creation', err);
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


  /** Clicking the play button will toggle between play and pause
  change play visualizer to visible+moving if was stopped
   change play visualizer to moving if was paused
  Run Main callback to "play"
  play sounds starting from time 0 OR last pause (Assume that Main component keeps track of last time)
  */

  playClicked() {
    this.setState({
      playstatus: 'playing'
    });

    this.playSequence();
    if (this.state.loopButton) {
      this.state.intervalId = setInterval(()=>{
        this.playSequence();
      }, (30/this.state.bpm*1000)*8);

    }
    //this.props.playCB();
  }

  /** Clicking the pause button will toggle between play and pause
  //Make the play visualizer still visible but stop moving/animating
  Run Main callback to "pause"
  pause play at timeX at the Main component level */
  pauseClicked() {
    // this.updatePlay(false);
    this.setState({
      playstatus: 'paused'
    });

    //this.props.pauseCB();
  }
  /** Clicking the stop button will stops the sound
    change the play button image to triangle button
    change play visualizer to invisible and not moving
    Leave loop button alone
  */
  stopClicked() {
    // this.updatePlay(false);
    this.setState({
      playstatus: 'stopped'
    });
    clearInterval(this.state.intervalId);
    //this.props.stopCB();
  }

  /** Clicking the loop button will toggle between on or off (CURRENTLY NOT WORKING)
    Run Main callback to toggle looping
  */
  loopClicked() {
    // this.updatePlay(false);
    this.setState({
      loopButton: !this.state.loopButton
    });
    if (this.state.loopButton) {
      clearInterval(this.state.intervalId);
    }
    //this.props.toggleLoop();
  }
  /**When the save button is clicked
    Run Main callback to "save"
  */
  saveClicked() {
    //this.props.save();
    console.log('Save Clicked');
  }
  /**When the share button is clicked
    Run Main callback to "share"
  */
  shareClicked() {
    //this.props.share();
    console.log('Share Clicked');
  }
  /** Plays current sequence. If loop is true, then play with interval.

  */
  playSequence() {
    this.state.sequence.forEach((sequence, sequenceIndex) => {
      if (sequence.sampleIndex !== undefined) {
        sequence.row.forEach((item, rowIndex) => {
          if (item === 1) {
            setTimeout( () => {
              this.state.samples[this.state.sequence[sequenceIndex].sampleIndex].play();
            }, (30 / this.state.bpm * 1000) * rowIndex);
          }
        });
      }
    });
  }
  /** Handles double click. Stages beat to register if beatToRegister in undefined. if defined, changes to undefined
    @param {number} index
  */
  sampleDoubleClickHandler(index) {
    console.log('Double click: ', index );
    if (this.state.beatToRegister === undefined) {
      this.setState({
        beatToRegister: index
      });
    } else {
      this.setState({
        beatToRegister: undefined
      });
    }

  }
  /** When register column is double clicked, it unregisters sound for the row if row is registered

    @param {number} index
  */
  unregisterDoubleClickHandler(index) {
    console.log('Double Clicked to Unregister row: ', index);
    if (this.state.sequence[index].beat!==undefined) {
      this.state.sequence[index].beat=undefined;
      this.state.sequence[index].row=[0,0,0,0,0,0,0,0];
      this.setState({
        sequence: this.state.sequence
      });
    }
  }

  render() {return(
    <div id="container">
      <NaviBar
        loggedIn={this.props.loggedIn}
        loginCB={this.loginCB}
        creatAcctCB={this.createAcctCB}
        logoutCB={this.logoutCB}
      />
      <SampleLibrary
        beatToRegister={this.state.beatToRegister}
        samples={this.state.samples}
        playSample={this.playSampleFromLibrary}
        registerSample={this.addSampleToBoard}

      />
      <ControlPanel
        playstatus={this.state.playstatus}
        loggedIn={this.props.loggedIn}
        samples={this.state.samples}
        playClicked={this.playClicked}
        pauseClicked={this.pauseClicked}
        stopClicked={this.stopClicked}
        loopClicked={this.loopClicked}
        saveClicked={this.saveClicked}
        shareClicked={this.shareClicked}

      />

      <SoundBoard
        samples={this.state.samples}
        sequence={this.state.sequence}
        toggleCell={this.toggleSoundOnBoard}
        removeSample={this.removeSampleFromBoard}
      />
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
