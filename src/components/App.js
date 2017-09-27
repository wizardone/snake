import React, { Component } from 'react';
import '../App.css';
import Board from './board.js'
import Apple from './apple.js'
import Snake from './snake.js'

const MOVE_RATE = 300
const KEY_CODES = {
  38: 'UP',
  39: 'RIGHT',
  37: 'LEFT',
  40: 'DOWN',
}

let apple = new Apple()
let snake = new Snake()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apple: {
        coordinates: apple.position
      },
      snake: {
        coordinates: snake.coordinates
      },
      snakeDirection: 'RIGHT',
      gameOver: false
    }
  }

  updateSnakePosition = (snake) => {
    this.setState({
      snake: {
        coordinates: [snake.headCoordinates, ...snake.tailCoordinates]
      }
    })
  }

  updateApplePosition = (apple) => {
    apple.rePosition()
    this.setState({
      apple: {
        coordinates: apple.position
      }
    })
  }

  gameOver = () => {
    this.setState({ gameOver: true })
    clearInterval(this.interval)
  }

  moveSnake = () => {
    const isEating = this.isSnakeEating(this.state.apple.coordinates, snake.coordinates)
  }

  keyUp = (e) => {
    const newDirection = KEY_CODES[e.keyCode]
    this.setState({ snakeDirection: newDirection })
  }

  isValidBoardPosition = (position) => {
    return (position.x <= 20 && position.x >= 1) && (position.y <= 20 && position.y >= 1)
  }

  isSnakeEating = (applePosition, snakeCoordinates) => {
    const snakeHead = snakeCoordinates.slice(0, 1)[0]
    return applePosition.x === snakeHead.x && applePosition.y === snakeHead.y
  }

  componentDidMount() {
    this.interval = setInterval(this.moveSnake, MOVE_RATE)
    document.addEventListener('keyup', this.keyUp)
  }

  render() {
    const { apple, snake, gameOver } = this.state
    let render = null
    if(gameOver) {
      render = <div>Game Over</div>
    } else {
      render = <Board appleCoordinates={apple.coordinates} snakeCoordinates={snake.coordinates}/>
    }
    return (
      <div className="App">
      {render}
      </div>
    );
  }
}

export default App;
