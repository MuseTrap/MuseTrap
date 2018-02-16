import React from 'react';
import Row from './Row.jsx';

var SoundBoard = props => {
  return (
    <div
      className="container"
      style={{ paddingTop: '10px', paddingBottom: '10px' }}>
      {' '}
      {props.sequence.map((row, index) => {
        var soundId = undefined;
        if (props.samples[row.sampleIndex]) {
          soundId = props.samples[row.sampleIndex].sampleId;
        }

        return (
          <Row
            className={`color${index + 1}-font row`}
            soundId={soundId}
            sampleIndex={row.sampleIndex}
            sample={props.samples[row.sampleIndex]}
            row={row.row}
            registerSample={props.registerSample}
            unregisterSample={props.removeSample}
            toggleCell={props.toggleCell}
            key={index}
            rowIndex={index} //index
            playingIndex={props.playingIndex}
          />
        );
      })}
    </div>
  );
};

export default SoundBoard;
