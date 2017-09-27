import React, { Component } from 'react';
import '../App.css';
import Board from './board.js'
import { newCoordinates, changePosition } from '../helpers.js'

const MOVE_RATE = 200
const KEY_CODES = {
  38: 'UP',
  39: 'RIGHT',
  37: 'LEFT',
  40: 'DOWN',
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apple: {
        coordinates: newCoordinates()
      },
      snake: {
        coordinates: [newCoordinates()]
      },
      snakeDirection: 'RIGHT',
      gameOver: false
    }
  }

  updateSnakePosition = (newHeadCoordinates, isEating) => {
    const prevCoordinates = this.state.snake.coordinates
    let snakeHead = newHeadCoordinates
    let snakeTail = null
    if(isEating) {
      snakeTail = prevCoordinates
      this.updateApplePosition()
    } else {
      console.log(prevCoordinates.slice(0, prevCoordinates.length - 1))
      snakeTail = prevCoordinates.slice(0, prevCoordinates.length - 1)
    }

    this.setState({
      snake: {
        coordinates: [snakeHead, ...snakeTail]
      }
    })
  }

  updateApplePosition = () => {
    const coordinates = newCoordinates()
    this.setState({
      apple: {
        coordinates: coordinates
      }
    })
  }

  gameOver = () => {
    this.setState({ gameOver: true })
    clearInterval(this.interval)
  }

  moveSnake = () => {
    const snakeHead = this.state.snake.coordinates[0]
    const newHeadCoordinates = changePosition[this.state.snakeDirection](snakeHead.x, snakeHead.y)
    if(this.isValidBoardPosition(newHeadCoordinates)) {
      const isEating = this.isSnakeEating(this.state.apple.coordinates, newHeadCoordinates)
      this.updateSnakePosition(newHeadCoordinates, isEating)
    } else {
      this.gameOver()
    }
  }

  keyUp = (e) => {
    const newDirection = KEY_CODES[e.keyCode]
    this.setState({ snakeDirection: newDirection })
  }

  isValidBoardPosition = (snakeCoordinates) => {
    return (snakeCoordinates.x <= 20 && snakeCoordinates.x >= 1) && (snakeCoordinates.y <= 20 && snakeCoordinates.y >= 1)
  }

  isSnakeEating = (applePosition, snakeCoordinates) => {
    //const snakeHead = snakeCoordinates.slice(0, 1)[0]
    return applePosition.x === snakeCoordinates.x && applePosition.y === snakeCoordinates.y
  }

  componentDidMount() {
    this.interval = setInterval(this.moveSnake, MOVE_RATE)
    document.addEventListener('keyup', this.keyUp)
  }

  render() {
    const { gameOver } = this.state
    let render = null
    if(gameOver) {
      render = <div>Game Over</div>
    } else {
      render = <Board appleCoordinates={this.state.apple.coordinates} snakeCoordinates={this.state.snake.coordinates}/>
    }
    return (
      <div className="App">
      {render}
      </div>
    );
  }
}

export default App;
