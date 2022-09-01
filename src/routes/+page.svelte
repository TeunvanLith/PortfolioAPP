<script>
	import { onMount } from "svelte";
    import './global.css'
    import ModalA from "./ModalA.svelte"
    import Start from "./Start.svelte"
    import Stats from "./stats.svelte"
    import Modules from "./Modules.svelte"
	import ModuleA from "./ModuleA.svelte"
	import ModuleB from "./ModuleB.svelte"
	import ModuleC from "./ModuleC.svelte"
	import ModuleD from "./ModuleD.svelte"
	import Back from "./back.svelte"
	import Tasks from "./tasks.svelte"
	import Snake from "./Snake.svelte"

    let account = false
	let start = true
	let stats = false
	let modules = false
	let moduleA = false
	let moduleB = false
	let moduleC = false
	let moduleD = false
	let clock = false
	let back = false
	let task = false
	let tasks;
	let snake = false;

	const toggleBack = () => {
		if (moduleD || moduleC || moduleB || moduleA ) {
			moduleA = false;
			moduleB = false;
			moduleC = false;
			moduleD = false;
			modules = true;
		}
	}

	let theme = "orange";

	let currentID;

</script>

<main>
    {#if start}
	<Start on:openAccount={ () => {start = false; account = true;}} on:openModules={ () => {start = false; modules = true;}}/>
	{/if}

    {#if account}
	<ModalA on:closeStart={ () => {start = true; account = false}} on:closeModal={ (e) => {account = false; modules = true; currentID = e.detail.ID; console.log(currentID)}}/>
	{/if}

    {#if modules || moduleA || moduleB || moduleC || moduleD}
	<Stats ID={currentID} on:account={ () => {modules = false, account = true}} />
	{/if}

	{#if modules}
	<Modules 
	on:showModuleA={ () => {moduleA = true; modules = false; theme="#04a7f4"}} 
	on:showModuleB={ () => {moduleB = true; modules = false; theme="orange"}}
	on:showModuleC={ () => {moduleC = true; modules = false; theme="#b60f55"}} 
	on:showModuleD={ () => {moduleD = true; modules = false; theme="#11753c"}}/>
	{/if}

    {#if moduleA}
	<ModuleA ID={currentID}/>
	{/if}

	{#if moduleB}
	<ModuleB ID={currentID}/>
	{/if}

	{#if moduleC}
	<ModuleC theme={theme} ID={currentID}/>
	{/if}

	{#if moduleD}
	<ModuleD ID={currentID} />
	{/if}

	{#if moduleA || moduleB || moduleC || moduleD}
	<Back on:toggleBack={toggleBack} theme={theme}/>
	{/if}

	{#if moduleB || moduleD || moduleA }
	<Tasks theme={theme} a={moduleA} b={moduleB} c={moduleC} d={moduleD}/>
	{/if} 
</main>

<style>

	main {
		text-align: center;
		padding: 0;
		margin: 0;
		width: 100vw;
		height: 100vh;
		
	}

</style>