<script>
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
            setTimeout(() => {modules = true;},400)
		}
	}

	let theme = "orange";

	let ID = 0;
	let xp;


</script>

<main>
    {#if start}
	<Start on:openAccount={ () => {start = false; account = true;}} on:openModules={ () => {start = false; modules = true;}}/>
	{/if}

    {#if account}
	<ModalA on:closeStart={ () => {start = true; account = false}} on:closeModal={ (e) => {account = false; modules = true; ID = e.detail.ID;}}/>
	{/if}

    {#if modules || moduleA || moduleB || moduleC || moduleD}
	<Stats ID={ID} on:account={ () => {modules = false, moduleA = false, moduleB = false, moduleC = false, moduleD = false, account = true}} />
	{/if}

	{#if modules}
	<Modules 
	on:showModuleA={ () => {moduleA = true; modules = false; theme="#04a7f4"}} 
	on:showModuleB={ () => {moduleB = true; modules = false; theme="orange"}}
	on:showModuleC={ () => {moduleC = true; modules = false; theme="#b60f55"}} 
	on:showModuleD={ () => {moduleD = true; modules = false; theme="#11753c"}}/>
	{/if}

    {#if moduleA}
	<ModuleA ID={ID}/>
	{/if}

	{#if moduleB}
	<ModuleB ID={ID}/>
	{/if}

	{#if moduleC}
	<ModuleC {theme} ID={ID}/>
	{/if}

	{#if moduleD}
	<ModuleD ID={ID} />
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