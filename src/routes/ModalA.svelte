<script>
    import Account from "./Acccount.svelte";
	import { fade } from 'svelte/transition';
</script>

<div class="backdrop">

<div transition:fade class="modal">
    <Account on:closeModal on:closeStart/>
</div>



</div>

<style>
.backdrop {
    position: absolute;
    background-color: rgba(26, 26, 26, 0.5);
    width: 100%;
    height: 100%;
}

.modal {
    width: 80%;
    max-width: 800px;
    min-height: 350px;
    border-radius: 30px 0 30px 0;
    margin: 10% auto;
    background: linear-gradient(90deg, rgba(38,38,115,1) 0%, rgba(0,212,255,1) 100%);
    position: relative;
}
</style> 