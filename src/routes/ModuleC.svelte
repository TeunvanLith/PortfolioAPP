<script>
    import UserStore from "./stores/UserStore"
    import Prog75 from "./progression75.svelte"
    import Prog60 from "./progression60.svelte"
    import Prog30 from "./progression30.svelte"
    import { fade } from 'svelte/transition';
    export let theme
    export let ID
    let updated = 1;
    import { onMount } from "svelte"


    const addXP = (xp) => {
        UserStore.update(users => {
                let copyUsers = [...users];
                let changeUser = copyUsers.find((user) => user.user_ID == ID);
                if (changeUser.task005 ==  false) {
                changeUser.xp = changeUser.xp + xp;
                changeUser.task005 = true;
                }
                return copyUsers;
            })
    }

    let visible = false;
    let a = false;
    let b = false;
    let c = false;

    onMount (() => {
        setTimeout(() => {visible = true},200)
        setTimeout(() => {a = true},500)
        setTimeout(() => {b = true},1000)
        setTimeout(() => {c = true},1500)
        setTimeout(() => {addXP(200)},2000)
    })
</script>
{#if visible}
<div out:fade="{{ duration: 200 }}" class="containerModuleC">
    <div class="containerlinks">
        <div class="introtext bct">
                <h2>Beste toekomstig werkgever,</h2>
                <p>
                Mijn naam is Teun van Lith en ik ben een startende webdeveloper. <br />
                <br />
                Als je mijn achtergrond weet zou je misschien de stap naar webdeveloper bijzonder vinden. Op dit moment ben ik namelijk ook eigenaar van twee prachtige ondernemingen, Wilgen Training & Uitjesboerderij Leekzicht.
                Respectievelijk een sportschool en recreatieboerderij. <br />
                <br />
                Al op jonge leeftijd ben ik altijd een ondernemend type geweest. <br />
                Wat eerst is begonnen met timmeren werd later computeren en het bouwen van 3D werelden om in te spelen. De uitdaging om iets nieuws en creatiefs te bouwen is daarin altijd sterk aanwezig geweest. <br />
                <br />
                Wanneer ik startte met Wilgen Training had ik een website nodig. Hier is de passie voor webdevelopment gestart. 
                Gaande weg leerde ik een website bouwen via verschillende youtube filmpjes en cursussen.
                Mijn eerste website werd gebouwd met behulp van wordpress. 
                Prima en goed, maar ergens bleef de drang om het helemaal zelf te doen. 
                Met eerste HTML en vervolgens CSS kon ik beginnen met de eerste stappen, het aanpassen van de wordpress via de costum css inputs. <br />
                <br />
                Na jaren af en toe wat kleine projecten, kwam ik uiteindelijk via mijn werk in aanraking met het bouwen van een tool voor een website.
                Het nieuwe project moest een logboek worden voor de sporters van Wilgen Training, waarin ze hun voortgang zouden kunnen noteren.
                Hiervoor kwam ik in aanraking met Javascript, om vervolgens al snel met Svelte & SvelteKit als framework te gaan werken. <br />
                <br />
                Na veel kleine projecten ben ik nu toe aan een serieuze stap in de wereld van het webdevelopment. De beste manier om iets te laten groeien is een zaadje planten.
                Ik zou daaorm graag bij een bedrijf een zaadje planten en groeien in dit vakgebied.<br />
                <br />
                Met vriendelijke groet, <br />
                Teun van Lith
                </p>
            </div>
        </div>
    <div class="containerrechts">
        <div class="persoonsgegevens bct">
            <p>
            <i class="fa-solid fa-person"></i> &nbsp;&nbsp;&nbsp; Teun van Lith<br />
            <i class="fa-solid fa-location-pin"></i> &nbsp;&nbsp;&nbsp; Boterweg 32<br />
            &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5469NN Erp <br />
            <br />
            <i class="fa-solid fa-at"></i> &nbsp;&nbsp;&nbsp;teun_van_lith@hotmail.com<br />
            <i class="fa-solid fa-phone"></i> &nbsp;&nbsp;&nbsp;0622959034
            </p>
            <div class="foto"><img src="https://i.ibb.co/HhmpcYx/Whats-App-Image-2022-08-21-at-3-16-18-PM.jpg" alt="Foto Teun van Lith"/></div>
        </div>
        <div class="skills bct" >
            {#if a}
            <Prog75 theme={theme} text="HTML"/>
            <Prog75 theme={theme} text="CSS"/>
            {/if}
            {#if b}
            <Prog60 theme={theme} text="Javascript"/>
            <Prog60 theme={theme} text="Svelte"/>
            {/if}
            {#if c}
            <Prog60 theme={theme} text="Github"/>
            <Prog30 theme={theme} text="myPHP"/>
            {/if}
        </div>
    </div>
</div>
{/if}
<style>
    img {
        position: absolute;
        top: -60px;
        right: 20px;
        width: 150px;
        height: 150px;
        border-radius: 75px;
        object-fit: cover;
        border: 2px solid #b60f55;
        transition: 1s ease-in-out;
        transform-origin: 0% 100%;
    }

    img:hover {
        transform: scale(1.5);

    }

    .containerModuleC {
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .containerrechts {
        width: 400px;
    }

    .containerlinks {
        width: 700px;
        margin-bottom: 100px;
    }

    .introtext {
        margin: 0 auto;
    }

    .persoonsgegevens {
        text-align: left !important; 
        width: 300px;
        margin: 0 auto;
        margin-bottom: 50px;
        position: relative;
    }

    .skills {
        width: 300px;
        min-height: 400px;
        margin: 0 auto;
        margin-bottom: 50px;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .bct {
        background-color: #001528;
        border: 1px solid #b60f55;
        color: #fff;
        padding: 10px;
        font-weight: 600;
        text-align: center;
        border-radius: 15px 0 15px 0;
    }

    h1 {
        color: #b60f55;
    }
</style>