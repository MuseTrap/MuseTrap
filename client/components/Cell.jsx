import React from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

var Cell = (props) => {
  var icon;
  if (props.cell === 1) {
    icon = (<Glyphicon glyph="stop" className={`color${props.rowIndex + 1}Font-pulse`}/>);
  } else{
    icon = (<Glyphicon glyph="unchecked" />);
  }
  if(props.playingIndex === props.colIndex && props.cell === 1) {
    icon = (<Glyphicon glyph="stop" className={`color${props.rowIndex + 1}-pulse btnPulseOnce `}/>);
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
