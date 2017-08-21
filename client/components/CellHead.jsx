import React from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

var CellHead = (props) => {
	var remove;
	if (props.sampleIndex) {
		remove = <Glyphicon glyph="remove-circle" onClick={ () => {props.unregisterSample(props.rowIndex)}}/>
	}
	return (
		<div
			className="col-xs-4 col-lg-4 bg-success"
		>
			{props.sampleIndex ? props.samples[props.sampleIndex].name : 'Undefined'}
			{remove}
		</div>
	)

}

export default CellHead;
