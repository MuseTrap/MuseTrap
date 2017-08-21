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


  // var saveButton = <Button style={{display: 'inline'}}> Save </Button>;
  // var shareButton = <Button style={{display: 'inline'}}> Share </Button>;
  var saveButton = props.loggedIn &&
    <Button bsStyle="primary" bsSize="large" active
      onClick={()=>{props.saveClicked()}}>save</Button>;
  return (
    <div className="container">
      <div className="row">

        <Button bsStyle={props.playstatus ? "warning" : "primary" } bsSize="large" active
          onClick={()=>{props.playClicked()}}><Glyphicon glyph="play"/></Button>
        <Button bsStyle="primary" bsSize="large" active
          onClick={()=>{props.stopClicked()}}><Glyphicon glyph="stop"/></Button>
        <Button bsStyle={props.loopButton? "warning" : "success"} bsSize="large" active
          onClick={()=>{props.loopClicked()}}><Glyphicon glyph="repeat"/></Button>
        {saveButton}
        <span style={{margin: '0 10px'}}>BPM {props.bpm}</span>
        <input className="col-lg-1" id="bpm"  type="number" name="bpm" min="60" max="999" />
        <input className="col-lg-1" type="submit" value="Update BPM" onClick={()=>{props.changeBPM()}} />

      </div>
    </div>
  );

};

export default ControlPanel;
