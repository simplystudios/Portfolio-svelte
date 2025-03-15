<script>
    import { onMount } from "svelte";
    import { ModeWatcher, mode } from "mode-watcher";

    let isDarkMode;

    $: isDarkMode = $mode === "dark";
</script>

<ModeWatcher />
<div class="card" class:dark-mode={isDarkMode}>
    <slot />
</div>

<style>
    .card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        border: 1px solid #d0d0cf;
        width: 90%;
        background-color: #ffffff;
        color: #171717;
        margin: 0px auto;
        border-radius: 8px;
        padding: 15px;
    }

    .dark-mode {
        background-color: #08080b;
        color: #edeceb;
        border-color: #27262b;
    }
</style>
