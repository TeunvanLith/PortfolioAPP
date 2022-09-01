<script>
  import Tasks from './stores/TaskStore'
  import { onMount } from 'svelte';
  export let a
  export let b
  export let c
  export let d
  export let theme = "#fff"

</script>

    <div class="tasks" style="border: 1px solid {theme}; border-bottom: 0px">
        <p class="head-tasks" style="color: {theme}">Tasks</p>
        <div class="containertasks">
        {#each $Tasks as task}
            {#if a}
                {#if task.module == "A"}
                    {#if task.completed =="&#9744;"}
                    <p class="icon">{@html task.completed}</p> <p class="task">{task.task}</p><br />
                    {/if}
                    {#if task.completed =="&#9745;"}
                    <p class="icon">{@html task.completed}</p> <p class="task" style="text-decoration: line-through {theme} 3px;">{task.task}</p><br />
                    {/if}
                {/if}
            {/if}
            {#if b}
                {#if task.module == "B"}
                    {#if task.completed =="&#9744;"}
                    <p class="icon">{@html task.completed}</p> <p class="task">{task.task}</p><br />
                    {/if}
                    {#if task.completed =="&#9745;"}
                    <p class="icon">{@html task.completed}</p> <p class="task" style="text-decoration: line-through {theme} 3px;">{task.task}</p><br />
                    {/if}
                {/if}
            {/if}
            {#if c}
                {#if task.module == "C"}
                    {#if task.completed =="&#9744;"}
                    <p class="icon">{@html task.completed}</p> <p class="task">{task.task}</p><br />
                    {/if}
                    {#if task.completed =="&#9745;"}
                    <p class="icon">{@html task.completed}</p> <p class="task" style="text-decoration: line-through {theme} 3px;">{task.task}</p><br />
                    {/if}
                {/if}
            {/if}
            {#if d}
                {#if task.module == "D"}
                    {#if task.completed =="&#9744;"}
                    <p class="icon">{@html task.completed}</p> <p class="task">{task.task}</p><br />
                    {/if}
                    {#if task.completed =="&#9745;"}
                    <p class="icon">{@html task.completed}</p> <p class="task" style="text-decoration: line-through {theme} 3px;">{task.task}</p><br />
                    {/if}
                {/if}
            {/if}
        {/each}
    </div>
    </div>

<style>
.tasks {
    position: fixed;
    background-color: #222;
    min-width: 400px;
    width: 30%;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 20px 20px 0 0;
    border-bottom: 0;
    padding: 10px;
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