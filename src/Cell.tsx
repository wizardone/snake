import React from 'react';
import './Cell.css';

export interface CellProps {
	key: number,
	x: number,
	y: number
}

export const Cell: React.FC<CellProps> = ({key, x, y}) => {
	return (
		<div className={'cell'}></div>
	)
}
