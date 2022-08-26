<script>
    import Button from "./button.svelte";
    import  {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    let text = "Start";
   
    const openAccount = () => {
        dispatch('openAccount');
    }

    const openModules = () => {
        dispatch('openModules');
    }
</script>

    <div class="container">
    <button on:click={openAccount}>Creëer account</button>
    <button on:click={openModules}>Modules</button>
    </div>

<style>
.container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

 button{
     color: white;
     height: 50px;
     width: 130px;
     border-radius: 15px 0 15px 0;
     background-color: #04a7f4;
     cursor: pointer;
     font-weight: 700;
     font-size: 14px;
     letter-spacing: 1px;
     border:none;
     margin-right: 50px;
 }

 button:hover {
    background: #0183bf;
}
 </style> 