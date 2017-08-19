import React from 'react';
import Row from './Row.jsx';

var SoundBoard = (props) => {

	return (
		<div className="container"> {
			props.sequence.map((row, index)=>{
				return (
					<Row
						sample={row.sample}
						row={row.row}
						registerClick={props.registerClick}
						cellClick={props.cellClick}
						key={index}
						rowIndex={index}
						removeSample={props.removeSample}
					/>
				)
			})
		}
		</div>
	);
}

export default SoundBoard;
