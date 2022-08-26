<script>
 import { onMount } from 'svelte';
import Stats from './stats.svelte';
 let root;

onMount(() => {
 
// Grid
const grid = root.querySelector("#grid");
let width = 20
let height = 30
let squares = []

// Score
const scoreDisplay = root.querySelector("#score")
const livesDisplay = root.querySelector("#lives")
const starsDisplay = root.querySelector("#stars")
let score = 0
let lives = 2
let stars = 0
scoreDisplay.innerHTML = `Score: ${score}`
livesDisplay.innerHTML = `Lives: ${lives}`
starsDisplay.innerHTML = `Stars: ${stars}`

// Button
const startButton = root.querySelector("#start");
let ifButtonClicked = 0

// Messages
const messageBoard = root.querySelector("#Messages")
messageBoard.innerHTML = (`"First Wave Incoming"`)

// Ships
let startLocations = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
let random  = Math.floor(Math.random() * startLocations.length)
let hero = 589

// Ammo 
const ammoDisplay = root.querySelector("#ammo");
let mineAmmo = 3
let rocketAmmo = 500
let laserAmmo = 2 
let gunAmmo = 100
let randomBonuses = [1,2,3,4]
ammoDisplay.innerHTML = `Mines: ${mineAmmo} Rockets: ${rocketAmmo} Lasers: ${laserAmmo} Gun: ${gunAmmo}`

// Moving
let heroDirection = -width
let spaceDirection = +width


// Timers
let intervalTime = 500
let explosionTime = 1000
let timerId = 0
let ItemTime = 5000
let CratePlacementInterval = 14000
let randomInterval = 10000

// CREATE GRID
function createGrid() {
  //create 600 elements with a for loop
  for (let i = 0; i < width * height; i++) {
    //create element
    const square = root.createElement("div")
    //add styling to the element
    square.classList.add("div")
    //put the element into our grid
    grid.appendChild(square)
    //push it into a new squares array
    squares.push(square)
  }
}
createGrid();

// ENEMY LOCATIONS 
let eLocations = [5, 4, 2]

// HERO 
squares[hero].classList.add("heroShip");

// Onscreen Buttons
function restart() {
         // remove guns
         for (let i = 0; i < squares.length; i++) {
         squares[i].classList.remove('rocket', 'mine')
         }
         // reset ammo
         mineAmmo = 3
         rocketAmmo = 5
         laserAmmo = 2
         gunAmmo = 100
         // reset hero
         squares[hero].classList.remove('heroShip')
         hero = 589
         squares[hero].classList.add('heroShip')
         // reset scores
         score = 0
         lives = 2
         stars = 0
         livesDisplay.innerHTML = `Lives: ${lives}`
         scoreDisplay.innerHTML = `Score: ${score}`
         starsDisplay.innerHTML = `Stars: ${stars}`
         messageBoard.innerHTML = (`"You've zero messages!"`)
         
         //reset ships
         squares[Ship].classList.remove('Ship')
         squares[Drone].classList.remove('Drone')
         Ship = 8
         Drone = 2
         squares[Ship].classList.add('Ship')
         squares[Drone].classList.add('Drone')
         clearInterval(timerDrone)
         clearInterval(timerShip)
         timerDrone = setInterval (moveDrone, intervalTime)
         timerShip = setInterval (moveShip, (intervalTime*speed))
}

// Hero 
function moveHero() {
        if (
            (hero + heroDirection < 380) || 
            (hero + heroDirection > 599) ||
            (hero % width === width-1 && heroDirection === 1) ||
            (hero % width === 0 && heroDirection === -1)){               
            heroDirection = 0
        }
        
        squares[hero].classList.remove('heroShip')
        hero = hero + heroDirection 
        squares[hero].classList.add('heroShip')
} 

// Enemies

// CONTROLS
function controlHero(e) {
  if (e.keyCode === 39) {
      heroDirection = 1
      moveHero()
  } else if (e.keyCode === 38) {
      heroDirection = -width
      moveHero()
  } else if (e.keyCode === 37) {
      heroDirection = -1
      moveHero()
  } else if (e.keyCode === 40) {
      heroDirection = +width
      moveHero()
  } else if (e.keyCode === 83) {
      shootRocket()
  } else if (e.keyCode === 69) {
      MoveArrayEnemies()
  }     
}

MoveArrayEnemies()

startButton.addEventListener('click', restart)
root.addEventListener('keydown', controlHero)
scoreDisplay.innerHTML = `Score: ${score}`
livesDisplay.innerHTML = `Lives: ${lives}`

})
</script>

<div class="spaceInvaders" bind:this={root}>
        <h1>Space Invaders</h1>
        <button id="start">START GAME</button>
        <div class="stats">
        <div id="score"></div>
        <div id="stars"></div>
        <div id="lives"></div>
        </div>
        <div id="textbox">   
        <p>
        <!-- svelte-ignore a11y-missing-content -->
        <a id="ammo"></a></p>
        </div>
        <div id="textbox">   
        <p>
        <!-- svelte-ignore a11y-missing-content -->
        <a id="Messages"></a></p>
        </div>
        
        <div id="grid"></div>
        <div id="textbox2">   
        <p> 
            Move: &#8592; &#8593; &#8594; &#8595;<br>
            Gun W | Rocket S | Mine D | Laser A<br>
        </div>
</div>
<style>

.spaceInvaders {
    margin: 0 auto;
    width: 800px;

}

h1 {
  font-weight: 700;
  color: #7FFFD4;
  margin: 0;
  text-transform: uppercase;
  text-shadow: 2px 2px white;
}

p {
  font-weight: 700;
}

#textbox {
  margin: auto;
  width: 400px;
  border: 1px solid #7FFFD4;
  border-radius: 10px;
  padding-bottom: 2px;
  margin-bottom: 10px;
  background-color: black;
  font-weight: 700;
}

#grid {
  margin: auto;
  width: 400px;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
  background-image: url("https://i.ibb.co/bs9vKJ8/Brief-Ignorant-Blackbuck-size-restricted.gif");
  border-radius: 20px;  
  border: 2px solid #7FFFD4;
}

#textbox2 {
  margin: auto;
  width: 400px;
  border: 1px solid #7FFFD4;
  border-radius: 10px;
  padding-bottom: 2px;
  margin-bottom: 10px;
  margin-top: 20px;
  background-color: black;
  font-weight: 700;
}

#grid {
  margin: auto;
  width: 400px;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
  background-image: url("https://i.ibb.co/bs9vKJ8/Brief-Ignorant-Blackbuck-size-restricted.gif");
  border-radius: 20px;  
  border: 2px solid #7FFFD4;
}

#grid div {
  width: 20px;
  height: 20px;
}

.stats {
    margin: 0 auto;
    width: 400px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border: 1px solid #7FFFD4;
    border-radius: 10px;
    padding: 15px 0;
    margin-bottom: 10px;
    margin-top: 20px;
    background-color: black;
    font-weight: 700;
}

.heroShip {
  background-image: url("https://i.ibb.co/dKsYGtN/Hero.png")
}

.Ship {
  background-image: url("https://i.ibb.co/1M8XczW/Invader-Ship.png")
}

.Drone {
  background-image: url("https://i.ibb.co/nsttZnk/Invader-Drone.png")
}

.mine {
    background-image: url("https://i.ibb.co/b64xXm0/mine.png")
}

.rocket {
    background-image: url("https://i.ibb.co/TP8hB0X/Rocket.png")
}

.boom {
    background-image: url("https://i.ibb.co/XXTcZw2/Boom.png")
}

.boomLaser {
    background-image: url("https://i.ibb.co/F5Y3Bqs/boom-Laser.png")
}

.laser {
    background-image: url("https://i.ibb.co/XXkcKvy/laser.png")
}

.crate {
   background-image: url("https://i.ibb.co/PW877gH/crate.png")
}

.gun {
  background-image: url("https://i.ibb.co/XbFmRFd/Gun.png")
}

.healthcrate {
   background-image: url("https://i.ibb.co/s2F1yMh/healthcrate.png")
}

.star {
   background-image: url("https://i.ibb.co/JjBrPZc/star.png")
}

</style>