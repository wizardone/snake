import React from 'react'

const isSnake = (x, y, snakeCoordinates) => {
  return snakeCoordinates.filter((coordinates) => {
    return coordinates.x === x && coordinates.y === y
  }).length
}

const applyClass = (x, y, snakeCoordinates, appleCoordinates) => {
  if(isSnake(x, y, snakeCoordinates)) {
    return 'cell-snake'
  } else if(appleCoordinates.x === x && appleCoordinates.y === y) {
    return 'cell-apple'
  } else {
    return 'cell'
  }
}

const Cell = ({ x, y, snakeCoordinates, appleCoordinates }) => {
  return (
    <div className={applyClass(x, y, snakeCoordinates, appleCoordinates)}></div>
  )
}
export default Cell
