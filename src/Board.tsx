import React, { useState, useEffect } from 'react';
import './Board.css';
import { Cell, CellProps } from './Cell';
import { coordinates } from './App';

type BoardProps = {
	appleCoordinates: coordinates,
	snakeCoordinates: coordinates,
}
const Board: React.FC<BoardProps> = ({appleCoordinates, snakeCoordinates}) => {
	const [coordinates, toggleCoordinates] = useState({
		apple: appleCoordinates,
		snake: snakeCoordinates,
		direction: "LEFT"
	})
	useEffect(() => {
		setInterval((handler: TimerHandler) => {
			moveSnake()
		}, 4000)
		document.addEventListener('keyup', (event: KeyboardEvent) => {
			changeSnakeDirection()
		})	
	})

	const TOTAL_CELLS: number = 400;

	const changeSnakeDirection = () => {
		return coordinates.snake
	}

	const moveSnake = () => {
		let snakeX: number = coordinates.snake.x
		let snakeY:number = coordinates.snake.y
		toggleCoordinates({...coordinates, ...{
			snake: {
				x: snakeX + 1,
				y: snakeY
			}
		}})
	}

	const renderCells = () => {
		let cells: Array<React.FunctionComponentElement<CellProps>> = []
    for(let i: number = 1; i <= TOTAL_CELLS; i++) {
    	let x: number = i % 20
    	if(x === 0) x = 20
    	let y: number = Math.ceil(i / 20)
    	if(coordinates.apple.x === x && coordinates.apple.y === y) {
				cells.push(<Cell key={i} x={x} y={y} apple={true} />)
    	} else if(coordinates.snake.x === x && coordinates.snake.y === y) {
				cells.push(<Cell key={i} x={x} y={y} snake={true}/>)
    	} else {
				cells.push(<Cell key={i} x={x} y={y} />)
    	}
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
