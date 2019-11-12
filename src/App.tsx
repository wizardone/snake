import React, { useState } from 'react';
import './App.css';
import Board from './Board';

export interface coordinates {
	x: number;
	y: number;
}

const App: React.FC = () => {

	const MAX = 20;
	const MIN = 1;

	let initialCoordinates = {
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
			<Board appleCoordinates={newCoordinates()} snakeCoordinates={newCoordinates()}/>
    </div>
  );
}

export default App;
