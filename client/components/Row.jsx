import React from 'react';

import CellHead from './CellHead.jsx';
import Cell from './Cell.jsx';

var Row = (props) => {

  return (
  	<div className="row">
  		<CellHead
        sample={props.sample}
        registerClick={props.registerClick}
        rowIndex={props.rowIndex}
        removeSample={props.removeSample}
      />
  		{props.row.map(
  			(cell, index) => {
  				return (
            <Cell
              cell={cell}
              cellClick={props.cellClick}
              key={index}
              rowIndex={props.rowIndex}
              colIndex={index}
            />
          )
  		  })
  	  }
    </div>
  );
};

export default Row;
