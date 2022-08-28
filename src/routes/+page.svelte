<script type="typescript">
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

    let account:boolean = false
	let start:boolean = true
	let stats:boolean = false
	let modules:boolean = false
	let moduleA:boolean = false
	let moduleB:boolean = false
	let moduleC:boolean = false
	let moduleD:boolean = false
	let clock:boolean = false
	let back:boolean = false
	let task:boolean = false
	let tasks:boolean;
	let snake:boolean = false;

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

	

</script>

<main>
    {#if start}
	<Start on:openAccount={ () => {start = false; account = true;}} on:openModules={ () => {start = false; modules = true;}}/>
	{/if}

    {#if account}
	<ModalA on:closeStart={ () => {start = true; account = false}} on:closeModal={ () => {account = false; modules = true;}}/>
	{/if}

    {#if modules || moduleA || moduleB || moduleC || moduleD}
	<Stats />
	{/if}

	{#if modules}
	<Modules 
	on:showModuleA={ () => {moduleA = true; modules = false; theme="#04a7f4"}} 
	on:showModuleB={ () => {moduleB = true; modules = false; theme="orange"}}
	on:showModuleC={ () => {moduleC = true; modules = false; theme="#b60f55"}} 
	on:showModuleD={ () => {moduleD = true; modules = false; theme="#11753c"}}/>
	{/if}

    {#if moduleA}
	<ModuleA theme={theme}/>
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