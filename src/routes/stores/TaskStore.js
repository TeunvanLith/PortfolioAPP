import { writable } from 'svelte/store';

const TaskStore = writable([{
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
}
]);

export default TaskStore;