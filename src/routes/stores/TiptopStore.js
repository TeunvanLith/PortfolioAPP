import { writable } from 'svelte/store';

const TiptopStore = writable([{
    Tip: "Meer spelletjes",
    Top: "Veel interactieve elementen."
}]);

export default TiptopStore;