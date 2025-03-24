<script>
    import { onMount } from "svelte";
    import { ModeWatcher, mode } from "mode-watcher";

    export let img1 = ""; // Default image
    export let img2 = ""; // Hover image

    let isDarkMode;
    $: isDarkMode = $mode === "dark";
</script>

<ModeWatcher />

<div class="card" class:dark-mode={isDarkMode}>
    {#if img1 && img2}
        <div class="image-container">
            <img class="card-img first" src={img1} alt="Project Image" />
            <img class="card-img second" src={img2} alt="Project Image Hover" />
        </div>
    {/if}
    <slot />
</div>

<style>
    .card {
        display: flex;
        flex-direction: column;
        align-items: center; /* Center content */
        justify-content: center;
        border: 1px solid #d0d0cf;
        width: 90%;
        background-color: #ffffff;
        color: #171717;
        margin: 10px auto;
        border-radius: 8px;
        padding: 15px;
        transition: border-color 0.3s;
    }

    .card:hover {
        border-color: #8a9999;
    }

    .dark-mode {
        background-color: #08080b;
        color: #edeceb;
        border-color: #27262b;
    }

    /* Image hover effect */
    .image-container {
        position: relative;
        width: 100%;
        max-width: 400px; /* Set a max width */
        height: auto;
        display: flex;
        justify-content: center;
    }

    .card-img {
        width: 100%;
        height: auto;
        transition: opacity 0.3s ease-in-out;
        position: absolute;
    }

    .card-img.first {
        position: relative; /* Make first image visible by default */
    }

    .card-img.second {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
    }

    .card:hover .card-img.first {
        opacity: 0;
    }

    .card:hover .card-img.second {
        opacity: 1;
    }
</style>
