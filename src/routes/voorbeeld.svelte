<script>
	import ModalA from "./ModalA.svelte"
	import Start from "./Start.svelte"
	import Stats from "../public/stats.svelte"
	import Modules from "./Modules.svelte"
	import ModuleA from "./ModuleA.svelte"
	import ModuleB from "./ModuleB.svelte"
	import ModuleC from "./ModuleC.svelte"
	import ModuleD from "./ModuleD.svelte"
	import Back from "../public/back.svelte"
	import Tasks from "../public/tasks.svelte"

	import  {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

	let account = false
	let start = false
	let stats = true
	let modules = false
	let moduleA = false
	let moduleB = false
	let moduleC = true
	let moduleD = false
	let clock = false
	let back = false
	let task = false

	const toggleAccount = () => {
		start = false
		account = true
	}

	const closeCreate = (e) => {
		account = false
		stats = true
		modules = true;
	}

	const toggleBack = () => {
		if (moduleD || moduleC || moduleB || moduleA ) {
			moduleA = false;
			moduleB = false;
			moduleC = false;
			moduleD = false;
			modules = true;
		}
	}

</script>

<main>
	{#if start}
	<Start on:openAccount={toggleAccount}/>
	{/if}

	{#if account}
	<ModalA  on:closeModal={closeCreate}/>
	{/if}

	{#if stats}
	<Stats />
	{/if}

	{#if modules}
	<Modules 
	on:showModuleA={ () => {moduleA = true; modules = false;}} 
	on:showModuleB={ () => {moduleB = true; modules = false;}}
	on:showModuleC={ () => {moduleC = true; modules = false;}} 
	on:showModuleD={ () => {moduleD = true; modules = false;}}/>
	{/if}

	{#if moduleA}
	<ModuleA />
	{/if}

	{#if moduleB}
	<ModuleB />
	{/if}

	{#if moduleC}
	<ModuleC />
	{/if}

	{#if moduleD}
	<ModuleD />
	{/if}

	{#if moduleA || moduleB || moduleC || moduleD}
	<Back on:toggleBack={toggleBack}/>
	{/if}

	{#if task && moduleD}
	<Tasks />
	{/if}

</main>

<style>
	main {
		text-align: center;
		padding: 0;
		margin: 0;
		width: 100vw;
		height: 100vh;
		background-image: url("https://i.ibb.co/jH1dkrD/5039684.jpg");
		object-fit: contain;
		position: relative;
		background-repeat: repeat-y;
	}

</style>