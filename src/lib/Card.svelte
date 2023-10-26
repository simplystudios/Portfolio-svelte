<script>

</script>

<div class="card">
    <slot/>
</div>

<style>
    .card{
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-style: dashed;
        border: 1;
        width: 90%;
        background-color: rgb(120, 134, 161);
        border-color: rgb(255, 255, 255);
        box-shadow: 10px, black;
        color: #ffffff;
        margin: 0px auto;
        border-radius: 8px;
        padding: 15px;
    }
</style>