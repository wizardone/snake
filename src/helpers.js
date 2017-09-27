const MAX = 20
const MIN = 1
const newCoordinates = () => {
  let x = Math.floor(Math.random() * (MAX - MIN) + 1)
  let y = Math.floor(Math.random() * (MAX - MIN) + 1)
  return {
    x: x,
    y: y
  }
}

const changePosition = {
  'UP': (x, y) => ({ x: x, y: y - 1 }),
  'DOWN': (x, y) => ({ x: x, y: y + 1 }),
  'LEFT': (x, y) => ({ x: x - 1, y: y }),
  'RIGHT': (x, y) => ({ x: x + 1, y: y }),
}
module.exports = { newCoordinates, changePosition }
