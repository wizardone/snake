import React from 'react'

const applyClass = (x, y, snake, apple) => {
  if(snake.x === x && snake.y === y) {
    return 'cell-snake'
  } else if(apple.x === x && apple.y === y) {
    return 'cell-apple'
  } else {
    return 'cell'
  }
}

const Cell = ({ x, y, snake, apple }) => {
  return (
    <div className={applyClass(x, y, snake, apple)}></div>
  )
}
export default Cell
