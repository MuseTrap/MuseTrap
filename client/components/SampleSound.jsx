import React from 'react';
var SampleSound = (props) => {

    return (
      <div className="col-lg-3 bg-primary" onClick={() => {props.sampleClick(props.index)}}>
        {`${props.sound.source} ${props.sound.playing}`}
      </div>

    );

};

export default SampleSound;
