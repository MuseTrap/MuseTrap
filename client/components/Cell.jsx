import React from 'react';

var Cell = (props) => {
  return (
  	<div className="col-xs-3 col-md-1 bg-info" onClick={()=>{props.cellClick(props.rowIndex, props.colIndex)}}>{props.cell}</div>
  );
};

export default Cell;
