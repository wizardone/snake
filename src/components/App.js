import React, { Component } from 'react';
import '../App.css';
import Board from './board.js'
import Apple from './apple.js'
import Snake from './snake.js'

const MOVE_RATE = 500
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
      applePosition: apple.position,
      snakePosition: snake.position,
      snakeDirection: 'RIGHT',
      gameOver: false
    }
  }

  moveSnake = () => {
    setInterval(() => {
      snake.move(this.state.snakeDirection)
      if(this.isValidPosition(snake.position)) {
        this.setState({ snakePosition: snake.position })
        this.snakeEatApple(this.state.applePosition, snake.position)
      } else {
        this.setState({ gameOver: true })
      }
    }, MOVE_RATE)
  }

  keyUp = (e) => {
    const newDirection = KEY_CODES[e.keyCode]
    this.setState({ snakeDirection: newDirection })
  }

  isValidPosition = (position) => {
    return (position.x <= 20 && position.x >= 1) && (position.y <= 20 && position.y >= 1)
  }

  snakeEatApple = (applePosition, snakePosition) => {
    if(applePosition.x === snakePosition.x && applePosition.y === snakePosition.y) {
      apple.rePosition()
      this.setState({ applePosition: apple.position })
    }
  }

  componentDidMount() {
    this.moveSnake(snake)
    document.addEventListener('keyup', this.keyUp)
  }

  render() {
    const { applePosition, snakePosition, gameOver } = this.state
    let render = null
    if(gameOver) {
      render = <div>Game Over</div>
      //render = <Board apple={applePosition} snake={snakePosition}/>
    } else {
      render = <Board apple={applePosition} snake={snakePosition}/>
    }
    return (
      <div className="App">
        {render}
      </div>
    );
  }
}

export default App;
