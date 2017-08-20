import React from 'react';

var CellHead = (props) => {
	var name;
	if (props.sample) {
		name = props.sample.name;
	}
	return (
		<div className="col-lg-1 bg-success" onClick={()=>{props.registerClick(props.rowIndex)}} onDoubleClick={()=>{props.unregister(props.rowIndex)}}>
			{name || 'Undefined'}
		</div>
	)

}

export default CellHead;