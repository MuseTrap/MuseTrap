import React from 'react';
import SampleSound from './SampleSound.jsx';
import ReactHowler from 'react-howler';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

var SampleLibrary = (props) => {
  console.log("PROPS", props);
  return (
    <div className="container">
      {
        props.samples.map( (sound, index) => {
        return <div key={index} onClick={() => {props.sampleClick(index)}}>
            <Glyphicon glyph="play" />
            <ReactHowler preload={true} src={sound.source} playing={sound.playing} />
          </div>
        })
      }
    </div>
  );
};

export default SampleLibrary;
