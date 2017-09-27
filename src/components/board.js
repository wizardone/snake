import React from 'react'
import Cell from './cell.js'

// 20x20 cells
const TOTAL_CELLS = 400

const renderCells = (appleCoordinates, snakeCoordinates) => {
  let cells = []
    for(let i = 1; i <= TOTAL_CELLS; i++) {
      let x = i % 20
      if(x === 0) x = 20 // Ugly!
      let y = Math.ceil(i / 20)
      cells.push(<Cell key={i} x={x} y={y} appleCoordinates={appleCoordinates} snakeCoordinates={snakeCoordinates}/>)
    }
  return cells
}

const Board = ({ appleCoordinates, snakeCoordinates }) => {
  return (
    <div className="board">
      {renderCells(appleCoordinates, snakeCoordinates)}
    </div>
  )
}

export default Board
