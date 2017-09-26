import newPosition from '../helpers.js'

export default class Apple {
  constructor() {
    this.position = newPosition()
  }

  rePosition() {
    this.position = newPosition()
  }
}
