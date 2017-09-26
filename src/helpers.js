const newPosition = () => {
  let x = Math.floor(Math.random() * (20 - 1) + 1)
  let y = Math.floor(Math.random() * (20 - 1) + 1)
  return {
    x: x,
    y: y
  }
}
module.exports = newPosition
