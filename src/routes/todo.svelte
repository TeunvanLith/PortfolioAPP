<script>
    import { fade } from 'svelte/transition';
    import Tasks from './stores/TaskStore';
    import Users from './stores/UserStore';
    export let ID;

    let tdName = '';
    let tdTime;
    let tdPrio = '';
    let countTodo = 0;
    let prioriteiten = [
    'Meteen', 
    'Snel', 
    'Vandaag'];
    
    let Todos = [];
    
    let task001 = false;

    let alertvisible = false;

    const addnewTodo = () => {
        if (tdName.length > 4 && tdTime > 0 && tdPrio.length > 0) {
        alertvisible = false;
        let newTodo = {Name: tdName, Time: tdTime, Prio: tdPrio, ID: Math.random()};
        Todos = [...Todos, newTodo];
        tdName = '';
        tdTime = '';
        countTodo = countTodo + 1;
        checkTask();
    } else {
        alertvisible = true;
    }
    }

    const deleteTodo = (id) => {
     let filteredTodos = Todos.filter(td => td.ID != id)
  	 Todos = filteredTodos;
    }

    const checkTask = () => {
          if (countTodo >= 1) {
            Tasks.update(task => {
                let copyTasks = [...task];
                let changeTask = copyTasks.find((task) => task.id == "001");
                changeTask.completed = "&#9745;";
                addXP(100)                
                return copyTasks;
                })
          }
    }

    const addXP = (xp) => {
        Users.update(users => {
                let copyUsers = [...users];
                let changeUser = copyUsers.find((user) => user.user_ID == ID);
                if (changeUser.task001 ==  false) {
                changeUser.xp = changeUser.xp + xp;
                changeUser.task001 = true;
                }
                return copyUsers;

            })
    }

</script>
<div class="containertodo">
    <h1>To do list</h1>

    <div class="input">
        <div class="inputtop">
            <input type="text" class="taak inputred" bind:value={tdName} placeholder="Taak" maxlength="20">
            <input type="number" class="tijd" bind:value={tdTime} placeholder="Aantal minuten" oninput="this.value=this.value.slice(0,this.maxLength)" maxlength="3">
            <button class="btn toevoegen" on:click={addnewTodo}>Toevoegen</button>  
        </div>
        {#if alertvisible}
        <div class="redbox"></div>
        {/if}
        <div class="inputbottom">
            {#each prioriteiten as p}
            <div class="prioriteiten">
            <span class="td-lb">
            <input class="td-cb" type=checkbox bind:group={tdPrio} name="prios" value={p}><p class="priotext">{p}</p>
            </span>
            </div>
            {/each}
        </div>
    </div>

    <div class="output">
        <ul>
            {#each Todos as todo}
            {#if todo.Prio == "Meteen"}
            <div class="todobox red" transition:fade>
                <li class="td-li">{todo.Name} <br /> {todo.Time} min | {todo.Prio}<div class="del-btn" on:click={ () => {deleteTodo(todo.ID)}}>&#9745;</div></li>
            </div>
            {/if}
            {#if todo.Prio == "Snel"}
            <div class="todobox orange" transition:fade>
                <li class="td-li">{todo.Name} <br /> {todo.Time} min | {todo.Prio}<div class="del-btn" on:click={ () => {deleteTodo(todo.ID)}}>&#9745;</div></li>
            </div>
            {/if}
            {#if todo.Prio == "Vandaag"}
            <div class="todobox yellow" transition:fade>
                <li class="td-li">{todo.Name} <br /> {todo.Time} min | {todo.Prio}<div class="del-btn" on:click={ () => {deleteTodo(todo.ID)}}>&#9745;</div></li>
            </div>
            {/if}
            {/each}
        </ul>
    </div>
</div>

<style>
.input {
    width: 300px;
    margin: 0 auto;
    margin-bottom: 20px;
}

.output {
    width: 300px;
    margin: 0 auto;
}

.inputtop {
    display: grid;
    grid-template-areas: 
    "one one two"
    "three three two"
}

.inputbottom {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-radius: 0 0 10px 0;
    background-color: #001528;
    border: 1px solid #444;
}

.taak {
    grid-area: one;
    border-radius: 10px 0 0 0;
}

.tijd {
    grid-area: three;
}

.toevoegen {
    grid-area: two;
}

input {
    background-color: #001528;
    border: 1px solid #444;
    color: #fff;
    padding: 10px;
    font-weight: 600;
    text-align: center;
}

input:focus {
    border: 2px solid #11753c;
    outline: none;
}

.redbox { 
    width: 100%;
    height: 5px;
    background-color: rgb(175, 6, 6);
    box-sizing: border-box;
}
button{
     color: white;
     background-color: #11753c;
     cursor: pointer;
     font-weight: 700;
     font-size: 14px;
     letter-spacing: 1px;
     border:none;
 }

 button:hover {
    background: #093f20;
    color: #fff;
}

.td-li{
    line-height: 30px;
}

.prioriteiten {
    height: 20px;
    padding: 5px;
    text-align: left;
    font-size: 14px;
    border-right: 1px solid #444;
}

.inputbottom :last-child {
    border-right: 0px solid #444;
}

.todobox {
    height: 60px;
    width: 300px;
    margin: 0 auto;
    border-radius: 0 0 15px  0;
    position: relative;
    margin-top: 10px;
    background: #222;
}

.red {
    border-left: 5px solid red;
}

.orange {
    border-left: 5px solid orange;
}

.yellow {
    border-left: 5px solid yellow;
}

ul { 
  list-style-type: none;
  margin: 0 auto;
  padding-left: 0;
}

/* Button */

.del-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    color: #fff;
    height: 20px;
    width: 20px;
    background-color: #666;
    border-radius: 10px;
    line-height: 20px;
}

.del-btn:hover {
    background-color: rgb(128, 8, 8);
    cursor: pointer;
}

.priotext {
    display: inline-block;
    margin: 0;
    padding-left: 5px;
}

h1 {
    margin-bottom: 50px;
}
</style>