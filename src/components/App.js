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
      snakeDirection: 'RIGHT'
    }
  }

  moveSnake = () => {
    setInterval(() => {
      const newPosition = snake.move(this.state.snakeDirection)
      this.setState({ snakePosition: newPosition })
    }, MOVE_RATE)
  }

  componentDidMount() {
    this.moveSnake(snake)
    document.addEventListener('keyup', this.keyUp)
  }

  keyUp = (e) => {
    const keyCode = e.keyCode
    const newDirection = KEY_CODES[keyCode]
    this.setState({ snakeDirection: newDirection })
  }

  render() {
    const { applePosition, snakePosition } = this.state
    return (
      <div className="App">
        <Board apple={applePosition} snake={snakePosition}/>
      </div>
    );
  }
}

export default App;
