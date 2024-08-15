let board = document.querySelector('#board')
let controls = document.querySelectorAll('.btn')
let state = document.querySelector('#status')
let scoreText = document.querySelector('.scoreText');
let play = document.querySelector('.play')
let audio = new Audio('/game assets/misPoint.mp3')
let audio2 = new Audio('/game assets/hit.mp3')
play.addEventListener('click', playAgain)
let ctx = board.getContext('2d');
//size of one square on the canvas
let blockSize = 10
//number of rows and columns on canvas
let rows = 30
let cols = 30
//canvas width and height
board.height = rows * blockSize
board.width = cols * blockSize
//snakes x and y co-ordinates
let snakeX = blockSize * 5
let snakeY = blockSize * 5
//foods x and y co-ordinates
let foodX
let foodY
// the snake's x and y velocities
let velocityX = 0
let velocityY = 0
let gameOver = false
let snakeBody = []
let score = 0

placeFood()
//Adding controls for movement
controls.forEach((btn) => {
  btn.addEventListener('click', changeDir)
})
setInterval(update, 200)

function update() {
  if (gameOver) {
    return
  }
  //drawing the canvas
  ctx.fillStyle = 'darkgreen'
  ctx.fillRect(0, 0, board.width, board.height);


  //drawing the food
  ctx.fillStyle = 'red'
  ctx.fillRect(foodX, foodY, blockSize, blockSize)

  //if the snake eats the food
  if (snakeX == foodX && snakeY == foodY) {
    audio.play()
    snakeBody.push([foodX, foodY])
    placeFood();
    score += 1;
    scoreText.textContent = score;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }
  //drawing the snake head
  ctx.fillStyle = 'lime'

  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;

  ctx.fillRect(snakeX, snakeY, blockSize, blockSize)

  //creating the snake segments
  for (let i = 0; i < snakeBody.length; i++) {
    ctx.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
  }
  if (snakeX < 0 || snakeX > (cols * blockSize) - blockSize || snakeY < 0 || snakeY > (rows * blockSize) - blockSize) {
    audio2.play()
    gameOver = true
    state.innerHTML = "Game Over!"
    play.style.display = 'flex'
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      audio2.play()
      gameOver = true
      state.innerHTML = "Game Over!"
      play.style.display = 'flex'

    }
  }
}

function placeFood() {
  //giving the food random x and y co-ordinate
  foodX = Math.floor(Math.random() * cols) * blockSize

  foodY = Math.floor(Math.random() * rows) * blockSize

}

function changeDir(e) {
  let direction = e.target.id;

  if (direction == 'up' && velocityY != 1) {
    velocityX = 0
    velocityY = -1
  }
  else if (direction == 'down' && velocityY != -1) {
    velocityX = 0
    velocityY = 1
  }
  else if (direction == 'left' && velocityX != 1) {
    velocityX = -1
    velocityY = 0
  }
  else if (direction == 'right' && velocityX != -1) {
    velocityX = 1
    velocityY = 0
  }
}

function playAgain() {
  location.reload();
}