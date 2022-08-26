<script>
    import { onMount } from 'svelte';
    import Tasks from '../routes/stores/TaskStore';
    import Users from '../routes/stores/UserStore';

    // GET TIME //

    let getHours;
    let getMinutes;
    let getSeconds;
    let getDate;

    const getTime = () => {
        const time = new Date();
        getHours = time.getHours();
        getMinutes = time.getMinutes();
        getSeconds = time.getSeconds();
        getDate = time.getDate();

            if (getHours > 12 ) {
                getHours = getHours - 12
            }
    } 
    setInterval(getTime, 100);
    
    // CHECK IF WIN // 

    const checkTime = () => {
         if (getSeconds === 14 || getSeconds === 15 || getSeconds === 16) {
            Tasks.update(task => {
                let copyTasks = [...task];
                let changeTask = copyTasks.find((task) => task.id == "003");
                changeTask.completed = "&#9745;";
                addXP(300);
                return copyTasks;

            })

          }
    }

    const addXP = (xp) => {
        Users.update(users => {
                let copyUsers = [...users];
                let changeUser = copyUsers.find((user) => user.voornaam == "Inge");
                changeUser.xp = changeUser.xp + xp;
               
                return copyUsers;

            })
    }
    
    // ROTERS BINDING //
    let hours
    let minutes 
    let seconds 

    // ROTATE CLOCK //
    onMount( () => {

       const changeTime = () => {
    
       let degMinutes = (6 * getMinutes)
       let degSeconds = (6 * getSeconds)
       let degHours = (30 * getHours)

       hours.style.transform = `rotate(${degHours}deg)`;
       minutes.style.transform = `rotate(${degMinutes}deg)`;
       seconds.style.transform = `rotate(${degSeconds}deg)`;
       }
       
       setInterval(changeTime, 100) 
    })  

  
</script>
<div>
<h1>Clock</h1><br />

<div class="clockcontainer">
    <div id="clock">
        <div bind:this={hours} id="hours"></div>
        <div bind:this={minutes} id="minutes"></div>
        <div bind:this={seconds} id="seconds"></div>
        <div id="day">{getDate}</div>
        <div id="dot"></div>
    </div>
</div>

<button on:click={ () => {checkTime()}}>Test your timing!</button>

</div>
<style>
    .clockcontainer {
        position: relative;
        height: 154px;
        width: 154px;
        margin: 0 auto;
    }

    #clock {
        position: absolute;
        width: 150px;
        height: 150px;
        border: 2px solid #b60f55;
        border-radius: 77px;
        background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;
 background-blend-mode: multiply,multiply;
    }

    #hours, #minutes, #seconds {
        position: absolute;
        left: 75px;
        bottom: 75px;
        border-radius: 2px;
    }

    #dot {
        width: 12px;
        height: 12px;
        background-color: #444;
        border-radius: 4px;
        position: absolute;
        left: 70px;
        bottom: 73px;
    }

    #hours {
        width: 4px;
        height: 35px; 
        background-color: #b60f55;
        transform-origin: 0 100%;
    }

    #minutes {
        width: 4px;
        height: 60px;
        background-color: rgb(42, 42, 42);
        transform-origin: 0 100%;  
    }

    #seconds {
        background-color: #04a7f4;
        width: 4px;
        height: 70px;
        transform-origin: 0 100%;
    }

    #day {
        position: absolute;
        height: 20px;
        width: 20px;
        background-color: rgba(84, 84, 84, 0.4);
        line-height: 20px;
        left: 100px;
        bottom: 35px;
        font-size: 12px;
        color: #222;
        transform: rotate(45deg);
        font-weight: 800;
        border: 1px solid #b60f55;
        border-radius: 5px 0 5px 0;
    }

    button{
     color: white;
     height: 50px;
     width: 130px;
     background-color: #04a7f4;
     cursor: pointer;
     font-weight: 700;
     font-size: 14px;
     letter-spacing: 1px;
     border:none;
     border-radius: 25px 0 25px 0;
     margin-top: 50px;
    }

    button:hover {
        background: #046b9b;
        color: #fff;
        box-shadow: 5px 5px rgb(42, 42, 42)
    }
</style>
