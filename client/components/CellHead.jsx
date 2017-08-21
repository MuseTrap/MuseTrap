import React from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

var CellHead = (props) => {
	var name;
	var remove;
	if (props.sample) {
		name = props.sample.name;
		remove = <Glyphicon glyph="remove-circle" onClick={ () => {props.unregisterSample(props.rowIndex)}}/>
	}
	return (
		<div
			className="col-xs-4 col-lg-4 bg-success"
		>
			{props.sample ? name : 'Undefined'}
			{remove}
		</div>
	)

}

export default CellHead;
