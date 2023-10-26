<script>
    export let disabled = false;
</script>

<button {disabled} class="but">
    <slot/>
</button>

<style>
    .but{
        width: 100%;
        background-color: rgb(222, 207, 41);
        padding: 12px;
        color: black;
        border-radius: 8px;
        font-size: 16px;
    }
</style>