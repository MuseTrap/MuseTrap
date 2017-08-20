import React from 'react';
import Row from './Row.jsx';

var SoundBoard = (props) => {

	return (
		<div className="container"> {
				props.sequence.map((row, index)=>{
					var soundId = undefined;
					if (props.samples[row.beat]) {
						soundId = props.samples[row.beat].sampleId;
					}
					
					return <Row
						soundId={soundId}
						sample={props.samples[soundId]}
						unregister={props.unregisterDoubleClick}
						beat={row.beat} 
						row={row.row} 
						registerClick={props.registerClick} 
						cellClick={props.cellClick} 
						key={index} 
						rowIndex={index}/>
				})
			}
		</div>
	);
}

export default SoundBoard;
