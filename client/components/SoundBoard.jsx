import React from 'react';
import Row from './Row.jsx';

var SoundBoard = (props) => {
	return (
		<div className="container"> {
				props.sequence.map((row, index)=>{
					var soundId = undefined;
					if (props.samples[row.sampleIndex]) {
						soundId = props.samples[row.sampleIndex].sampleId;
					}

					return (
						<Row
							soundId={soundId}
							sampleIndex={row.sampleIndex}
							sample={props.samples[row.sampleIndex]}
							row={row.row}
							registerSample={props.registerSample}
							unregisterSample={props.removeSample}
							toggleCell={props.toggleCell}
							key={index}
							rowIndex={index}
						/>
					)
				})
			}
		</div>
	);
}

export default SoundBoard;
