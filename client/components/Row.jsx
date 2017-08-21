import React from 'react';

import CellHead from './CellHead.jsx';
import Cell from './Cell.jsx';

var Row = (props) => {
  return (
  	<div className="row">
  		<CellHead
        sample={props.sample}
        soundId={props.soundId}
        sampleIndex={props.sampleIndex}
        registerSample={props.registerSample}
        rowIndex={props.rowIndex}
        unregisterSample={props.unregisterSample}
      />
  		{props.row.map(
  			(cell, index) => {
  				return (
            <Cell
              cell={cell}
              toggleCell={props.toggleCell}
              key={index}
              rowIndex={props.rowIndex}
              colIndex={index}
            />
          )
      })
  	}</div>
  );
};

export default Row;
