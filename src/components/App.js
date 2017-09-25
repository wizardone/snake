import React, { Component } from 'react';
import '../App.css';
import Board from './board.js'
import Apple from './apple.js'
import Snake from './snake.js'

const MOVE_RATE = 1000

let apple = new Apple()
let snake = new Snake()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      applePosition: apple.position,
      snakePosition: snake.position
    }
  }

  moveSnake() {
    setInterval(() => {
      let newPosition = snake.move()
      this.setState({ snakePosition: newPosition })
    }, MOVE_RATE)
  }

  componentDidMount() {
    this.moveSnake(snake)
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
