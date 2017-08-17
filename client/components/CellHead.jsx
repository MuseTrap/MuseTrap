import React from 'react';

var CellHead = (props) => {

	return (
		<td id="col-head">
			{props.beat || 'Undefined'}
		</td>
	)

}

export default CellHead;