import React from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

var Cell = (props) => {
  var icon;
  if (props.cell === 0) {
    icon = (<Glyphicon glyph="unchecked" />);
  } else {
    icon = (<Glyphicon glyph="stop" className={`color${props.rowIndex + 1}Font-pulse btnPulseOnce `}/>);
  }
  return (
  	<div
  		style={{'textAlign':'center'}}
      className={`col-xs-1` }
      onClick={ () => { props.toggleCell(props.rowIndex, props.colIndex) }}
    >
      {icon}
    </div>
  );
};

export default Cell;
