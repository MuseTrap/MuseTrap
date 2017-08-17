import React from 'react';

var CellHead = (props) => {

	return (
		<div className="col-lg-1 bg-success" onClick={()=>{props.registerClick(props.rowIndex)}}>
			{props.beat || 'Undefined'}
		</div>
	)

}

export default CellHead;