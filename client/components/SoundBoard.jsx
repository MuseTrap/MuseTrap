import React from 'react';
import Row from './Row.jsx';

var SoundBoard = (props) => {

	return (
		<div className="container"> {
				props.sequence.map((row, index)=>{
					return <Row beat={row.beat} row={row.row} registerClick={props.registerClick} cellClick={props.cellClick} key={index} rowIndex={index}/>
				})
			}
		</div>
	);
}

export default SoundBoard;
