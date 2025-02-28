<script>
    import Title from '$lib/title.svelte'
</script>
<header>
    <Title title="Retro Gaming"/>
</header>
<main>
    <slot>

    </slot>
</main>
<footer>
    <p>Copyright 2023 Ansh Wadhwa</p>
</footer>
<style>
    header{
        display: flex;
        justify-content: center;
    }
    main{
        
        margin: 20px,auto;
    }
    p{
        color: white;
    }
</style>