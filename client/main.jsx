import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';

import NaviBar from './components/NaviBar.jsx';
import ControlPanel from './components/ControlPanel.jsx';
import SoundBoard from './components/SoundBoard.jsx';

/** Main component behavior
 * States:
 * Sequence object to describe the song
 * @constructor
 */
class Main extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			sequence: {
				beats: [undefined, undefined, undefined, undefined],
				bpm: 120,
				sequenceRows:

				[
					[0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0]
				]
			}
		};
	}
	componentDidMount() {
    console.log('props including react router props are,', this.props);
	}

  /** Login to the app
  * @param {string} username
  * @param {string} password
  */
  loginCB(username, password) {
    axios.post('/login', {
      username: username,
      password: password
    })
    .then((res) => {
      console.log('successful login');
      window.location = '/member';
    })
    .catch((err) => {
      console.log('error during login');
    });
  }

  /** Create new account for the app
  * @param {string} username
  * @param {string} password
  */
  createAcctCB(username, password) {
    axios.post('/createuser', {
      username: username,
      password: password
    })
    .then((res) => {
      console.log('successful acct creation');
      window.location = '/member';
    })
    .catch((err) => {
      console.log('error during acct creation');
    });
  }

  /** Logout of the app
  */
  logoutCB() {
    axios.post('/logout', {})
    .then((res) => {
      console.log('successful logout');
      window.location = '/';
    })
    .catch((err) => {
      console.log('error during logout');
    });
  }

  render() {
    return (
      <div id="container">
        <NaviBar
          loggedIn={this.props.loggedIn}
          loginCB={this.loginCB.bind(this)}
          creatAcctCB={this.createAcctCB.bind(this)}
          logoutCB={this.logoutCB.bind(this)}
        />
      	Main-SoundBoard
				<SoundBoard />
				<ReactHowler
	         src = './audio_files/Kick_Clicky.wav'
	         playing={true}
	       />
        <ControlPanel
          loggedIn={this.props.loggedIn}
        />
      </div>
    )
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
const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={()=> <Main loggedIn={false}/>}/>
      <Route exact path="/member" render={()=> <Main loggedIn={true}/>}/>
      <Route exact path="/users/:username/:sequenceName"
        render={(props)=>
          <Main
            loggedIn={false}
            username={props.match.params.username}
            sequenceName={props.match.params.sequenceName}
          />}
      />
    </Switch>
  </Router>
)

ReactDOM.render(<Routes></Routes>, document.getElementById('main'));
