const MAX = 20
const MIN = 1
const newPosition = () => {
  let x = Math.floor(Math.random() * (MAX - MIN) + 1)
  let y = Math.floor(Math.random() * (MAX - MIN) + 1)
  return {
    x: x,
    y: y
  }
}
module.exports = newPosition
