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

// Messages
const messageBoard = root.querySelector("#Messages")
messageBoard.innerHTML = (`"First Wave Incoming"`)

// Start location Enemy
let startLocations = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
let random  = Math.floor(Math.random() * startLocations.length)
let hero = 509
let locations = [381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511,512,513,514,515,516,517,518,519,520,521,522,523,524,525,526,527,528,529,530,531,532,533,534,535,536,537,538,539,540,541,542,543,544,545,546,547,548,549,550,551,552,553,554,555,556,557,558,559,560,561,562,563,564,565,566,567,568,569,570,571,572,573,574,575,576,577,578,579,580,581,582,583,584,585,586,587,588,589,590,591,592,593,594,595,596,597,598,599]

// Ammo 
const ammoDisplay = root.querySelector("#ammo");
let mineAmmo = 3
let rocketAmmo = 10
let laserAmmo = 2 
let gunAmmo = 100
let randomBonuses = [1,2,3,4]
ammoDisplay.innerHTML = `Mines: ${mineAmmo} Rockets: ${rocketAmmo} Lasers: ${laserAmmo} Gun: ${gunAmmo}`

// Moving
let heroDirection = -width
let spaceDirection = +width

// Timers
let intervalTime = 500
let enemyShipInterval = 800
let explosionTime = 1000
let timerId = 0
let ItemTime = 5000
let healthCrate = 14000
let ammoCrate = 20000
let randomInterval = 10000

// FUNCTIONS //
// Create Grid
function createGrid() {
  //create 600 elements with a for loop
  for (let i = 0; i < width * height; i++) {
    //create element
    const square = document.createElement("div")
    //add styling to the element
    square.classList.add('square')
    //put the element into our grid
    grid.appendChild(square)
    //push it into a new squares array
    squares.push(square)
  }
}
createGrid();

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
         rocketAmmo = 10
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
}

// Hero Moving
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
  } else if (e.keyCode === 65) {
      placeMine()
  } else if (e.keyCode === 68) {
      shootGun()
  } else if (e.keyCode === 88) {
      shootLaser()
  }
}

// Hero Attacks 
function shootGun() {
         if (gunAmmo > 0) {
            let timerGun
            let currentGunIndex = hero-width
            squares[currentGunIndex].classList.add('gun')
            gunAmmo--
            ammoDisplay.innerHTML = `Mines: ${mineAmmo} Rockets: ${rocketAmmo} Lasers: ${laserAmmo} Gun: ${gunAmmo}`
            
            function moveGun() {
              if (currentGunIndex - width < 0) {
                  clearInterval(timerGun)
                  squares[currentGunIndex].classList.remove('gun')
              } else {
              squares[currentGunIndex].classList.remove('gun')
              currentGunIndex -= width
              squares[currentGunIndex].classList.add('gun')
                
              if (squares[currentGunIndex].classList.contains('Ship')) {
                  squares[currentGunIndex].classList.remove('gun')
                  squares[currentGunIndex].classList.remove('Ship')
                  squares[currentGunIndex].classList.add('boom')
                  
                  setTimeout(()=> squares[currentGunIndex].classList.remove("boom"), explosionTime)
                  clearInterval(timerShip)
                  clearInterval(timerGun)
                  score++
                  scoreDisplay.innerHTML = `Score: ${score}`
              }}
          }
            timerGun = setInterval (moveGun, 100)
        } else
          console.log("You're out of bullets")
}

// Drops
function placeCrate() {
         // pick random location for crate
         let randomNumber = Math.floor(Math.random()* locations.length)
         // add crate to grid
         squares[locations[randomNumber]].classList.add('crate')
         // setTimeout for crate       
         setTimeout(()=> squares[locations[randomNumber]].classList.remove('crate'), ItemTime)
  
}

function placeHealthCrate() {
         // pick random location for crate
         let randomNumber = Math.floor(Math.random()* locations.length)
         // add crate to grid
         squares[locations[randomNumber]].classList.add('healthcrate')
         // setTimeout for crate       
         setTimeout(()=> squares[locations[randomNumber]].classList.remove('healthcrate'), ItemTime)
}

function checkPickup() { 
      if (squares[hero].classList.contains('crate')) {
         let randomBonus = Math.floor(Math.random() * randomBonuses.length)
         if (randomBonus === 1) {
         rocketAmmo = rocketAmmo + 3
         squares[hero].classList.remove('crate')
         ammoDisplay.innerHTML = `Mines: ${mineAmmo} Rockets: ${rocketAmmo} Lasers: ${laserAmmo} Gun: ${gunAmmo}`
         messageBoard.innerHTML = (`"You picked up 3 rockets! Lets sky high em!"`)
         }
         if (randomBonus === 2) {
         mineAmmo = mineAmmo + 1
         squares[hero].classList.remove('crate')
         ammoDisplay.innerHTML = `Mines: ${mineAmmo} Rockets: ${rocketAmmo} Lasers: ${laserAmmo} Gun: ${gunAmmo}`
         messageBoard.innerHTML = (`"You picked up a mine. Lets blow em up!"`)
         }
        if (randomBonus === 3) {
         gunAmmo = gunAmmo + 10
         squares[hero].classList.remove('crate')
         ammoDisplay.innerHTML = `Mines: ${mineAmmo} Rockets: ${rocketAmmo} Lasers: ${laserAmmo} Gun: ${gunAmmo}`
         messageBoard.innerHTML = (`"You picked up 10 bullets. Shoot!"`)
         }
        if (randomBonus === 4) {
         laserAmmo = laserAmmo + 3
         squares[hero].classList.remove('crate')
         ammoDisplay.innerHTML = `Mines: ${mineAmmo} Rockets: ${rocketAmmo} Lasers: ${laserAmmo} Gun: ${gunAmmo}`
         messageBoard.innerHTML = (`"You picked up laser energy!"`)
         }
      }
  
      if (squares[hero].classList.contains('healthcrate')) {
         lives++
         squares[hero].classList.remove('healthcrate')
         livesDisplay.innerHTML = `Lives: ${lives}`
         messageBoard.innerHTML = (`"You picked up a healh crate!"`)
      }
}

// Enemy 

function createEnemyShip() {
         let Ship = random
         
          function moveShip() {       
          if (Ship + spaceDirection > 599) {
          squares[Ship].classList.remove('Ship')
          clearInterval(timerShip)
          lives--
          livesDisplay.innerHTML = `Lives: ${lives}`}
          else if (squares[Ship].classList.contains('gun')) {
                clearInterval(timerShip)
                console.log(test)
                squares[Ship].classList.remove('Ship')
                squares[Ship].classList.remove('gun')
                squares[Ship].classList.add('boom')
                
                setTimeout(()=> squares[Ship].classList.remove("boom"), explosionTime)
                
                score++
                scoreDisplay.innerHTML = `Score: ${score}`
        	}  else {
          squares[Ship].classList.remove('Ship')
          Ship = Ship + spaceDirection
          squares[Ship].classList.add('Ship')
          }
          }
        
  let timerShip = setInterval (moveShip, (enemyShipInterval))
}

createEnemyShip()

function checkEnemy () {}

// TIMERS
let timerHealthCrates = setInterval(placeHealthCrate, healthCrate)
let timerCrates = setInterval(placeCrate, ammoCrate)
let timerCheckPickup = setInterval(checkPickup, 100)
let timerCheckEnemy = setInterval(checkEnemy, 100)

startButton.addEventListener('click', restart)
document.addEventListener('keydown', controlHero)

})
</script>

<div class="spaceInvaders" bind:this={root}>
        <div class="containerstats">
          <h1>Space Invaders</h1>
          <button id="start">START GAME</button>
          <div class="stats">
            <div id="score"></div>
            <div id="stars"></div>
            <div id="lives"></div>
          </div>
          <div id="textbox">   
            <p><a id="ammo"></a></p>
            <p><a id="Messages"></a></p>
            <p> 
              Move: &#8592; &#8593; &#8594; &#8595;<br>
              Gun W | Rocket S | Mine D | Laser A<br>
          </p>
          </div>
        </div>

        <div class="containergame">
          <div id="grid"></div>
        </div>
</div>

<style>

.spaceInvaders {
    margin: 0 auto;
    width: 850px;
    display: grid;
    grid-template-columns: 1fr 1fr;
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
  margin-top: 20px;
}

#Messages {
  color: #7FFFD4;
}

#ammo {
  border-bottom: 2px solid #7FFFD4;
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

:global.square {
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

/* Button */
button{
     color: black;
     height: 50px;
     width: 200px;
     background-color: #7FFFD4;
     cursor: pointer;
     font-weight: 700;
     font-size: 14px;
     letter-spacing: 1px;
     border:none;
     border-radius: 15px 0 15px 0;
     margin: 20px 0;
 }

 button:hover {
    background: #7FFFD4;
    color: #fff;
}

/* Icons */

:global.heroShip {
  background-image: url("https://i.ibb.co/dKsYGtN/Hero.png");
}

:global.Ship {
  background-image: url("https://i.ibb.co/1M8XczW/Invader-Ship.png")
}

:global.Drone {
  background-image: url("https://i.ibb.co/nsttZnk/Invader-Drone.png")
}

:global.mine {
    background-image: url("https://i.ibb.co/yfD5SjR/Dynamite.png")
}

:global.rocket {
    background-image: url("https://i.ibb.co/TP8hB0X/Rocket.png")
}

:global.boom {
    background-image: url("https://i.ibb.co/XXTcZw2/Boom.png")
}

:global.boomLaser {
    background-image: url("https://i.ibb.co/F5Y3Bqs/boom-Laser.png")
}

:global.laser {
    background-image: url("https://i.ibb.co/XXkcKvy/laser.png")
}

:global.crate {
   background-image: url("https://i.ibb.co/PW877gH/crate.png")
}

:global.gun {
  background-image: url("https://i.ibb.co/L6hWCDr/gun.png")
}

:global.healthcrate {
   background-image: url("https://i.ibb.co/9pqgVB0/health.png")
}

:global.star {
   background-image: url("https://i.ibb.co/JjBrPZc/star.png")
}

</style>