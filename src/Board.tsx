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
	score: number
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
		gameOver: false,
		score: 0
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
		let snakeHead: coordinates = snakeCoordinates[0]
		let newSnakeHead: coordinates = {x: 0, y: 0}

		
		newSnakeHead = this.calculateNewSnakeHead(snakeHead)
		
		if(this.snakeHitWall(newSnakeHead)) {
			this.setState({...this.state, ...{gameOver: true}})
		} else if(this.snakeEatsApple(newSnakeHead)) {
			this.setState({
				...this.state,
				...{snake: [newSnakeHead, ...snakeCoordinates], apple: this.generateAppleCoordinates(), score: this.state.score += 1}
			})
		} else if(this.snakeEatsSelf(newSnakeHead, snakeCoordinates)) {
			console.log("YEAHHH")
			this.setState({...this.state, ...{gameOver: true}})
		} else {
	  	this.setState({...this.state, ...{snake: [newSnakeHead, ...snakeCoordinates.slice(0, snakeCoordinates.length-1)]}})
	  }
	}

	calculateNewSnakeHead = (oldSnakeHead: coordinates): coordinates => {
		if(this.state.direction === 'LEFT') {
			return { x: oldSnakeHead.x - 1, y: oldSnakeHead.y }
		} else if(this.state.direction === 'RIGHT') {
			return { x: oldSnakeHead.x + 1, y: oldSnakeHead.y }
		} else if(this.state.direction === 'UP') {
			return { x: oldSnakeHead.x, y: oldSnakeHead.y + 1}
		} else if(this.state.direction === 'DOWN') {
			return { x: oldSnakeHead.x, y: oldSnakeHead.y - 1}
		} else {
			return { x: 0, y: 0}
		}
	}

	snakeHitWall = (newCoordinates: coordinates): boolean => {
		if(newCoordinates.x > MAX || newCoordinates.x < MIN || newCoordinates.y > MAX || newCoordinates.y < MIN) {
			return true
		}
		return false
	}

	snakeEatsSelf = (newSnakeHead: coordinates, oldCoordinates: coordinates[]): boolean => {
		return oldCoordinates.filter((coordinates) => {
			return coordinates.x === newSnakeHead.x && coordinates.y === newSnakeHead.y
		}).length > 0
	}

	snakeEatsApple = (newCoordinates: coordinates): boolean => {
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
    	} else if(this.state.snake.filter((coordinates) => coordinates.x === x && coordinates.y === y).length) {
				cells.push(<Cell key={i} x={x} y={y} snake={true}/>)
    	} else {
				cells.push(<Cell key={i} x={x} y={y} />)
    	}
    }
  	return cells	
	}

	renderGameOver = () => {
		return <div>Game Over<br />Your score is {this.state.score}</div>
	}

	render() {
		return (
			<div className="board">
				{this.state.gameOver ? this.renderGameOver() : this.renderCells()}
    	</div>
		)
	}
}
