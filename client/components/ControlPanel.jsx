import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

/** Control panel behavior
 * States:
 * Whether song is playing or paused or stopped
 * Whether play button is the triangle or pause symbol
 * //Whether play visualizer is visible or invisible
 * //Whether play visualizer is still or moving
 * Whether loop is toggled ON or OFF
 * @constructor
 */
class ControlPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      playstatus: 'stopped', //'playing', 'paused', or 'stopped'
      //wavyThingVisible: false,
      //wavyThingMoving: false,
      loopButton: false
    };
  }

  /**When play button triangle logo is clicked
  * change image from triangle to pause button
  * change play visualizer to visible+moving if was stopped
  * TBD: change play visualizer to moving if was paused
  * Run Main callback to "play"
  * play sounds starting from time 0 OR last pause (Assume that Main component keeps track of last time)
  */
  playClicked() {
    this.setState({
      playstatus: 'playing'
    });
    //this.props.playCB();
  }

  /**When pause symbol is clicked
    change image from pause to triangle button
    //Make the play visualizer still visible but stop moving/animating
    Run Main callback to "pause"
      pause play at timeX at the Main component level */
  pauseClicked() {
    this.setState({
      playstatus: 'paused'
    });
    //this.props.pauseCB();
  }

  /**When the stop button is clicked (or when song ends without loop?????????????????????)
    change play button image to triangle button
    //change play visualizer to invisible and not moving
    Leave loop button alone */
  stopClicked() {
    this.setState({
      playstatus: 'stopped'
    });
    //this.props.stopCB();
  }

  /**When the loop button is clicked
    toggle loop button to lightup or lightoff
    Run Main callback to toggle looping*/
  loopClicked() {
    this.setState({
      loopButton: !this.state.loopButton
    });
    //this.props.toggleLoop();
  }

  /**When the save button is clicked
    Run Main callback to "save"*/
  saveClicked() {
    //this.props.save();
  }

  /**When the share button is clicked
    Run Main callback to "share"*/
  shareClicked() {
    //this.props.share();
  }

  render() {
    var playStyle = {
      display: (this.state.playstatus === 'paused') || (this.state.playstatus === 'stopped') ? 'inline' : 'none'
    };
    var pauseStyle = {
      display: this.state.playstatus === 'playing' ? 'inline' : 'none'
    };
    var saveButton = <Button style={{display: 'none'}}> dummyButton </Button>;
    var shareButton = <Button style={{display: 'none'}}> dummyButton </Button>;
    if (this.props.loggedIn) {
      saveButton =
        <Button bsStyle="primary" bsSize="large" active
          onClick={()=>{this.saveClicked()}}>save</Button>;
      shareButton =
        <Button bsStyle="primary" bsSize="large" active
          onClick={()=>{this.shareClicked()}}>share</Button>;
    }
    return (
      <div>
        <ButtonToolbar>
          <ButtonGroup>
            <Button style={playStyle} bsStyle={this.state.playstatus === 'paused' ? 'warning' : 'primary'} bsSize="large" active
              onClick={()=>{this.playClicked()}}>|></Button>
            <Button style={pauseStyle} bsStyle="warning" bsSize="large" active
              onClick={()=>{this.pauseClicked()}}>||</Button>
            <Button bsStyle="primary" bsSize="large" active
              onClick={()=>{this.stopClicked()}}>[]</Button>
            <Button bsStyle={this.state.loopButton? "success" : "default"} bsSize="large" active
              onClick={()=>{this.loopClicked()}}>loop</Button>
            {saveButton}
            {shareButton}
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    );
  }
}

export default ControlPanel;