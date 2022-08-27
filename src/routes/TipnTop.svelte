<script type="typescript">
    import TiptopStore from "./stores/TiptopStore"
    import { fade } from 'svelte/transition'
    import Users from './stores/UserStore'
    import TaskStore from './stores/TaskStore'

    // DATA
    let tip:string;
    let top:string;
    let naam:string;

    let alerttip = "";
    let alerttop = "";
    let alertVisible = false;

    let introtext = "Geef uw mening!"

    let check = false;

    const addXP = (xp:number) => {
            Users.update(users => {
                    let copyUsers = [...users];
                    let changeUser = copyUsers.find((user) => user.voornaam == "Inge");
                    changeUser.xp = changeUser.xp + xp;
                    check = true;
                    return copyUsers;

                })
    }

    const addTipnTop = () => {
        let valid = true;

        if (tip.trim().length <= 10) {
            alertVisible = true;
            valid = false;
            alerttip = "De tip moet langer zijn dan 10 letters.";
        }
        if (top.trim().length <= 10) {
            alertVisible = true;
            valid = false;
            alerttip = "De top moet langer zijn dan 10 letters.";
        }

        if (valid) {
            alerttip = "";
            alerttop = "";
            alertVisible = false;

            check = true;
            introtext = "Bedankt voor uw mening!"
            addXP(400);

            const data = {
                Tip: tip,
                Top: top,
                Naam: naam,
                ID: Math.floor(Math.random() * 100000)
            }

            TiptopStore.update (e => {
                return [data, ...e];
            })    

            TaskStore.update(task => {
                    let copyTasks = [...task];
                    let changeTask = copyTasks.find((task) => task.id == "004");
                    changeTask.completed = "&#9745;";
                    return copyTasks;
            })
        }
    };
</script>

<div class="tipntop">
    <div class="inputs">
        <h1>Tip n Top</h1>
        <div class="intro">
        <p>{introtext}</p>
        </div>

        {#if !check}
        <div class="inputfields">
                <textarea class="input itip" bind:value={tip} placeholder="Wat is uw tip?" maxlength="200" rows="4"></textarea>
                <textarea class="input itop" bind:value={top} placeholder="Wat is uw top?" maxlength="200" rows="4"></textarea>
        </div>
            {#if alertVisible}
            <div class="alerts">{alerttip}<br />{alerttop}</div>
            {/if}
            <button on:click={addTipnTop}>Toevoegen</button>
        {/if}
    </div>

    <div class="output">
        <div class="tops">
            <h1>Tips</h1>
            <div class="cardz">
            {#each $TiptopStore as e}
            <div transition:fade class="cards tip">{e.Tip}<div class="sign minus"><i class="fa-solid fa-wrench"></i></div></div>
            {/each}
            </div>
        </div>
        
        <div class="tops">
            <h1>Tops</h1>
            <div class="cardz">
            {#each $TiptopStore as e}
            <div transition:fade class="cards top">{e.Top}<div class="sign plus"><i class="fa-solid fa-thumbs-up"></i></div></div>
            {/each}
            </div>
        </div>
    </div>
</div>


<style>
h1 {
 margin: 0;
}

/*  Containers */
.tipntop {
    margin: 50px auto;
    width: 90vw;
}

.intro {
    background-color: #001528;
    border: 1px solid orange;
    color: #fff;
    padding: 10px;
    font-weight: 600;
    text-align: center;
    border-radius: 15px 0 15px 0;
    margin: 20px auto;
    padding: 10px;
    width: 200px;
}

.inputfields {
    margin-top: 20px;
}

/* Button */
button{
     color: white;
     height: 50px;
     width: 130px;
     background-color: #001528;
     cursor: pointer;
     font-weight: 700;
     font-size: 14px;
     letter-spacing: 1px;
     border:none;
     margin-top: 20px;
     border: 1px solid orange;
 }

 button:hover {
    background: #ffffff;
    color: #04a7f4;
}

/* Inputs */
.input {
    background-color: #001528;
    border: 1px solid #444;
    color: #fff;
    padding: 10px;
    font-weight: 600;
    text-align: center;
}

.itip,
.itop {
    border-radius: 15px 0 15px 0;
    width: 300px;
    height: 120px;
}

.input:focus {
    border: 2px solid orange;
    outline: none;
}

/* Cards output */
.output {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    padding-bottom: 100px;
}

.cardz {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    overflow: hidden;
}

.cards {
    position: relative;
    height: 150px;
    width: 150px;
    background-color: #001528;
    border: 1px solid orange;
    color: #fff;
    padding: 10px;
    border-radius: 15px 0 15px 0;
    margin: 20px auto;
    font-weight: 600;
    -webkit-box-shadow: 10px 10px 16px -11px rgba(0,0,0,1);
    -moz-box-shadow: 10px 10px 16px -11px rgba(0,0,0,1);
    box-shadow: 10px 10px 16px -11px rgba(0,0,0,1);
}

.tip {
    border: 1px solid #00a3d0;
}

.sign {
    font-size: 30px;
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.plus {
    color: orange;
}

.minus {
    color: #00a3d0;
}

.alerts {
    padding: 10px;
    color: orange;
}
</style>