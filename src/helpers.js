let newPosition = () => {
  let x = Math.floor(Math.random() * (20 - 0) + 0)
  let y = Math.floor(Math.random() * (20 - 0) + 0)
  return {
    x: x,
    y: y
  }
}
module.exports = newPosition
