import React from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';


var CellHead = (props) => {
	var remove;
	if (props.sample) { remove = <Glyphicon glyph="remove-circle" onClick={ () => {props.removeSample(props.rowIndex)}}/> }
	return (

		<div className="col-xs-3 col-md-1 bg-success" onClick={() => {props.registerClick(props.rowIndex)}}>
			{props.sample ? props.sample.name : 'Undefined'}
			{remove}
		</div>
	)

}

export default CellHead;
