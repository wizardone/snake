import newPosition from '../helpers.js'

export default class Snake {
  constructor() {
    this.position = newPosition()
  }

  move() {
    this.position = newPosition()

    return this.position
  }
}
