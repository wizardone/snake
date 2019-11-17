import React from 'react';
import './Board.css';
import { MAX, MIN } from './App';
import { Cell, CellProps } from './Cell';

type coordinates = {
	x: number;
	y: number;
}

type BoardProps = {
	appleCoordinates: coordinates
	snakeCoordinates: coordinates
	moveSpeed: number
}

type BoardState = {
	apple: coordinates
	snake: coordinates
	direction: string
	gameOver: boolean
}

const TOTAL_CELLS: number = 400
const KEY_DIRECTIONS: any = {
	37: 'LEFT',
	38: 'DOWN',
	39: 'RIGHT',
	40: 'UP'
}

export default class Board extends React.Component<BoardProps, BoardState> {
	state: BoardState = {
		apple: this.props.appleCoordinates,
		snake: this.props.snakeCoordinates,
		direction: "LEFT",
		gameOver: false
	}

	componentDidMount() {
		setInterval(() => {
			this.moveSnake(this.state.snake)
		}, this.props.moveSpeed)

		document.addEventListener('keyup', (event: KeyboardEvent) => {
			if(KEY_DIRECTIONS[event.keyCode] !== undefined) {
				this.changeSnakeDirection(KEY_DIRECTIONS[event.keyCode])
			}
		})
	}

	changeSnakeDirection = (newDirection: string): void => {
		this.setState({...this.state, ...{direction: newDirection}})
	}

	moveSnake = (snakeCoordinates: coordinates): void => {
		let snakeX: number = snakeCoordinates.x
		let snakeY:number = snakeCoordinates.y
		let newCoordinates: coordinates = {x: 0, y: 0}

		if(this.state.direction === 'LEFT') {
			newCoordinates = { x: snakeX - 1, y: snakeY }
		} else if(this.state.direction === 'RIGHT') {
			newCoordinates = { x: snakeX + 1, y: snakeY }
		} else if(this.state.direction === 'UP') {
			newCoordinates = { x: snakeX, y: snakeY + 1}
		} else if(this.state.direction === 'DOWN') {
			newCoordinates = { x: snakeX, y: snakeY - 1}
		}

		if(this.checkHitWall(newCoordinates))
			this.setState({...this.state, ...{gameOver: true}})
		if(this.checkHitApple(newCoordinates))
			this.setState({...this.state, ...{apple: this.generateAppleCoordinates()}})

	  this.setState({...this.state, ...{snake: newCoordinates}})
	}

	checkHitWall = (newCoordinates: coordinates): boolean => {
		if(newCoordinates.x > MAX || newCoordinates.x < MIN || newCoordinates.y > MAX || newCoordinates.y < MIN) {
			return true
		}
		return false
	}

	checkHitApple = (newCoordinates: coordinates): boolean => {
		if(newCoordinates.x === this.state.apple.x && newCoordinates.y === this.state.apple.y) {
			return true
		}
		return false
	}

	generateAppleCoordinates = (): coordinates => {
		return {
			x: Math.floor(Math.random() * (MAX - MIN) + MIN),
			y: Math.floor(Math.random() * (MAX - MIN) + MIN)
		}
	}

	renderCells = () => {
		let cells: Array<React.FunctionComponentElement<CellProps>> = []
    for(let i: number = 1; i <= TOTAL_CELLS; i++) {
    	let x: number = i % 20
    	if(x === 0) x = 20
    	let y: number = Math.ceil(i / 20)
    	if(this.state.apple.x === x && this.state.apple.y === y) {
				cells.push(<Cell key={i} x={x} y={y} apple={true} />)
    	} else if(this.state.snake.x === x && this.state.snake.y === y) {
				cells.push(<Cell key={i} x={x} y={y} snake={true}/>)
    	} else {
				cells.push(<Cell key={i} x={x} y={y} />)
    	}
    }
  	return cells	
	}

	renderGameOver = () => {
		return <div>Game Over</div>
	}

	render() {
		return (
			<div className="board">
				{this.state.gameOver ? this.renderGameOver() : this.renderCells()}
    	</div>
		)
	}
}
