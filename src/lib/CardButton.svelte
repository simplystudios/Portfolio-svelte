<script>
    export let disabled = false;
    export let link;
</script>

<button {disabled} onclick={link} class="but">
    <slot/>
</button>

<style>
    .but{
        width: 100%;
        background-color: rgb(224, 208, 35);
        padding: 12px;
        color: black;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
    }
</style>