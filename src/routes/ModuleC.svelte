<script>
    import UserStore from "./stores/UserStore";

    // Skill values //
    let html = 0;
    let css = 0;
    let js = 0;
    let svelte = 0;
    let github = 0;
    let php = 0;

    const addXP = (xp) => {
        UserStore.update(users => {
                let copyUsers = [...users];
                let changeUser = copyUsers.find((user) => user.current == true);
                changeUser.xp = changeUser.xp + xp;
               
                return copyUsers;

            })
    }

    const setValues = () => {
         html = 90;
         css = 80;
         js = 60;
         svelte = 70;
         github = 50;
         php = 20;
         addXP(400);
    };

</script>

<div class="containerModuleC">
    <div class="containerlinks">
        <div class="introtext bct">
                <h1>About me:</h1>
                <p>Beste toekomstig werkgever,<br />
                Mijn naam is Teun van Lith en ik ben een startende webdeveloper. <br />
                <br />
                Als je mijn achtergrond weet zou je misschien de stap naar webdeveloper bijzonder vinden. Op dit moment ben ik namelijk ook eigenaar van twee prachtige ondernemingen, Wilgen Training & Uitjesboerderij Leekzicht.
                Respectievelijk een sportschool en recreatieboerderij. <br />
                <br />
                Al op jonge leeftijd ben ik altijd een ondernemend type geweest. <br />
                Wat eerst is begonnen met timmeren werd later, computeren en het bouwen van 3D werelden om in te spelen. De uitdaging om iets nieuws en creatiefs te bouwen is daarin altijd sterk aanwezig geweest. <br />
                <br />
                Wanneer ik startte met Wilgen Training had ik een website nodig. Hier is de passie voor webdevelopment gestart. 
                Gaande weg leerde ik een website bouwen via verschillende youtube filmpjes en cursussen op Udemy.
                Mijn eerste website werd gebouwd met behulp van wordpress. 
                Prima en goed, maar ergens bleef de drang om het van scratch te doen bestaan. 
                Met eerste HTML en vervolgens CSS kon ik beginnen met de eerste stappen, het aanpassen van de wordpress via de costum css inputs. <br />
                <br />
                Na jaren wat minder te leren, kwam ik uiteindelijk weer via het werk in aanraking met het bouwen van een website.
                Het nieuwe project moest een logboek worden voor de sporters van Wilgen Training, waarin ze hun voortgang zouden kunnen noteren.
                Hiervoor kwam ik in aanraking met Javascript, om vervolgens al snel met Svelte & SvelteKit als framework te gaan werken. <br />
                <br />
                Na veel oefen projecten ben ik nu toe aan een serieuze stap in de wereld van het webdevelopment. Een baan en opdrachten voor verschillende klanten bouwen.
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
            <h2>HTML</h2>
            <progress id="xpbar" class="xpbar" max="100" value="{html}"></progress>
            <h2>CSS</h2>
            <progress id="xpbar" class="xpbar" max="100" value="{css}"></progress>
            <h2>JAVASCRIPT </h2>
            <progress id="xpbar" class="xpbar" max="100" value="{js}"></progress>
            <h2>SVELTE</h2>
            <progress id="xpbar" class="xpbar" max="100" value="{svelte}"></progress>
            <h2>GITHUB</h2>
            <progress id="xpbar" class="xpbar" max="100" value="{github}"></progress>
            <h2>myPHP</h2>
            <progress id="xpbar" class="xpbar" max="100" value="{php}"></progress>
            <br />
            <button on:click={setValues}>Bekijk skills:</button>
        </div>
    </div>
</div>
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
        margin: 0 auto;
        margin-bottom: 50px;
    }

    .bct {
        background-color: #001528;
        border: 1px solid #b60f55;
        color: #fff;
        padding: 20px;
        font-weight: 600;
        text-align: center;
        border-radius: 15px 0 15px 0;
    }

    progress[value] {
        -webkit-appearance: none;
        appearance: none;
        width: 150px;
        height: 10px;
        transition: 3s easy-in-out;
}

    progress::-webkit-progress-bar {
        background: rgb(191, 191, 191);
        border-radius: 5px;
        border: 1px solid #222;
}

    progress[value]::-webkit-progress-value {
        background-image: -webkit-linear-gradient(45deg, rgb(153, 4, 89) 0%, rgb(135, 46, 91) 100%);
        border-radius: 5px; 
        transition: 2s easy-in-out;
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
        margin-top: 20px;
        border: 1px solid #b60f55;
    }

    button:hover {
        background: #353535;
        color: #b60f55;
    }

    h1 {
        color: #b60f55;
    }

    h2 {
        margin-top: 5px;
    }

</style>