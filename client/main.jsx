import React from 'react';
import ReactDOM from 'react-dom';
//import Library from './components/Library.jsx';
//import Control from './components/Control.jsx';
//import SoundBoard from './components/SoundBoard.jsx';

class Main extends React.Component {

	constructor(props) {
		this.state = {
			sequence: {
				beats: [],
				bpm: 120,
				sequence: 
				[
					[0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0]
				]
			}
		}
	}
	componentDidMount() {

	}

	render() {
		return (
			<div>
				
			</div>
		)
	}

}

ReactDOM.render(<Main />, document.getElementById('main'));
