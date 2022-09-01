<script>
   import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let theme;
</script>

<div id="backToMain" onMouseOver="this.style.color='{theme}'" onMouseOut="this.style.color='#fff'" on:click={ () => {dispatch('toggleBack')}}><i class="fa-solid fa-circle-chevron-left"></i></div>

<style>
 #backToMain {
        position: fixed;
        right: 10%;
        bottom: 10%;
        border-radius: 10px;
        text-align: center;
        color: white;
        line-height: 60px;
        font-size: 100px;
    }

    #backToMain:hover {
        cursor: pointer;
    }

    @media (max-width: 768px) {
        #backToMain {
            position: fixed;
            font-size: 60px;
            top: 20px;
            right: 20px;
            height: 60px;
            border: 1px solid red;
        }
    }
</style>