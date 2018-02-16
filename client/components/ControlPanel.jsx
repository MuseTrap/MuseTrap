import React from 'react';
import { FaPlay, FaStop, FaRepeat } from 'react-icons/lib/fa/';

/** Control panel behavior
 * States:
 * Whether song is playing or paused or stopped
 * Whether play button is the triangle or pause symbol
 * //Whether play visualizer is visible or invisible
 * //Whether play visualizer is still or moving
 * Whether loop is toggled ON or OFF
 * @constructor
 */

var ControlPanel = props => {
  var saveButton = props.loggedIn && (
    <button
      style={textBtn}
      onClick={() => {
        props.saveClicked();
      }}>
      Save
    </button>
  );

  let primary = {
    backgroundColor: '#0062cc',
    borderRadius: '3px',
    color: 'white',
    minWidth: '80px',
    border: ' solid 1px #0056b2',
    marginRight: '3px'
  };

  let success = {
    backgroundColor: '#2fc12f',
    borderRadius: '3px',
    minWidth: '80px',
    color: 'white',
    border: 'solid 1px #28a628',
    marginRight: '3px'
  };

  return (
    <div className="container">
      <div className="row" style={{ justifyContent: 'center' }}>
        <button
          style={props.playstatus ? success : primary}
          onClick={() => {
            props.playClicked();
          }}>
          <FaPlay />
        </button>
        <button
          style={primary}
          onClick={() => {
            props.stopClicked();
          }}>
          <FaStop />
        </button>
        <button
          style={props.loopButton ? success : primary}
          onClick={() => {
            props.loopClicked();
          }}>
          <FaRepeat />
        </button>
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '0px',
            color: 'white',
            fontSize: '1.6em',
            textAlign: 'right'
          }}>
          {props.bpm} BPM
        </div>
        {saveButton}
        <input
          style={{
            backgroundColor: 'rgba(255, 255, 255, .6)',
            border: '0',
            height: '31px',
            minWidth: '120px',
            paddingLeft: '10px'
          }}
          id="bpm"
          type="number"
          name="bpm"
          min="60"
          max="999"
          placeholder="Adjust BPM..."
        />
        <button
          style={primary}
          onClick={() => {
            props.changeBPM();
          }}>
          Update
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
