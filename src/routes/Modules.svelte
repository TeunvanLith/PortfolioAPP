<script>
    import Button from './button.svelte';
    import  {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';

    let text = "Kies"
    let colorA = "aqua"
    let colorB = "orange"
    let colorC = "#b60f55"
    export let colorD = "red"

    let moduleA = false
    let moduleB = false
    let moduleC = false
    let moduleD = false

    onMount( () => {
        setTimeout(() => {moduleA = true},300)
        setTimeout(() => {moduleB = true},600)
        setTimeout(() => {moduleC = true},900)
        setTimeout(() => {moduleD = true},1200)
    })

</script>
<div class="containerModules">
    {#if moduleA}
    <div transition:fade class="containerModule" style="border: 2px solid {colorA}">
        <h1 style="color:{colorA}">Games</h1>
        <div class="infoModule">
        <h2>Space Invaders</h2>
        </div>

        <Button {text} on:click={ () => {dispatch('showModuleA')}}/>
    </div>
    {/if}

    {#if moduleB}
    <div transition:fade class="containerModule" style="border: 2px solid {colorB}">
        <h1 style="color:{colorB}">Work</h1>
        <div class="infoModule">
        <h2>Tip 'n Top Reviews</h2>
        </div>

        <Button {text} on:click={ () => {dispatch('showModuleB')}}/>
    </div>
    {/if}

    {#if moduleC}
    <div transition:fade class="containerModule" style="border: 2px solid {colorC}">
        <h1 style="color:{colorC}">Webdesign</h1>
        <div class="infoModule">
        <h2>Contact me</h2>
        </div>

        <Button {text} on:click={ () => {dispatch('showModuleC')}}/>
    </div>
    {/if}

    {#if moduleD}
    <div transition:fade class="containerModule" style="border: 2px solid {colorD}">
        <h1 style="color:{colorD}">Tools</h1>
        <div class="infoModule">
        <h2>Calculator</h2><br />
        <h2>To do</h2><br />
        <h2>Clock</h2><br />
        </div>
        <Button {text} on:click={ () => {dispatch('showModuleD')}}/>
    </div>
    {/if}
</div>


<style>
    .containerModules {
        width: 80%;
        margin: 0px auto;
        padding-top: 100px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 50px;
    }

    .containerModule {
        width: 300px;
        height: 450px;
        border-radius: 10px;
        background-color: rgba(31, 31, 31, .5);
        border: 1px solid rgb(31, 31, 31);
        position: relative;
    }

    h1 {
        margin-top: 50px;
        margin-bottom: 280px;
    }

    h2 {
        margin-bottom: 0px;
    }

    .infoModule {
        position: absolute;
        top: 150px;
        text-align: center;
        width: 100%;
    }
</style>