import React from 'react';
import CellHead from './CellHead.jsx';
import Cell from './Cell.jsx';

var Row = props => {
  var rowStyle = {
    opacity: '1',
    display: 'flex',
    justifyContent: 'space-between'
  };
  if (props.soundId === undefined) {
    rowStyle = {
      color: 'white',
      opacity: '.3',
      display: 'flex',
      justifyContent: 'space-between'
    };
  }
  return (
    <div className={props.className} style={rowStyle}>
      <CellHead
        sample={props.sample}
        soundId={props.soundId}
        sampleIndex={props.sampleIndex}
        registerSample={props.registerSample}
        rowIndex={props.rowIndex}
        unregisterSample={props.unregisterSample}
      />
      {props.row.map((cell, index) => {
        return (
          <Cell
            cell={cell}
            toggleCell={props.toggleCell}
            key={index}
            rowIndex={props.rowIndex}
            colIndex={index}
            playingIndex={props.playingIndex}
          />
        );
      })}
    </div>
  );
};

export default Row;
