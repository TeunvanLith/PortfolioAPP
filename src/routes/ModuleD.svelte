<script>
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte'
    import Clock from './clock.svelte'
    import Calculator from './calculator.svelte'
    import Todo from './todo.svelte'
    import CircleProg from './progression30.svelte'
    let clock = false;
    let calculator = false;
    let todo = false;

    onMount (() => {
        setTimeout(() => {calculator = true},500)
        setTimeout(() => {todo = true},1000)
        setTimeout(() => {clock = true},1500)
    })

</script>
<div class="containerModuleD" transition:fade>
    
    {#if calculator}
    <Calculator />
    {/if}

    {#if todo}
    <Todo />
    {/if}

    {#if clock}
    <Clock />
    {/if}

</div>
<style>

    .containerModuleD {
        position: relative;
        width: 80%;
        margin: 0px auto;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 20px;
    }

    @media (max-width: 1400px) {
        .containerModuleD {
        grid-template-columns: 1fr 1fr;
        padding-bottom: 200px;
         }   
    }

    @media (max-width: 1000px) {
            .containerModuleD {
            grid-template-columns: 1fr;
            padding-bottom: 200px;
        }
    }
</style>