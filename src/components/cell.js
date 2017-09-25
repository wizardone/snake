import React from 'react'

const Cell = ({ snake }) => {
  return (
    <div className={snake ? "cell-snake" : "cell"}></div>
  )
}
export default Cell
