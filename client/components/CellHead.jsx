import React from 'react';
import { FaClose } from 'react-icons/lib/fa/';

var CellHead = props => {
  var name;
  var remove;
  if (props.sample) {
    name = props.sample.name;
    remove = (
      <FaClose
        onClick={() => {
          props.unregisterSample(props.rowIndex);
        }}
      />
    );
  }
  return (
    <div style={{ textAlign: 'right', color: 'white', minWidth: '120px' }}>
      {props.sample ? name : 'Add Sound'}
      <span style={{ paddingLeft: '10px' }}>{remove}</span>
    </div>
  );
};

export default CellHead;
