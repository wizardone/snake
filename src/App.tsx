import React from 'react';
import './App.css';
import Board from './Board';

export type coordinates = {
	x: number;
	y: number;
}

export const App: React.FC = () => {

	const MAX = 20
	const MIN = 1
	const MOVE_SPEED = 200

	let initialCoordinates: coordinates = {
		x: 0,
		y: 0
	}

	const newCoordinates = (): coordinates => {
		let tempX = Math.floor(Math.random() * (MAX - MIN) + MIN)
		let tempY = Math.floor(Math.random() * (MAX - MIN) + MIN)
		if(tempX !== initialCoordinates.x && tempY !== initialCoordinates.y) {
			initialCoordinates.x = tempX
			initialCoordinates.y = tempY
			return {
				x: tempX,
				y: tempY
			}
		} else {
			return newCoordinates()
		}
	}

  return (
    <div className="App">
			<Board appleCoordinates={newCoordinates()} snakeCoordinates={newCoordinates()} moveSpeed={MOVE_SPEED}/>
    </div>
  );
}
