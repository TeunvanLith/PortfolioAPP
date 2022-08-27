<script>
   import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let theme;
</script>

<div id="backToMain" onMouseOver="this.style.color='{theme}'" on:click={ () => {dispatch('toggleBack')}}><i class="fa-solid fa-circle-chevron-left"></i></div>


<style>
 #backToMain {
        position: absolute;
        right: 50px;
        bottom: 10%;
        height: 100px;
        width: 100px;
        border-radius: 10px;
        text-align: center;
        color: white;
        line-height: 60px;
        font-size: 100px;
    }

    #backToMain:hover {
        cursor: pointer;
    }
</style>