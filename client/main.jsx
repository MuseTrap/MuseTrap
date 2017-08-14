import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';

// import Library from './components/Library.jsx';
// import Control from './components/Control.jsx';
import ReactHowler from 'react-howler';
import SoundBoard from './components/SoundBoard.jsx';

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

  render() {
    return (
      <div id="container">
      	Main-SoundBoard
				<SoundBoard />
				<ReactHowler
	         src = './audio_files/Kick_Clicky.wav'
	         playing={true}
	       />
      </div>
    )
  }

}

//Routes is setup so that Main component is able to render slightly differently for these 3 situations
////Not logged in at root /; demo mode only
///Logged in to /member; can save and share sequences
///Sharing /users/:username/:sequenceName; same as demo mode but with shared sequence loaded on the player

//If loggedIn===true, Main component should render extra things such as User's saved seqeunces in a list
//on the righthand side
//Also, the top navbar should change to a "logout" button
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