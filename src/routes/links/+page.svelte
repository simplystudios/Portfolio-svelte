<script>
    import Title from "../../lib/title.svelte";
    import { onMount } from "svelte";
    import { ModeWatcher, setMode, mode } from "mode-watcher";
    import {
        Star,
        GitFork,
        Facebook,
        Instagram,
        Twitter,
        Linkedin,
        Github,
        Youtube,
    } from "lucide-svelte";
    const linklist = [
        { name: "Instagram", url: "https://instagram.com/anshwadhwa8" },
        { name: "X (Twitter)", url: "https://x.com/anshwadhwa8" },
        { name: "Github", url: "https://github.com/simplystudios" },
        { name: "Peerlist", url: "https://peerlist.io/anshwadhwa" },
    ];
    let color;
    let isDarkMode;

    onMount(async () => {
        if ($isDarkMode === true) {
            color = "#171717";
            console.log("whaa");
        } else {
            color = "#cfd0d4";
            console.log("naahhhh");
        }
    });
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

<footer>
    <div class="center">
        <p>Ansh Wadhwa @ 2025</p>
    </div>
    <div class="centerp">
        <div style="margin:10px">
            <a href="https://github.com/simplystudios" target="_blank">
                <Github size="24" {color} />
            </a>
        </div>

        <div style="margin:10px">
            <a href="https://twitter.com/anshwadhwa8" target="_blank">
                <Twitter size="24" {color} />
            </a>
        </div>
        <div style="margin:10px">
            <a href="https://www.instagram.com/anshwadhwa8/" target="_blank">
                <Instagram size="24" {color} />
            </a>
        </div>
    </div>
</footer>

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
    .centerp {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        text-align: center;
    }
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
