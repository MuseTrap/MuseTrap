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
		<div className="col-xs-3 col-md-offset-1 col-sm-2" style={{'textAlign':'right', 'color': 'white'}}>
			{props.sample ? name : 'Add Sound'}
			<span style={{'paddingLeft':'10px'}}>{remove}</span>
		</div>
	)

}

export default CellHead;
