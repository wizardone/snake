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
	snake: Array<coordinates>
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
		snake: [this.props.snakeCoordinates],
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

	moveSnake = (snakeCoordinates: Array<coordinates>): void => {
		let [snakeHead, ...snakeTail] = snakeCoordinates
		let newCoordinates: Array<coordinates> = []

		if(this.state.direction === 'LEFT') {
			snakeHead = { x: snakeHead.x - 1, y: snakeHead.y }
		} else if(this.state.direction === 'RIGHT') {
			snakeHead = { x: snakeHead.x + 1, y: snakeHead.y }
		} else if(this.state.direction === 'UP') {
			snakeHead = { x: snakeHead.x, y: snakeHead.y + 1}
		} else if(this.state.direction === 'DOWN') {
			snakeHead = { x: snakeHead.x, y: snakeHead.y - 1}
		}

		if(this.checkHitWall(snakeHead)) {
			this.setState({...this.state, ...{gameOver: true}})
		} else if(this.checkHitApple(snakeHead)) {
			//Consume the apple and grow
			this.setState({
				...this.state,
				...{snake: [this.state.apple, ...[snakeHead, ...snakeTail]], apple: this.generateAppleCoordinates()}
			})
		} else {
	  	this.setState({...this.state, ...{snake: [snakeHead, ...snakeTail]}})
	  }
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
		let tempX = Math.floor(Math.random() * (MAX - MIN) + MIN)
		let tempY = Math.floor(Math.random() * (MAX - MIN) + MIN)
		if(tempX !== this.state.snake[0].x && tempY !== this.state.snake[0].y) {
			return {
				x: tempX,
				y: tempY
			}
		} else {
			return this.generateAppleCoordinates()
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
    	} else if(this.state.snake[0].x === x && this.state.snake[0].y === y) {
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
