<script>
    import UserStore from '../routes/stores/UserStore'
    export let ID;
    import { createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
</script>

<div class="container">
    {#each $UserStore as user}
          {#if user.user_ID === ID}
            <div class="containerAvatar"><img src="{user.profielAfbeelding}" alt="avatar"></div>
            <div class="containerNaam">{user.voornaam} {user.achternaam}</div>
            <div class="containerBedrijf">{user.bedrijfsnaam}</div>
            <progress id="xpbar" class="xpbar" max="1400" value="{user.xp}"></progress>
            {#if user.xp == 1400}
            <div class="containerXP"><p class="FULL">Collected all XP</p></div>
            {/if}
            {#if user.xp < 1400}
            <div class="containerXP"><p class="XP">{user.xp} xp</p></div>
            {/if}
        {/if}
    {/each}
    {#if !ID}
    <h1>Maak account aan en verdien xp!</h1>
    <button class="button" on:click={ () => {dispatch('account')}}>Creëer account</button>
    {/if}

</div>


<style>
    .container {
        width: 250px;
        height: 160px;
        margin: 0 auto;
        border-radius: 0 0 10px 10px;
        background-color: rgba(0, 0, 0, 0.7);
        display: relative;
        margin-bottom: 50px;
    }

    .containerNaam {
        font-family: 'Dancing Script', cursive;
    }

    .containerBedrijf {
        font-family: 'Dancing Script', cursive;
        font-size: 12px;
    }

    .containerAvatar img{
        width: 75px;
        height: 75px;
        border-radius: 0 0 40px 40px;
    }

    .containerXP {
        color: gold;
        margin: 0;
        padding: 0;
    }

    .containerXP p {
        margin-top: 0;
        padding-top: 0;
    }

    progress[value] {
  -webkit-appearance: none;
   appearance: none;
  width: 150px;
  height: 10px;
    transition: 1s easy-in-out;
}

progress::-webkit-progress-bar {
  background: rgb(191, 191, 191);
  border-radius: 5px;
  border: 1px solid #222;
}

progress[value]::-webkit-progress-value {
  background-image:
	  	   -webkit-linear-gradient(45deg, rgb(153, 4, 89) 0%, rgb(135, 46, 91) 100%);
    border-radius: 5px; 
    transition: 1s easy-in-out;
}


h1 { 
 padding: 10px;
 font-family: 'Dancing Script', cursive;
 font-size: 24px;
 font-weight: 700;
}

button{
     color: #fff;
     background-color: #04a7f4;
     height: 50px;
     width: 200px;
     cursor: pointer;
     font-weight: 700;
     font-size: 14px;
     letter-spacing: 1px;
     border:none;
     border-radius: 10px 0 10px 0;
 }

 button:hover {
    background-color: #fff;
    color: #04a7f4;
}

.FULL {
        font-size: 14px;
        color:gold;
}
</style>