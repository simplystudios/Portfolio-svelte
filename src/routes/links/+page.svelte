<script>
    import Title from "../../lib/title.svelte";
    const linklist = [
        { name: "Instagram", url: "https://instagram.com/anshwadhwa8" },
        { name: "X (Twitter)", url: "https://x.com/anshwadhwa8" },
        { name: "Github", url: "https://github.com/simplystudios" },
        { name: "Peerlist", url: "https://peerlist.io/anshwadhwa" },
    ];
</script>

<Title />
<div class="links">
    <h1>Links</h1>
    <ul>
        {#each linklist as { name, url }}
            <li><a href={url}>{name}</a></li>
            <br />
        {/each}
    </ul>
</div>

<div class="footer">
    <p>Ansh Wadhwa @ 2025</p>
</div>

<style>
    .links {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        height: 70vh;
    }
    .footer {
        text-align: center;
    }
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
