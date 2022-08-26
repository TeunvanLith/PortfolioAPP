<script>
  import Tasks from './stores/TaskStore';
    
</script>

    <div class="tasks">
        <p class="head-tasks">Tasks</p>
        <div class="containertasks">
        {#each $Tasks as task}
            {#if task.module == "D"}
            {#if task.completed =="&#9744;"}
            <p class="icon">{@html task.completed}</p> <p class="task">{task.task}</p><br />
            {/if}
            {#if task.completed =="&#9745;"}
            <p class="icon">{@html task.completed}</p> <p class="task doorstreept">{task.task}</p><br />
            {/if}
            {/if}
        {/each}
    </div>
    </div>

<style>
.tasks {
    position: absolute;
    background-color: #222;
    min-width: 400px;
    width: 30%;
    height: 150px;
    bottom: 0px;
    right: 35%;
    border-radius: 20px 20px 0 0;
    border: 1px solid #b60f55;
    border-bottom: 0;
}

.doorstreept {
    text-decoration: line-through rgb(151, 7, 94) 3px;
}

.icon {
    font-size: 20px;
}
p {
    margin-top: 50px;
    display: inline;
    padding: 10px;
}

.head-tasks {
    font-size: 24px;
    margin-top: 20px;
    color: #b60f55;
}
.containertasks {
    margin-top: 20px;
}
</style>