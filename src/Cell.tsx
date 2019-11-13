import React from 'react';
import './Cell.css';

export type CellProps = {
	key: number,
	x: number,
	y: number,
	apple?: boolean,
	snake?: boolean
}

export const Cell: React.FC<CellProps> = ({key, x, y, apple, snake}) => {
	const className = (): string => {
		if(apple) {
			return 'cell-apple'
		} else if(snake) {
			return 'cell-snake'
		} else {
			return 'cell'
		}
	}

	return (
		<div className={className()}></div>
	)
}
