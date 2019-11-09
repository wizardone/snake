import React from 'react';
import './Board.css';
import { Cell, CellProps } from './Cell';

const Board: React.FC = () => {
	const TOTAL_CELLS: number = 400;

	const renderCells = () => {
		let cells: Array<React.FunctionComponentElement<CellProps>> = []
    for(let i: number = 1; i <= TOTAL_CELLS; i++) {
    	let x: number = i % 20
    	if(x === 0) x = 20
    	let y: number = Math.ceil(i / 20)
    	cells.push(<Cell key={i} x={x} y={y} />)
    }
  	return cells	
	}

	return (
		<div className="board">
			{renderCells()}
    </div>
	)
}

export default Board;
