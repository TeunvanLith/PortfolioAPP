import { writable } from 'svelte/store';

const TiptopStore = writable([{
    Tip: "Meer spelletjes met schieten",
    Top: "Veel interactieve elementen."
}]);

export default TiptopStore;