<script>
    import { onMount } from "svelte";
    import { ModeWatcher, setMode, mode } from "mode-watcher";
    let linkbr;
    let open = false;
    let color;

    function toggletheme() {
        if ($mode === "light") {
            setMode("dark");
            console.log($mode);
            color = "#cfd0d4";
            document.querySelector("body").style =
                "background-color:black; color:#cfd0d4;";
            // document.documentElement.style.setProperty('--border-color', 'rgb(32, 31, 31)');
        } else {
            setMode("light");
            console.log($mode);
            document.querySelector("body").style =
                "background-color:#fafafa; color:#171717;";
            // color = "gray";
            // document.documentElement.style.setProperty('--border-color', '#edeceb');
        }
    }

    function openmenu() {
        if (open == false) {
            open = true;
            linkbr.style.display = "flex";
        } else if (open == true) {
            open = false;
            linkbr.style.display = "none";
        }
    }

    onMount(() => {
        if ($mode === "light") {
            console.log($mode);
            document.querySelector("body").style =
                "background-color:#fafafa; color:#171717;";
            color = "gray";
            document.documentElement.style.setProperty(
                "--border-color",
                "#edeceb",
            );
        } else {
            color = "#cfd0d4";
            console.log($mode);
            document.querySelector("body").style =
                "background-color:black; color:#fbfbfa;";
            document.documentElement.style.setProperty(
                "--border-color",
                "rgb(32, 31, 31)",
            );
        }
        linkbr = document.getElementById("lnm");
    });
</script>

<ModeWatcher />
<slot />
<div class="phonemenu">
    <button on:click={openmenu}> Menu </button>
</div>
<div class="main" id="lnm">
    <div class="menu">
        <button on:click={toggletheme}> Dark Mode </button>
    </div>
    <div id="linkbr" class="links">
        <!-- <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/projects">Projects</a> -->
    </div>
    <div class="right">
        <button on:click={window.open(`/`, "_self")}>‎ /‎ </button>
        <!-- <button on:click={window.open(`/projects`, "_self")}> Projects </button> -->

        <button on:click={window.open(`/photography`, "_self")}>
            Photography
        </button>
    </div>
    <!-- ======================================= -->
</div>

<style>
    .heading {
        margin-left: auto;
        margin-right: auto;
    }
    .right {
        text-align: right;
        width: 90%;
        padding: 15px;
        color: grey;
    }
    .menu {
        width: 90%;
        padding: 15px;
    }
    .main {
        display: flex;
        justify-content: center;
        width: 100%;
    }
    .phonemenu {
        display: none;
    }
    .imgp {
        display: none;
        margin-left: 10px;
        margin-top: auto;
        margin-bottom: auto;
    }

    .links {
        display: block;
        text-align: center;
        margin-top: 10px;
        width: 500px;
        text-decoration: none;
        margin-bottom: 20px;
        font-size: 20px;
    }
    button {
        background-color: transparent;
        border: 0;
        font-size: 15px;
        text-decoration: underline;
        font-family: Recoleta;
        font-weight: 1000;
    }
    button:hover {
        cursor: pointer;
    }
    @media screen and (max-width: 500px) {
        .main {
            justify-content: space-between;
            display: none;
        }
        .phonemenu {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px;
            width: 100%;
        }
        .right {
            display: block;
        }
    }
</style>
