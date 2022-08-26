import { writable } from 'svelte/store';

const TaskStore = writable([{
    module: "A",
    task: "Schiet een vijandig schip kapot.",
    completed: 	"&#9744;",
    id: "006",
},
{
    module: "B",
    task: "Geef een review van mijn portfolio!",
    completed: 	"&#9744;",
    id: "004",
},
{
    module: "C",
    task: "Draai een informatie kaart om.",
    completed: 	"&#9744;",
    id: "005",
},
{
    module: "D",
    task: "Maak drie to do's aan",
    completed: "&#9744;",
    id: "001",
},
{
    module: "D",
    task: "Reken met een uitkomst boven het miljoen",
    completed: "&#9744;",
    id: "002",
},
{
    module: "D",
    task: "Klik op de klok 15 seconden over het uur",
    completed: 	"&#9744;",
    id: "003",
},
]);

export default TaskStore;