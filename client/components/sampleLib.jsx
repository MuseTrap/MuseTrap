import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

 class SampleLibrary extends React.Component {
  constructor(props){
  	super(props);
  }

  render(){
  	return (
      //table of buttons
      //sounds loaded from library database
      //plays sound from howl related to each button
      <ButtonToolbar>
        <ToggleButtonGroup> bsSize="small" <span class="glyphicons glyphicons-music-alt"></span>
          <Button>Sound1</Button>
          <Button>Sound2</Button>
          <Button>Sound3</Button>
          <Button>Sound4</Button>
        </ToggleButtonGroup>
      </ButtonToolbar>
  	)
  }
}

ReactDOM.render(<SampleLibrary/>, document.getElementById('main'));

export default SampleLibrary;