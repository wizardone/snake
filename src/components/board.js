import React from 'react'
import Cell from './cell.js'

const TOTALCELLS = 400

export default class Board extends React.Component {

  renderCells() {
    let cells = []
    for(let i = 1; i <= TOTALCELLS; i++) {
      cells.push(<Cell key={i} snake={false} />)
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
