<script>
    import { onMount, onDestroy } from 'svelte'
    import Tasks from '../routes/stores/TaskStore'
    import Users from '../routes/stores/UserStore'
    export let ID = 0;
    // GET TIME //

    let getHours = 0;
    let getMinutes = 0;
    let getSeconds = 0;
    let getDate = 0;

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
    
    

    // CHECK IF WIN // 

    const checkTime = () => {
         if (getSeconds === 14 || getSeconds === 15 || getSeconds === 16) {
            Tasks.update(task => {
                let copyTasks = [...task];
                let changeTask = copyTasks.find((task) => task.id == "003");
                changeTask.completed = "&#9745;";
                addXP(300)
                return copyTasks;

            })

          }
    }

    const addXP = (xp) => {
        Users.update(users => {
                let copyUsers = [...users];
                let changeUser = copyUsers.find((user) => user.user_ID == ID);
                if (changeUser.task003 ==  false) {
                changeUser.xp = changeUser.xp + xp;
                changeUser.task003 = true;
                }
                return copyUsers;

            })
    }
    
    // ROTERS BINDING //
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    // ROTATE CLOCK //
    onMount( () => {
    
       const interval = setInterval(getTime, 100);

       const changeTime = () => {
    
       let degMinutes = (6 * getMinutes)
       let degSeconds = (6 * getSeconds)
       let degHours = (30 * getHours)

       hours.style.transform = `rotate(${degHours}deg)`;
       minutes.style.transform = `rotate(${degMinutes}deg)`;
       seconds.style.transform = `rotate(${degSeconds}deg)`;
       }
       
       const starter = setInterval(changeTime, 100);

       return () => { 
        clearInterval(interval);
        clearInterval(starter);

       }
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
        border: 2px solid #11753c;
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
        width: 2px;
        height: 35px; 
        background-color: #11753c;
        transform-origin: 0 100%;
    }

    #minutes {
        width: 2px;
        height: 60px;
        background-color: rgb(42, 42, 42);
        transform-origin: 0 100%;  
    }

    #seconds {
        background-color: #484848;
        width: 2px;
        height: 70px;
        transform-origin: 0 100%;
    }

    #day {
        position: absolute;
        height: 20px;
        width: 20px;
        background-color: rgba(135, 135, 135, 0.4);
        line-height: 20px;
        left: 100px;
        bottom: 35px;
        font-size: 12px;
        color: #222;
        transform: rotate(45deg);
        font-weight: 800;
        border: 1px solid #11753c;
        border-radius: 5px 0 5px 0;
    }

    button{
     color: white;
     height: 50px;
     width: 130px;
     background-color: #11753c;
     cursor: pointer;
     font-weight: 700;
     font-size: 14px;
     letter-spacing: 1px;
     border:none;
     border-radius: 25px 0 25px 0;
     margin-top: 50px;
    }

    button:hover {
        background: #093f20;
        color: #fff;
    }
</style>
