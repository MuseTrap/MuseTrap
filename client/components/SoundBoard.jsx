import React from 'react';
import Row from './Row.jsx';
// import CellHead from './CellHead.jsx';
// import Cells from './Cells.jsx';

var SoundBoard = (props) => {

	return (
		<div>
			<table>
				<tbody>
					{
						props.sequence.map((row)=>{
							return <Row beat={row.beat} row={row.row} />
						})
					}
				</tbody>
			</table>
		</div>
	);
}

export default SoundBoard;

