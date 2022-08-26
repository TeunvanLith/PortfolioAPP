<script>
    import { onMount} from "svelte";
    let root;
    
onMount(() => {

const grid = root.querySelector('#grid')
const startButton = root.querySelector('#start')
const scoreDisplay = root.querySelector('#score')

// Playing Field
const width = 15
let squares = []

// Snakes
let currentSnake = [2,1,0]
let direction = 1

// Apples
let appleIndex = 0

// Scores
let score = 0

// Timers
let intervalTime = 1000
let speed = 0.9
let timerId = 0

// Creating Playing Field
function createGrid() {
    //create 100 of these elements with a for loop
    for (let i=0; i < width*width; i++) {
     //create element
    const square = root.createElement('div')
    //add styling to the element
    square.classList.add('square')
    //put the element into our grid
    grid.appendChild(square)
    //push it into a new squares array    
    squares.push(square)
    }
}
createGrid()

// Starting Snakes
currentSnake.forEach(index => squares[index].classList.add('snake'))

function startMoving() {
   move();
}

function startGame() {
    //remove the snakes
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    //remove the apple
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2,1,0]
    score = 0
    //re add new score to browser
    scoreDisplay.innerHTML = score
    direction = 1
    intervalTime = 1000
    generateApple()
    //readd the class of snake to our new snakes
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(startMoving, intervalTime)
}

function move() {
    if (
        (currentSnake[0] + width >= width*width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width-1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
    return clearInterval(timerId)

    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
    //remove styling from last element
    squares[tail].classList.remove('snake')
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)
    //add styling so we can see it
    
    //deal with snake head gets apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
        //grow our snake by adding class of snake to it
        squares[tail].classList.add('snake')
        console.log(tail)
        //grow our snake array
        currentSnake.push(tail)
        console.log(currentSnake)
        //generate new apple
        generateApple()
        //add one to the score
        score++
        //display our score
        scoreDisplay.textContent = score
        //speed up our snake
        clearInterval(timerId)
        console.log(intervalTime)
        intervalTime = intervalTime * speed
        console.log(intervalTime)
        timerId = setInterval(startMoving, intervalTime)
    }
  
    squares[currentSnake[0]].classList.add('snake')
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
} 
generateApple()

// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow

function control(e) {
    if (e.keyCode === 39) {
        direction = 1
    } else if (e.keyCode === 38) {
        direction = -width
    } else if (e.keyCode === 37) {
        direction = -1
    } else if (e.keyCode === 40) {
        direction = +width
    }
}

document.addEventListener('keydown', control)
startButton.addEventListener('click', startGame)

})
</script>

<div bind:this={root}>
    <h1>Snake VS Snake Game</h1>
    <button id="start">Start/Restart</button>
    <h2>Score Groen <span id="score"></span></h2>
    <h2>Score Rood <span id="enemyScore"></span></h2>
    <div id="grid"></div>
    <script src="index.pack.js"></script>
</div>

<style>
    html, body {
    margin: 10;
    padding: 10;
    background-color: #333;
}

h1, h2 {
    color: white;
    text-align: center;
}

#start {
    display: flex;
    margin: auto;
    background-color: white;
    align-content: center;
    padding: 20px;
    font-weight: 500;
}

.grid {
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    width: 300px;
    height: 300px;
    border: solid 2px black;
    background-color: white;
    background-image: url("https://i.ibb.co/5F8hLpy/Background.png")
}

.square {
    width: 20px;
    height: 20px;
}

.snake {
    background-color: transparent;
    background-image: url("https://i.ibb.co/yyDp5yS/bluesnake.png");
    box-shadow: inset 1px 1px black;
}

.eSnake {
    background-color: transparent;
    background-image: url("https://i.ibb.co/zmqddtH/redsnake.png");
    box-shadow: inset 1px 1px black;
}

.apple {
    background-color: transparent;
    background-image: url("https://i.ibb.co/jvqgCvN/apple.png");
}


</style>