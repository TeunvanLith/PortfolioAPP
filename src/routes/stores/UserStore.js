import { writable } from 'svelte/store';

const UserStore = writable([{
    voornaam: "Inge",
    achternaam: "van Nunen",
    leeftijd: 30,
    email: "teun_van_lith@hotmail.com",
    telefoon: "0622959345",
    profielAfbeelding: "https://i.ibb.co/y8y1mNb/Avatar-Female-02.jpg",
    xp: 0,
    user_ID: Math.floor(Math.random() * 10000)
}]);

export default UserStore;