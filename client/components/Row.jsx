import React from 'react';

import CellHead from './CellHead.jsx';
import Cells from './Cells.jsx';


var Row = (props) => {
  return (
  	<tr>
  		<CellHead /><Cells />
  	</tr>
  	

  );

};

export default Row;
