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
  var buttonToolBarStyle = {
    'marginLeft': '100px'
  };

  // var saveButton = <Button style={{display: 'inline'}}> Save </Button>;
  // var shareButton = <Button style={{display: 'inline'}}> Share </Button>;
  var saveButton = props.loggedIn &&
    <Button bsStyle="primary" bsSize="large" active
      onClick={()=>{props.saveClicked()}}>save</Button>;
  return (
    <div className="row">
      <ButtonToolbar style={buttonToolBarStyle}>

        <Button bsStyle={props.playstatus ? "warning" : "primary" } bsSize="large" active
          onClick={()=>{props.playClicked()}}><Glyphicon glyph="play"/></Button>
        <Button bsStyle="primary" bsSize="large" active
          onClick={()=>{props.stopClicked()}}><Glyphicon glyph="stop"/></Button>
        <Button bsStyle={props.loopButton? "warning" : "success"} bsSize="large" active
          onClick={()=>{props.loopClicked()}}><Glyphicon glyph="repeat"/></Button>
        <div className="col-lg-1">BPM {props.bpm}</div>
        <input id="bpm" className="col-lg-1" type="number" name="bpm" min="60" max="999" />
        <input className="col-lg-1" type="submit" value="Change" onClick={()=>{props.changeBPM()}} /> 
        {saveButton}
      </ButtonToolbar>
    </div>
  );

};

export default ControlPanel;