import React from 'react';
import { FaSquareO, FaSquare } from 'react-icons/lib/fa/';

var Cell = props => {
  var icon;
  if (props.cell === 1) {
    icon = <FaSquare className={`color${props.rowIndex + 1}Font-pulse`} />;
  } else {
    icon = <FaSquareO />;
  }
  if (props.playingIndex === props.colIndex && props.cell === 1) {
    icon = (
      <FaSquare className={`color${props.rowIndex + 1}-pulse btnPulseOnce `} />
    );
  }
  return (
    <div
      style={{ textAlign: 'center', marginTop: '7px' }}
      onClick={() => {
        props.toggleCell(props.rowIndex, props.colIndex);
      }}>
      {icon}
    </div>
  );
};

export default Cell;
