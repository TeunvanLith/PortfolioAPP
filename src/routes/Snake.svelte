<script>
    import { onMount} from "svelte";
    import Tasks from '../routes/stores/TaskStore';
    import Users from '../routes/stores/UserStore';
    export let ID;

    let root;
    let arrowLeft;
    let arrowRight;
    let arrowUp;
    let arrowDown;
    let direction = 1;
    const width = 15;
    let mobile = false;

    function control(e) {
    if (e.keyCode === 39 || e == 39) {
        direction = 1
    } else if (e.keyCode === 38 || e == 38) {
        direction = -width
    } else if (e.keyCode === 37 || e == 37) {
        direction = -1
    } else if (e.keyCode === 40 || e == 40) {
        direction = +width
    }
}

onMount(() => {

console.log(ID);

const grid = root.querySelector('#grid')
const startButton = root.querySelector('#start')
const scoreDisplay = root.querySelector('#score')
const gameOver = root.querySelector('#gameover')

// Playing Field
let squares = []

// Snakes
let currentSnake = [2,1,0]

// Apples
let appleIndex = 0

// Scores
let score = 0
let updated = false;

// Timers
let intervalTime = 1000
let speed = 0.9
let timerId = 0

// Creating Playing Field
function createGrid() {
    //create 225 of these elements with a for loop
    for (let i=0; i < width*width; i++) {
     //create element
    const square = document.createElement("div")
    //add styling to the element
    square.classList.add("snakesquare")
    //put the element into our grid
    grid.appendChild(square)
    //push it into a new squares array    
    squares.push(square)
    }
}
createGrid()

// Setup score
scoreDisplay.innerHTML = score

// XP / TASK
const taskChecked = () => {
    Tasks.update(tasks => {
        let copyTasks = [...tasks];
        let taskToUpdate = copyTasks.find((task) => task.id == "006");
        taskToUpdate.completed = "&#9745;";
        addXP(200)
        return copyTasks;
    })
}

    const addXP = (xp) => {
        Users.update(users => {
                let copyUsers = [...users];
                let changeUser = copyUsers.find((user) => user.user_ID == ID);
                changeUser.xp = changeUser.xp + xp;
               
                return copyUsers;

            })
}

// Starting Snakes
currentSnake.forEach(index => squares[index].classList.add('snakesnake'))

function startMoving() {
   move();
}

function startGame() {
    //remove the snakes
    currentSnake.forEach(index => squares[index].classList.remove('snakesnake'))
    //remove the apple
    squares[appleIndex].classList.remove('snakeapple')
    clearInterval(timerId)
    currentSnake = [2,1,0]
    score = 0
    // remove gameOver
    gameOver.innerHTML = "";
    //re add new score to browser
    scoreDisplay.innerHTML = score
    direction = 1
    intervalTime = 1000
    generateApple()
    //read the class of snake to our new snakes
    currentSnake.forEach(index => squares[index].classList.add('snakesnake'))
    timerId = setInterval(startMoving, intervalTime)
}

function move() {
    if (score === 3 && !updated) {
        taskChecked()
        updated = true;
    }
    if (
        (currentSnake[0] + width >= width*width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width-1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snakesnake')
    ) {
    gameOver.innerHTML = "Game Over!";
    return clearInterval(timerId)
    }
    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
    //remove styling from last element
    squares[tail].classList.remove('snakesnake')
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)
    //add styling so we can see it
    
    //deal with snake head gets apple
    if (squares[currentSnake[0]].classList.contains('snakeapple')) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('snakeapple')
        //grow our snake by adding class of snake to it
        squares[tail].classList.add('snakesnake')
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
  
    squares[currentSnake[0]].classList.add('snakesnake')
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snakesnake'))
    squares[appleIndex].classList.add('snakeapple')
} 
generateApple()

document.addEventListener('keydown', control)
startButton.addEventListener('click', startGame)

})
</script>

<div bind:this={root}>
    <h1>Snake</h1>
    <h2>Score&nbsp;<span id="score"></span></h2>
    <div id="grid" class="grid"><div id="gameover" class="gameover"></div></div>
    <button id="start">Start/Restart</button>
        {#if window.innerWidth < 1400 || mobile}
            <div class="mobileButtons">
                <div class="buttons-snake up" on:click={ () => {control(38)}}><i class="fa-solid fa-circle-chevron-up"></i></div><br />
                <div class="buttons-snake left" on:click={ () => {control(37)}}><i class="fa-solid fa-circle-chevron-left"></i></div>
                <div class="buttons-snake down" on:click={ () => {control(40)}}><i class="fa-solid fa-circle-chevron-down"></i></div>
                <div class="buttons-snake right" on:click={ () => {control(39)}}><i class="fa-solid fa-circle-chevron-right"></i></div>
            </div>
        {/if}
        {#if window.innerWidth > 1400}
    <div class="uitleg"><button on:click={ () => {mobile = !mobile;}}>Buttons aan/uit</button><p>Gebruik de pijltjes toetsen om te snake te besturen.</p></div>
    {/if}
</div>

<style>

h1 {
    font-family: 'Dancing Script', cursive;
    font-weight: 700;
        }
h2 { 
    margin: 20px auto;
}
.grid {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    width: 300px;
    height: 300px;
    border: solid 2px #04a7f4;
    background-color: rgba(20,20,20,0.01)
}

:global.snakesquare {
    width: 20px;
    height: 20px;
    border-radius: 6px;
    box-sizing: border-box;
}

:global.snakesnake {
    background-image: url("https://i.ibb.co/yyDp5yS/bluesnake.png");
    box-shadow: inset 1px 1px black;
}

:global.snakeapple {
    background-image: url("https://i.ibb.co/jvqgCvN/apple.png");
}

.fa-regular {
    color: white;
}
button{
     color: white;
     height: 50px;
     width: 130px;
     border-radius: 15px 0 15px 0;
     background-color: #04a7f4;
     cursor: pointer;
     font-weight: 700;
     font-size: 14px;
     letter-spacing: 1px;
     border:none;
     margin: 20px auto;
 }

button:hover {
    background: #0183bf;
}

.buttons-snake {
    cursor: pointer;
    margin: 0px 5px;
    width: 50px;
    height: 50px;
    line-height: 50px;
    color: #04a7f4;
    padding: 5px;
    font-size: 50px;
}

.mobileButtons {
    display: grid;
    grid-template-areas: 
    ". up ."
    "left down right";
    justify-content: center;
    width: 360px;
    margin: 10px auto;
    padding-bottom: 120px;
}

.uitleg {
    padding-bottom: 100px;
    font-family: 'Dancing Script', cursive;
    font-weight: 700;
}
.up {
    grid-area: up;
}

.left {
    grid-area: left;
}

.right {
    grid-area: right;
}

.down {
    grid-area: down;
}

.gameover {
    position: absolute;
    color: red;
    font-size: 50px;
    font-family: 'Dancing Script', cursive;
    font-weight: 700;
    text-align: center;
    width: 100%;
    height: 100%;
    line-height: 300px;
}
</style>