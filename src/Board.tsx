import React, { useState, useEffect, useRef } from 'react';
import './Board.css';
import { Cell, CellProps } from './Cell';
import { coordinates } from './App';

type BoardProps = {
	appleCoordinates: coordinates,
	snakeCoordinates: coordinates,
}

function useInterval(callback: any, delay: number) {
  const savedCallback: any = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Board: React.FC<BoardProps> = ({appleCoordinates, snakeCoordinates}) => {
	const [coordinates, toggleCoordinates] = useState({
		apple: appleCoordinates,
		snake: snakeCoordinates,
		direction: "LEFT"
	})

	useInterval(() => {
			moveSnake()
	}, 500)

	useEffect(() => {
		document.addEventListener('keyup', (event: KeyboardEvent) => {
			if(KEY_DIRECTIONS[event.keyCode] !== undefined) {
				changeSnakeDirection(KEY_DIRECTIONS[event.keyCode])
			}
		})
	})

	const TOTAL_CELLS: number = 400
	const KEY_DIRECTIONS: any = {
		37: 'LEFT',
		38: 'DOWN',
		39: 'RIGHT',
		40: 'UP'
	}

	const changeSnakeDirection = (newDirection: string): void => {
		toggleCoordinates({...coordinates, ...{direction: newDirection}})
	}

	const moveSnake = (): void => {
		let snakeX: number = coordinates.snake.x
		let snakeY:number = coordinates.snake.y
		let newCoordinates: coordinates = {x: 0, y: 0}

		if(coordinates.direction === 'LEFT') {
			newCoordinates = { x: snakeX - 1, y: snakeY }
		} else if(coordinates.direction === 'RIGHT') {
			newCoordinates = { x: snakeX + 1, y: snakeY }
		} else if(coordinates.direction === 'UP') {
			newCoordinates = { x: snakeX, y: snakeY + 1}
		} else if(coordinates.direction === 'DOWN') {
			newCoordinates = { x: snakeX, y: snakeY - 1}
		}

		toggleCoordinates({...coordinates, ...{snake: newCoordinates}})
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
