import newPosition from '../helpers.js'

export default class Snake {
  constructor() {
    this.coordinates = [newPosition()]
    //this.tailCoordinates = []
    //this.headCoordinates = newPosition()
  }

  move(direction, isEating) {
    const oldCoordinates = { x: this.headCoordinates.x, y: this.headCoordinates.y }
    const currentHeadCoordinates = this.coordinates.slice(0, 1)
    if(direction === 'RIGHT') {
      this._setHeadPosition(currentHeadCoordinates.x + 1, currentHeadCoordinates.y)
    } else if (direction === 'LEFT') {
      this._setHeadPosition(currentHeadCoordinates.x - 1, currentHeadCoordinates.y)
    } else if (direction === 'DOWN') {
      this._setHeadPosition(currentHeadCoordinates.x, currentHeadCoordinates.y + 1)
    } else if (direction === 'UP') {
      this._setHeadPosition(currentHeadCoordinates.x, currentHeadCoordinates.y - 1)
    }
    if(isEating) {
      this.addTail(oldCoordinates)
    }
    this.adjustTail(oldCoordinates)
  }

  adjustTail(headCoordinates) {
    if(this.tailCoordinates.length > 1) {
    }
  }

  addTail(coordinates) {
    this.coordinates.push({ x: coordinates.x, y: coordinates.y })
  }

  _setHeadPosition(x, y) {
    this.headCoordinates = { x: x, y: y }
  }

  _setTailPosition(x, y) {
    if(this.hasEaten) {
      this.tailCoordinates.push({ x: x, y: y })
      this.length += 1
    }
  }
}
