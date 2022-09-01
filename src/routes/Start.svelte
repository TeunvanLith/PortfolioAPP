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

<h1 class="welkom">Welkom op mijn portfolio!</h1><br />
    <div class="container">
        <div class="Button">
    <button on:click={openAccount}>Creëer account</button>
    <button on:click={openModules}>Modules</button>
        </div>
    </div>

<style>
.container {
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
     margin: 20px auto;
     display: block;
 }

 button:hover {
    background: #0183bf;
}

h1 {
    padding-top: 300px;
    font-family: 'Dancing Script', cursive;
    font-weight: 700;
}
 </style> 