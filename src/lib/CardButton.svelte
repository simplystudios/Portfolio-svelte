<script>
    export let disabled = false;
    export let link;
    import { ModeWatcher, mode } from "mode-watcher";

let isDarkMode;

$: isDarkMode = $mode === 'dark';
</script>

<button {disabled} onclick={link} class:dark-mode={isDarkMode} class="but">
    <slot/>
</button>

<style>
    .but{
        width: 100%;
        background-color: #000000;
        padding: 12px;
        color: white;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
    }
    .dark-mode {
        background-color: #171717;
        color: #edeceb;
        border-color: rgb(42, 42, 42);
    }
</style>