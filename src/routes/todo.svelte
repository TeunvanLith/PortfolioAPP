<script>
    import { fade } from 'svelte/transition';
    import Tasks from './stores/TaskStore';
    import Users from './stores/UserStore';

    let tdName = '';
    let tdTime;
    let tdPrio = '';
    let countTodo = 0;
    let task001 = false;

    let prioriteiten = [
    'Zo snel mogelijk', 
    'Vandaag', 
    'Binnenkort'];

    let Todos = [];

    const addnewTodo = () => {
        let newTodo = {Name: tdName, Time: tdTime, Prio: tdPrio, ID: Math.random()};
        Todos = [...Todos, newTodo];
        tdName = '';
        tdTime = '';
        countTodo = countTodo + 1;
        checkTask();
    }

    const deleteTodo = (id) => {
     let filteredTodos = Todos.filter(td => td.ID != id)
  	 Todos = filteredTodos;
    }

    const checkTask = () => {
          if (countTodo >= 3) {
            Tasks.update(task => {
                let copyTasks = [...task];
                let changeTask = copyTasks.find((task) => task.id == "001");
                changeTask.completed = "&#9745;";
                addXP(100);
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
</script>
<div class="containertodo">
    <h1>To do</h1>

    <div class="input">
        <input type="text" class="" bind:value={tdName} placeholder="Taak"><br />
        <input type="number" class="" bind:value={tdTime} placeholder="Aantal minuten"><br />
        {#each prioriteiten as p}
        <div class="prioriteiten">
	    <span class="td-lb">
		<input class="td-cb" type=checkbox bind:group={tdPrio} name="prios" value={p}><p class="priotext">{p}</p>
        </span><br />
        </div>
        {/each}
        <br />
        <button class="btn" on:click={addnewTodo}>Toevoegen</button>
    </div>

    <div class="output">
        <ul>
            {#each Todos as todo}
            {#if todo.Prio == "Zo snel mogelijk"}
            <div class="todobox red" transition:fade>
                <li class="td-li">{todo.Name} <br />{todo.Time} min | {todo.Prio}<div class="del-btn" on:click={ () => {deleteTodo(todo.ID)}}>X</div></li>
            </div>
            {/if}
            {#if todo.Prio == "Vandaag"}
            <div class="todobox orange" transition:fade>
                <li class="td-li">{todo.Name} <br />{todo.Time} min | {todo.Prio}<div class="del-btn" on:click={ () => {deleteTodo(todo.ID)}}>X</div></li>
            </div>
            {/if}
            {#if todo.Prio == "Binnenkort"}
            <div class="todobox yellow" transition:fade>
                <li class="td-li">{todo.Name} <br />{todo.Time} min | {todo.Prio}<div class="del-btn" on:click={ () => {deleteTodo(todo.ID)}}>X</div></li>
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
}

.output {
    width: 300px;
    margin: 0 auto;
}

input {
    background-color: #001528;
    border: 1px solid #444;
    color: #fff;
    padding: 10px;
    font-weight: 600;
    text-align: center;
    margin: 0 auto;
}

input:focus {
    border: 2px solid #11753c;
    outline: none;
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
     margin-right: 10px;
     border-radius: 15px 0 15px 0;
     margin-top: 10px;
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
    line-height: 20px;
    text-align: left;
    padding-left: 50px;
}

.todobox {
    height: 60px;
    width: 300px;
    margin: 0 auto;
    border-radius: 15px 0 15px 0;
    position: relative;
    margin-top: 10px;
}

.red {
    border: 1px solid red;
}

.orange {
    border: 1px solid orange;
}

.yellow {
    border: 1px solid yellow;
}

ul { 
  list-style-type: none;
  margin: 0 auto;
  padding-left: 0;
}

.del-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    color: #fff;
    height: 20px;
    width: 20px;
    background-color: rgb(181, 15, 15);
    border-radius: 5px 0 5px 0;
    line-height: 20px;
}

.del-btn:hover {
    background-color: rgb(128, 8, 8);
    cursor: pointer;
}

.priotext {
    display: inline-block;
    margin-left: 20px;
}

h1 {
    margin-bottom: 50px;
}
</style>