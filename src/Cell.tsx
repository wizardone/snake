import React from 'react';
import './Cell.css';

const Cell: React.FC<{key: number, x: number, y: number}> = ({key, x, y}) => {
	return (
		<div className={'cell'}></div>
	)
}

export default Cell;
