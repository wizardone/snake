import React from 'react';
import './App.css';
import Board from './Board';

export interface coordinates {
	x: number;
	y: number;
}

const App: React.FC = () => {

	const MAX = 20;
	const MIN = 1;

	const newCoordinates = (): coordinates => {
		return {
			x: Math.floor(Math.random() * (MAX - MIN) + MIN),
			y: Math.floor(Math.random() * (MAX - MIN) + MIN)
		}
	}

  return (
    <div className="App">
			<Board appleCoordinates={newCoordinates()} snakeCoordinates={newCoordinates()}/>
    </div>
  );
}

export default App;
