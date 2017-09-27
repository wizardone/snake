import React from 'react'
import Cell from './cell.js'

// 20x20 cells
const TOTAL_CELLS = 400

export default class Board extends React.Component {

  renderCells() {
    let cells = []
    for(let i = 1; i <= TOTAL_CELLS; i++) {
      let x = i % 20
      if(x === 0) x = 20 // Ugly!
      let y = Math.ceil(i / 20)
      cells.push(<Cell key={i} x={x} y={y} {...this.props}/>)
    }
    return cells
  }

  render() {
    return (
      <div className="board">
        {this.renderCells()}
      </div>
    )
  }
}
