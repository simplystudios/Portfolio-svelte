<script>
    import Title from "$lib/title.svelte";
    import Navbar from "$lib/Navbar.svelte";
</script>

<header></header>
<main>
    <slot></slot>
    <Navbar />
</main>

<style>
    header {
        display: flex;
        justify-content: center;
    }
    main {
        margin: 20px, auto;
    }
    p {
        color: white;
    }
</style>
