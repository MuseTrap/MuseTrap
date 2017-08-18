import React from 'react';
import SampleSound from './SampleSound.jsx';

var SampleSoundBoard = (props) => {
  return (
    <div className="container">
      {props.samples.map((sound, index)=>{
        return <SampleSound sound={sound} key={index} index={index} sampleClick={props.sampleClick}/>;
      })}
    </div>
  );
};

export default SampleSoundBoard;
