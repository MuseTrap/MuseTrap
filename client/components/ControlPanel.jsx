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

  var textBtn = {padding: '3px'};
  var saveButton = props.loggedIn &&
    <Button className="col-xs-4 col-md-1" bsStyle="info" style={textBtn} active
      onClick={()=>{props.saveClicked()}}>Save
    </Button>;

  return (
    <div className="container">
      <div className="row">
        <Button
          className="col-xs-4 col-md-offset-3 col-md-1"
          bsStyle={props.playstatus ? "success" : "primary"}
          active
          onClick={()=>{props.playClicked()}}>
          <Glyphicon glyph="play"/>
        </Button>
        <Button
          className="col-xs-4 col-md-1"
          bsStyle="primary"
          active
          onClick={()=>{props.stopClicked()}}>
          <Glyphicon glyph="stop"/>
        </Button>
        <Button
          className="col-xs-4 col-md-1"
          bsStyle={props.loopButton? "success" : "primary"}
          active
          onClick={()=>{props.loopClicked()}}>
          <Glyphicon glyph="repeat"/>
        </Button>
        <div
          className="col-xs-6 col-sm-2"
          style={{'position': 'absolute', 'top': '60px', 'right': '0px', 'color': 'white', 'fontSize': '1.6em', 'textAlign': 'right'}} >
          {props.bpm} BPM
        </div>
        {saveButton}
        <input
          className="col-xs-4 col-md-2"
          style={{'backgroundColor': 'rgba(255, 255, 255, .6)', 'border': '0', height: '28px' }}
          id="bpm"
          type="number"
          name="bpm"
          min="60"
          max="999"
          placeholder="Adjust BPM..."/>
        <Button
          className="col-xs-4 col-md-1"
          style={textBtn}
          bsStyle={"primary"}
          active
          onClick={()=>{props.changeBPM()}}>
          Update
        </Button>

      </div>
    </div>
  );

};

export default ControlPanel;
