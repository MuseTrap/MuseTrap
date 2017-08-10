import React from 'react';
import ReactDOM from 'react-dom';
// import Library from './components/Library.jsx';
// import Control from './components/Control.jsx';
import SoundBoard from './components/SoundBoard.jsx';
import ReactHowler from 'react-howler';

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

ReactDOM.render(<Main />, document.getElementById('main'));
