import React from 'react';

import CellHead from './CellHead.jsx';
import Cell from './Cell.jsx';


var Row = (props) => {

  return (
  	<tr>
  		<CellHead beat={props.beat}/>
  		{props.row.map(
  			(cell)=>{
  				return <Cell cell={cell}/>;
  			})
  		}
  	</tr>
  );
};

export default Row;
