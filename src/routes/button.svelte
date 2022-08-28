<script>
    export let text = "Base";

</script>

    <button on:click>{text}</button>

<style>
 button{
     color: white;
     height: 50px;
     width: 200px;
     background-color: #001528;
     cursor: pointer;
     font-weight: 700;
     font-size: 14px;
     letter-spacing: 1px;
     border:none;
 }

 button:hover {
    background: #ffffff;
    color: #04a7f4;
}

@media (max-width: 900px) {
    button {
        width: 40%;
    }
}
</style>