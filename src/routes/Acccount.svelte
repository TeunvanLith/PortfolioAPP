<script>
    import {createEventDispatcher} from 'svelte'
    const dispatch = createEventDispatcher()
    import UserStore from '../routes/stores/UserStore'
    import Button from "../routes/button.svelte"

    let voornaam = ''
    let achternaam = ''
    let leeftijd = 0
    let email = ""
    let telefoon = ""
    let profielAfbeelding = ""
    let page = 1
    let xp = 100;
    let text = "Volgende";


    let alert = "";
    let alertVisible = false;
    let check = false;

    const changePage = () => {
        if (page == 1){
            if (voornaam.trim().length <= 2) {
                alertVisible = true;
                check = false;
                alert = "De voornaam moet langer zijn dan 1 letter.";
            } else if (achternaam.trim().length <= 3) {
                alertVisible = true;
                check = false;
                alert = `${alert} De achternaam moet langer zijn dan 3 letters.`;
            } else check = true;
        }

        if (page == 2){
            if (leeftijd <= 17) {
                alertVisible = true;
                check = false;
                alert = "De leeftijd moet hoger zijn dan 18.";
            } else if (leeftijd >= 99) {
                alertVisible = true;
                check = false;
                alert = "De leeftijd moet lager zijn dan 99.";
            } else check = true;
        }

        if (page == 3){
            if (email.length <= 17) {
                alertVisible = true;
                check = false;
                alert = "Het ingevoerde email klopt niet.";
            } 
            if (telefoon.length <= 9) {
                alertVisible = true;
                check = false;
                alert = "Het nummer klopt niet, aantal te kort.";
            } else check = true;
        }

        if (page == 4){
            if (profielAfbeelding.length <= 10) {
                alertVisible = true;
                check = false;
                alert = "Kies profielafbeelding.";
            } else check = true;
        }

        if (check) {
        page++;
        alertVisible = false;
        alert = "";
        }

        updateProgression();
        if (page > 4) {
            text = "Start Tour";
        }
    }

    let progression = 12;

    const updateProgression = () => {
      progression = progression + 22;
    }

    const closeModal = () => {
        const user = {
            voornaam,
            achternaam,
            leeftijd, 
            email,
            telefoon,
            xp,
            profielAfbeelding,
            user_ID: Math.floor(Math.random() * 10000),
            current: true
        };

        UserStore.update(users => {
            return [user, ...users];
        })

        dispatch('closeModal')
    }
</script>

{#if page == 1}
<h1 class="welkom">Welkom <i style="transform:rotate(10deg)" class="fa-solid fa-hand"></i></h1>
<p class="naam">Wat is uw naam?</p>

    <input type="text" name="voornaam" bind:value={voornaam} placeholder="Uw voornaam"/>
    <input type="text" name="achternaam" bind:value={achternaam} placeholder="Uw achternaam"/> 
    {#if alertVisible} 
    <div class="alert">{alert}</div>
    {/if}
    <br /><br /><br /><br />
   

<div class="containerButton">
    <button class="terug" on:click={ () => {dispatch('closeStart')}}><i class="fa-solid fa-angle-left"></i></button><Button on:click={changePage} {text} />
    <div id="Progression">
        <progress id="Progression-Bar" class="prog" max="100" value="{progression}"></progress>
    </div>
</div>
{/if}

{#if page == 2}
<h1 class="welkom"> Ha {voornaam} {achternaam}!</h1>
<form on:submit|preventDefault={changePage}>
<p class="naam">Wat is uw leeftijd?</p>
    <input type="number" name="leeftijd" bind:value={leeftijd} placeholder="Uw leeftijd"/>
    {#if alertVisible} 
    <div class="alert">{alert}</div>
    {/if}
<br /><br /><br /><br />

<div class="containerButton">
    <button class="terug" on:click={ () => { page--; progression = progression - 22;}}><i class="fa-solid fa-angle-left"></i></button><Button {text} />
    <div id="Progression">
        <progress id="Progression-Bar" class="prog" max="100" value="{progression}"></progress>
    </div>
</div>
</form>
{/if}

{#if page == 3}
<h1 class="welkom">Ik blijf graag in contact!</h1>
<form on:submit|preventDefault={changePage}>
<p class="naam">Hoe kunnen we u bereiken?</p>
<input type="text" name="email" bind:value={email} placeholder="Uw email"/>
<input type="text" name="telefoonnummer" bind:value={telefoon} placeholder="Uw telefoonnummer"/>
{#if alertVisible} 
<div class="alert">{alert}</div>
{/if}
<br /><br /><br />
<div class="containerButton">
    <button class="terug" on:click={ () => { page--; progression = progression - 22;}}><i class="fa-solid fa-angle-left"></i></button><Button {text} />
    <div id="Progression">
        <progress id="Progression-Bar" class="prog" max="100" value="{progression}"></progress>
    </div>
</div>
</form>
{/if}


{#if page == 4}
<h1 class="welkom">Geef jezelf een gezicht!</h1>
<div class="containerIcon">

<div class="containerRadio">
<input type="radio" id="icon1" name="icon1" bind:group={profielAfbeelding} value="https://i.ibb.co/C8G1QH9/Avatar-Female-03.jpg" ><br>
<label for="icon1"></label>
<div class="iconImg"><img src="https://i.ibb.co/C8G1QH9/Avatar-Female-03.jpg"  alt="Female" /></div>
</div>

<div class="containerRadio">
<input type="radio" id="icon2" name="icon2" bind:group={profielAfbeelding} value="https://i.ibb.co/NNWbLYr/Avatar-Male-01.jpg">
<label for="icon2"></label>
<div class="iconImg"><img src="https://i.ibb.co/NNWbLYr/Avatar-Male-01.jpg" alt="Male" /></div>
</div>

<div class="containerRadio">
<input type="radio" id="icon3" name="icon3" bind:group={profielAfbeelding} value="https://i.ibb.co/XWKYVLb/Avatar-Female-01.jpg">
<label for="icon3"></label>
<div class="iconImg"><img src="https://i.ibb.co/XWKYVLb/Avatar-Female-01.jpg" alt="Female" /></div>
</div>

<div class="containerRadio">
<input type="radio" id="icon4" name="icon4" bind:group={profielAfbeelding} value="https://i.ibb.co/98PFGhp/Avatar-Male-02.jpg">
<label for="icon4"></label>
<div class="iconImg"><img src="https://i.ibb.co/98PFGhp/Avatar-Male-02.jpg" alt="Male" /></div>
</div>

<div class="containerRadio">
<input type="radio" id="icon5" name="icon5" bind:group={profielAfbeelding} value="https://i.ibb.co/y8y1mNb/Avatar-Female-02.jpg">
<label for="icon5"></label>
<div class="iconImg"><img src="https://i.ibb.co/y8y1mNb/Avatar-Female-02.jpg" alt="Female" /></div>
</div>

<div class="containerRadio">
<input type="radio" id="icon6" name="icon6" bind:group={profielAfbeelding} value="https://i.ibb.co/P6t6fj8/Avatar-Male-03.jpg">
<label for="icon6"></label>
<div class="iconImg"><img src="https://i.ibb.co/P6t6fj8/Avatar-Male-03.jpg" alt="Male" /></div>
</div>    
</div>
{#if alertVisible} 
    <div class="alert">{alert}</div>
{/if}
<div class="containerButton">
<form on:submit|preventDefault={changePage}>
<button class="terug" on:click={ () => { page--; dispatch('ProgressionD')}}><i class="fa-solid fa-angle-left"></i></button><Button {text}/>
<div id="Progression">
    <progress id="Progression-Bar" class="prog" max="100" value="{progression}"></progress>
</div>
</form>
</div>
{/if}

{#if page == 5}
<h1 class="welkom">Overzicht</h1>

<div class="containerText">
    <div class="profiel"><p>{voornaam} {achternaam}</p></div>
    <div class="profiel"><p>{leeftijd} jaar</p></div>
    <div class="profiel"><p><i class="fa-solid fa-phone"></i> {telefoon}</p></div>
    <div class="profiel"><p><i class="fa-solid fa-at"></i> {email}</p></div>
    <div class="containerAfbeelding">
        <img class="iconSamenvatting" src="{profielAfbeelding}" alt="profiel">
    </div>
</div>

<div class="containerButton">
    <button class="terug" on:click={ () => { page--; progression = progression - 22;}}><i class="fa-solid fa-angle-left"></i></button><Button {text} on:click={closeModal}/>
    <div id="Progression">
        <progress id="Progression-Bar" class="prog" max="100" value="{progression}"></progress>
    </div>
</div>
{/if}

<style>

p, h1{
     color: rgb(255, 255, 255);
 }

.welkom {
     padding-top: 40px;
     font-family: 'Dancing Script', cursive;
     font-weight: 700;
 }

.naam {
     font-weight: 700;
 }

 button{
     color: white;
     height: 50px;
     width: 130px;
     background-color: #001528;
     cursor: pointer;
     font-weight: 700;
     font-size: 14px;
     letter-spacing: 1px;
     border:none;
     margin-right: 10px;
 }

 .terug {
    border-radius: 15px 0 0 0;
 }

 button:hover {
    background: #ffffff;
    color: #04a7f4;
}
/* Samenvatting styling */
.containerText {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0 80px;
    background-color: #001528;
    border-radius: 10px 0 10px 0;
    width: 600px;
    margin: 70px auto 30px;
    padding: 10px 0 10px 0;
}

.containerAfbeelding {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    top: -150px;
}

.iconSamenvatting {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    margin: 100px auto;
    border: 2px solid #b60f55;
}

/* Pictogram kiezen */
input {
    background-color: #001528;
    border: 1px solid #444;
    color: #fff;
    padding: 10px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 10px;
}

input:focus {
    border: 2px solid #b60f55;
    outline: none;
}

.iconImg {
        position: absolute;
        top: 5px;
        left: 0;
    }

.iconImg,
.iconImg img {
    width: 75px;
    height: 75px;
    border-radius: 100%;
}

.containerIcon {
    width: 70%;
    position: relative;
    display: grid;
    justify-items: center;
    justify-content: center;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 20px auto;
}

@media (max-width: 900px) {
    .containerIcon {
        grid-template-columns: 1fr 1fr;
    }
    button {
        width: 40%;
    }
    .containerText {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 0 80px;
    background-color: #001528;
    border-radius: 10px 0 10px 0;
    width: 90%;
    margin: 70px auto 30px;
    padding: 60px 0 10px 0;
}
}

@media (max-width: 600px) {
    .containerIcon {
        grid-template-columns: 1fr;
    }
}
.containerIcon input[type=radio]{
    position: absolute;
    opacity: 0;
    margin: 0 auto;
}

input[type="radio"]:checked ~ label {
        background-color: #b60f55;
        transform: scale(1.05);
    }

.containerRadio {
    position: relative;
    display: flex;
    width: 100%;
    height: 85px;
}

.containerRadio label {
    height: 20px;
    width: 20px;
    border-radius: 10px 0 10px 0;
    background-color: #2d2d2d;
    cursor: pointer;
    padding: 10px;
    margin-left: 100px;
    margin-top: 25px;
}

.containerIcon label:hover {
    background-color: #b60f55;
}

.containerButton {
    padding-bottom: 20px;
}

:-webkit-autofill { 
    filter:none; /* needed for firefox! */
    box-shadow: 0 0 0 100px #222 inset;
    -webkit-text-fill-color: #fff;
}

/* Progression Bar */
#Progression {
   height: 21px;
   width: 82%;
   max-width: 340px;
   margin: 10px auto;
   border-radius: 0 0 10px 0;
   bottom: -100px;
}

.prog {
  width: 100%;
  height: 100%;
  border-radius: 0 0 10px 0;
}

progress::-webkit-progress-bar {
  border-radius: 0 0 10px 0;
  background-color: #001528;
}

#Progression progress[value]::-webkit-progress-value {
  background-image:
	  	   -webkit-linear-gradient(45deg, rgba(138,179,134,1) 0%, rgba(49,149,12,1) 100%);
  border-radius: 0 0 10px 0;
  transition: 1s easy-in-out;
} 

h1 {
    padding: 0 20px;
}

/* ALERTS */
.alert {
    width: 300px;
    margin: 0 auto;
    text-align: center;
    font-family: 'Dancing Script', cursive;
    font-weight: 700;
    color: white;
    border-bottom: 2px solid red;
    margin-bottom: 10px;
}

</style>