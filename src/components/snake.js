import newPosition from '../helpers.js'


export default class Snake {
  constructor() {
    this.position = newPosition()
  }

  move(direction) {
    if(direction === 'RIGHT') {
      this._setPosition(this.position.x + 1, this.position.y)
    } else if (direction === 'LEFT') {
      this._setPosition(this.position.x - 1, this.position.y)
    } else if (direction === 'DOWN') {
      this._setPosition(this.position.x, this.position.y + 1)
    } else if (direction === 'UP') {
      this._setPosition(this.position.x, this.position.y - 1)
    }

    return this.position
  }

  _setPosition(x, y) {
    this.position = { x: x, y: y }
  }
}
