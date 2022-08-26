<script>
   import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
</script>

<div id="backToMain" on:click={ () => {dispatch('toggleBack')}}><i class="fa-solid fa-circle-chevron-left"></i></div>


<style>
 #backToMain {
        position: absolute;
        right: 50px;
        top: 750px;
        height: 100px;
        width: 100px;
        border-radius: 10px;
        text-align: center;
        color: white;
        line-height: 60px;
        font-size: 100px;
    }

    #backToMain:hover {
        color: #04a7f4;
        cursor: poin
    }
</style>