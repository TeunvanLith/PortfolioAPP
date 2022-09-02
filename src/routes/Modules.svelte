<script>
    import Button from './button.svelte';
    import  {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    import { fade } from 'svelte/transition';

    let text = "Kies"
    let colorA = "#04a7f4"
    let colorB = "orange"
    let colorC = "#b60f55"
    export let colorD = "#11753c"

    let moduleA = true
    let moduleB = true
    let moduleC = true
    let moduleD = true

</script>
<div class="containerModules">
    {#if moduleA}
    <div transition:fade class="containerModule" style="border: 3px solid {colorA}">
        <h1 style="color:{colorA}">Games</h1>
        <h2>Snake</h2>
        <div class="containerButton">
        <Button {text} on:click={ () => {dispatch('showModuleA')}}/>
        </div>
    </div>
    {/if}

    {#if moduleB}
    <div transition:fade class="containerModule" style="border: 3px solid {colorB}">
        <h1 style="color:{colorB}">Work</h1>
        <h2>Tip 'n Top Reviews</h2>
        <div class="containerButton">
        <Button {text} on:click={ () => {dispatch('showModuleB')}}/>
        </div>
    </div>
    {/if}

       {#if moduleD}
    <div transition:fade class="containerModule" style="border: 3px solid {colorD}">
        <h1 style="color:{colorD}">Tools</h1>
        <h2>Calculator</h2><br />
        <h2>To do</h2><br />
        <h2>Clock</h2><br />
        <div class="containerButton">
        <Button {text} on:click={ () => {dispatch('showModuleD')}}/>
        </div>
    </div>
    {/if}

    {#if moduleC}
    <div transition:fade class="containerModule" style="border: 3px solid {colorC}">
        <h1 style="color:{colorC}">About me</h1>
        <h2>Contact me</h2>
        <div class="containerButton">
        <Button {text} on:click={ () => {dispatch('showModuleC')}}/>
        </div>
    </div>
    {/if}
</div>


<style>
    .containerModules {
        width: 80%;
        margin: 0px auto;
        padding-top: 50px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding-bottom: 50px;
    }

    .containerModule {
        width: 300px;
        height: 450px;
        border-radius: 10px;
        background-color: rgba(31, 31, 31, .5);
        border: 1px solid rgb(31, 31, 31);
        position: relative;
        margin: 10px 10px;
    }

    h1 {
        margin-top: 50px;
        margin-bottom: 50px;
    }

    h2 {
        margin-bottom: 0px;
    }

    .containerButton {
        position: absolute;
        bottom: 20px;
        width: 300px;
            
    }

    @media (max-width: 900px) {
        .containerModule {
        width: 300px;
        height: 300px;
        border-radius: 10px;
        background-color: rgba(31, 31, 31, .5);
        border: 1px solid rgb(31, 31, 31);
        position: relative;
        margin: 10px 10px;
    }
        h1 {
            margin-top: 20px;
            margin-bottom: 20px;
        }

        h2 {
            font-size: 16px;
        }
    }

</style>