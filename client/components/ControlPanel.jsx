import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

/** Control panel behavior
 * States:
 * Whether song is playing or paused or stopped
 * Whether play button is the triangle or pause symbol
 * //Whether play visualizer is visible or invisible
 * //Whether play visualizer is still or moving
 * Whether loop is toggled ON or OFF
 * @constructor
 */

var ControlPanel = (props) => {
  // console.log("PROPS", props);
 
  var playStyle = {
    display: 'inline' 
  };

  // var saveButton = <Button style={{display: 'inline'}}> Save </Button>;
  // var shareButton = <Button style={{display: 'inline'}}> Share </Button>;
  var saveButton = props.loggedIn &&
    <Button bsStyle="primary" bsSize="large" active
      onClick={()=>{props.saveClicked()}}>save</Button>;
  var shareButton = props.loggedIn &&
    <Button bsStyle="primary" bsSize="large" active
      onClick={()=>{props.shareClicked()}}>share</Button>;
  return (
    <div className="row">
      <ButtonToolbar>
        <ButtonGroup>
          <Button style={playStyle} bsStyle='primary' bsSize="large" active
            onClick={()=>{props.playClicked()}}><Glyphicon glyph="play"/></Button>
          <Button bsStyle="primary" bsSize="large" active
            onClick={()=>{props.stopClicked()}}><Glyphicon glyph="stop"/></Button>
          <Button bsStyle={props.loopButton? "success" : "default"} bsSize="large" active
            onClick={()=>{props.loopClicked()}}><Glyphicon glyph="repeat"/></Button>
          {saveButton}
          {shareButton}
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  );

};

export default ControlPanel;