<script>
    import Title from "$lib/title.svelte";
    import Card from "$lib/Card.svelte";
    import CardTitle from "$lib/CardTitle.svelte";
    import CardImg from "$lib/CardImg.svelte";
    import CardDesc from "$lib/CardTitle.svelte";
    import CardButton from "$lib/CardButton.svelte";
    import { onMount } from "svelte";
    import {
        Star,
        GitFork,
        Facebook,
        Instagram,
        Twitter,
        MapPin,
        Linkedin,
        Github,
        Youtube,
    } from "lucide-svelte";
    export let disabled = "false";
    import { browser } from "$app/environment"; // Import this for SSR checks
    let color;

    let data = [];
    onMount(async () => {
        const repos = await fetch(
            "https://api.github.com/users/simplystudios/repos",
        );
        data = await repos.json();
        data = data
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 10);
        console.log(data);
        color = "#cfd1d6";
    });

    function scrollIntoView(id) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }

    const intro = "'Compiling dreams into reality with lines of code' - 2023";
    let title = "/imgs/awbb.png";
    // async function getdata() {
    //     const url = 'https://api.lanyard.rest/v1/users/600278222428438559';

    //     try {
    //         const resp = await fetch(url);
    //         const res = await resp.json(); // Await the JSON parsing

    //         const d = res['data'];
    //         const statusb = d.discord_status;
    //         un.innerText = `@${d.discord_user.username}`;
    //         statust.innerText = d.discord_status;

    //         if(statusb == 'dnd'){
    //             ball.style.background = '#f33f43';
    //         }
    //         else if (statusb == 'online'){
    //             ball.style.background = '#22a558';
    //         }
    //         else if (statusb == 'idle'){
    //             ball.style.background = '#f0b132'
    //         }
    //         else{
    //             ball.style.background = 'grey'
    //         }
    //         // Update the DOM element with the value

    //     } catch (error) {
    //         console.error("An error occurred:", error);
    //     }
    // }
    // getdata();
</script>

<div class="mp">
    <div class="overlay">
        <title>Ansh Wadhwa</title>
        <Title />
        <div class="main">
            <div class="gridbd">
                <div class="mainp">
                    <!-- <img
                        style=""
                        id="pic"
                        class="img"
                        src="/imgs/mypfp.jpg"
                        alt=""
                        width="280px"
                        height="280px"
                    /> -->
                    <div class="title">
                        <br />
                        <br />
                        <div class="bd">
                            <div class="details">
                                <div class="statusdiv">
                                    <!-- <div id="ball" class="ball">
                                    </div> -->
                                    <h1 class="pin">Ansh Wadhwa</h1>
                                </div>
                                <div>
                                    <h2 class="un">
                                        Student who happens to be a Developer
                                    </h2>

                                    <div class="pin">
                                        <MapPin
                                            style="margin-right:5px"
                                            size={20}
                                            color="#bfbfbf"
                                        />
                                        Delhi, India
                                    </div>
                                    <br />
                                    <div class="pin">
                                        <a
                                            href="https://wakatime.com/@f983c5d0-c6d8-471e-a499-43763ad1d6b4"
                                            target="_blank"
                                            ><img
                                                src="https://wakatime.com/badge/user/f983c5d0-c6d8-471e-a499-43763ad1d6b4.svg?style=for-the-badge"
                                                alt="Total time coded since Sep 28 2021"
                                            /></a
                                        >
                                    </div>
                                    <!-- <div class="sdiv">
                                <a href="https://github.com/simplystudios" target="_blank" rel="noopener noreferrer"><img class="sicon" src="/github.png" alt="github" /></a>
                                <a href="https://twitter.com/anshwadhwa8" target="_blank" rel="noopener noreferrer"><img class="sicon" src="/x.png" alt="twtter/X.com" /></a>
                                <a href="https://instagram.com/anshwadhwa8" target="_blank" rel="noopener noreferrer"><img class="sicon" src="/instagram.png" alt="instagram.com" width="24px"></a>
                            </div>  -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <section class="about">
                    <h3 style="font-size: auto;">Developer, Dreamer, Student and a Music and Photography Enjoyer</h3>
                </section> -->
                    <br class="bbr" />

                    <!-- <div class="ppm">
                        <div class="bar1"></div>
                        <blockquote>{intro}</blockquote>
                    </div> -->

                    <!-- <br>
                <div on:click={() =>scrollIntoView("pro")} class="sb">
                    <p>Scroll Down</p>
                <i style="font-size: 25px;" class='bx bx-down-arrow-alt' ></i>
                </div> -->
                </div>
            </div>
        </div>
        <section id="pro" class="projects">
            <div>
                <!-- <div style="">
                    <h1 class="le">Featured Projects</h1>
                </div> -->
                <div class="col">
                    <!-- <div class="cardf">
                        <Card style="height: 100px;">
                            <img
                                class="card-img"
                                src="/imgs/hinduwikitwitterimg.jpg"
                                alt="HinduWiki Logo"
                            />
                        </Card>
                        <h3>HinduWiki</h3>
                    </div> -->

                    <Card img1="/imgs/gistpos.jpg" img2="/imgs/gistposterfr.jpg"
                    ></Card>

                    <Card
                        img1="/imgs/logopost.jpg"
                        img2="/imgs/notnotionbetter.jpg"
                    ></Card>

                    <Card
                        img1="/imgs/rhythmicposternoname.png"
                        img2="/imgs/rhythmic2poster.jpg"
                    ></Card>

                    <Card
                        img1="/imgs/Disredposter.jpg"
                        img2="/imgs/disredgraph.jpg"
                    ></Card>

                    <Card
                        img1="/imgs/covintracker.jpg"
                        img2="/imgs/rhythmic2poster.jpg"
                    ></Card>
                </div>
                <!-- <button
                    on:click={() => window.open("/projects")}
                    class="but"
                    class:dark-mode={isDarkMode}
                >
                    See All
                </button> -->
            </div>
        </section>

        <div class="gprojects">
            <h1>Github Projects</h1>
            <br />

            <div class="col">
                {#if data.length > 0}
                    {#each data as d}
                        {#if d.fork == true}{:else}
                            <div
                                on:click={() =>
                                    window.open(d.html_url, "_blank")}
                                class="protemp dark-mode"
                            >
                                <div
                                    style="font-size: 20px; font-weight: 600; padding-bottom: 5px;"
                                >
                                    {d.name}
                                </div>

                                <div style="margin: 2px; font-size: 15px;">
                                    {d.description}
                                </div>
                                <div class="hor">
                                    <Star
                                        size="20"
                                        {color}
                                        style="margin-top: 13px; margin-right: 5px;"
                                    />
                                    <h3>{d.stargazers_count}</h3>
                                    <GitFork
                                        size="20"
                                        {color}
                                        style="margin-top: 13px; margin-left: 5px; margin-right: 5px;"
                                    />
                                    <h3>{d.forks}</h3>
                                    <div
                                        style="margin-top: 13px;"
                                        class="horg horg-black"
                                    >
                                        <p>{d.language}</p>
                                    </div>
                                </div>
                            </div>
                        {/if}
                    {/each}
                {/if}
            </div>
        </div>
        <footer>
            <div class="center">
                <p>Ansh Wadhwa @ 2025</p>
            </div>
            <div class="centerp">
                <div style="margin:10px">
                    <button
                        style="background-color: transparent; border: none; cursor:pointer;"
                        on:click={() =>
                            window.open(
                                "https://github.com/simplystudios",
                                "_blank",
                            )}
                    >
                        <Github size="24" {color} />
                    </button>
                </div>

                <div style="margin:10px">
                    <button
                        style="background-color: transparent; border: none; cursor:pointer;"
                        on:click={() =>
                            window.open(
                                "https://twitter.com/anshwadhwa8",
                                "_blank",
                            )}
                    >
                        <Twitter size="24" {color} />
                    </button>
                </div>
                <div style="margin:10px">
                    <button
                        style="background-color: transparent; border: none; cursor:pointer;"
                        on:click={() =>
                            window.open(
                                "https://www.instagram.com/anshwadhwa8/",
                                "_blank",
                            )}
                    >
                        <Instagram size="24" {color} />
                    </button>
                </div>
            </div>
        </footer>
    </div>
</div>

<style>
    :root {
        --border-color: #edeceb;
        --grid-color: #414344;
        --mp-color: rgba(255, 255, 255, 0.533);
    }

    :global(html) {
        scroll-behavior: smooth;
    }
    .about {
        font-style: normal;
    }
    .cardf {
        position: relative;
        width: 150px; /* Adjust based on your needs */
        height: auto;
    }

    .card-img {
        width: 100%;
        height: auto;
        transition: opacity 0.3s ease-in-out;
        position: absolute;
        top: 0;
        left: 0;
    }

    .card-img.second {
        opacity: 0;
    }
    .pin {
        display: flex;
        color: #bfbfbf;
        width: 100%;
        margin-left: 15px;
        justify-content: left;
    }
    .cardf:hover .card-img.first {
        opacity: 0;
    }

    .cardf:hover .card-img.second {
        opacity: 1;
    }
    .bbr {
        margin-bottom: 40px;
    }
    .card-img {
        width: 100%;
        display: block;
        height: auto;
        object-fit: cover;
        border-radius: 5px;
    }
    .protemp {
        background-color: #ffffff;
        color: black;
        padding: 10px;
        border: 1px solid #d0d0cf;
        border-radius: 5px;
        border-style: groove;
        font-family: Recoleta;
    }
    .protemp:hover {
        cursor: pointer;
    }
    .heading {
        text-align: center;
        font-size: 6vw;
        font-weight: bolder;
    }
    .center {
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    .hor {
        display: flex;
        margin-left: auto;
        margin-right: auto;
        font-size: 10px;
    }

    .horg {
        border: 1;
        border-radius: 5px;
        background-color: transparent;
        width: min-content;
        margin-left: 10px;
        padding: 5px;
        height: 15px;
        margin-top: 5px;
        justify-content: center;
    }
    .centerp {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        text-align: center;
    }
    .horg-black {
        border: 1;
        border-radius: 5px;
        background-color: transparent;
        width: min-content;
        margin-left: 10px;
        padding: 5px;
        height: 15px;
        margin-top: 5px;
        justify-content: center;
    }
    .un {
        font-size: 22px;
        margin: 15px;
        margin-top: 5px;
        font-size: 30px;
        color: #bfbfbf;
    }
    p {
        margin: 0px;
        font-size: 15px;
    }

    @media only screen and (max-device-width: 720px) {
        .title {
            text-align: center;
            justify-content: center;
        }
        .bd {
            text-align: center;
        }
        .un {
            justify-content: center;
            font-size: 25px;
            text-align: center;
        }
        .pin {
            width: 100%;
            margin-left: 0px;
            justify-content: center;
        }
        .col {
            justify-content: center;
            margin: auto;
            display: inline-grid;
            grid-template-columns: auto;
            padding: 10px;
            gap: 20px 50px;
        }
    }
    .horg {
        border: 1;
        border-radius: 5px;
        background-color: transparent;
        padding: 2px;
        height: 25px;
        margin-bottom: 15px;
    }
    .ctitle {
        margin-left: 10px;
        font-size: 20px;
        font-weight: bold;
    }
    .ppm {
        display: flex;
        justify-content: center;
    }
    .bar1 {
        width: 2px;
        height: 30px;
        background-color: rgb(82, 82, 82);
        margin-right: 4px;
        margin-top: 10px;
    }
    .hor {
        display: flex;
        justify-content: center;
        font-size: 13px;
    }

    .gprojects {
        padding: 40px;
    }

    .but {
        width: 100%;
        align-items: center;
        margin-left: auto;
        margin-right: auto;
        background-color: black;
        padding: 12px;
        color: white;
        border: 1px solid #edeceb;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
    }
    .dark-mode {
        background-color: #09090b;
        color: #fbfbfa;
        border-color: #27262b;
    }
    .mp {
        background-image:
            linear-gradient(to right, #3c3c3c 1.5px, transparent 1px),
            linear-gradient(to bottom, #3c3c3c 1.5px, transparent 1px);
        background-size: 27px 27px;
        background-position: 0 0;

        mask-composite: intersect;
        -webkit-mask-composite: destination-in;
    }
    .dark-mode:hover {
        background-color: #18181b;
        color: #fbfbfa;
        border-color: #27262b;
    }
    #container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100px;
        padding: 1px;
    }
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .centerp {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        text-align: center;
    }

    .le {
        text-align: center;
        margin-bottom: 40px;
    }
    .mainp {
        padding: 70px;
        margin-bottom: 0px;
        margin-top: 0px;
    }
    .main {
        display: flex;
        justify-content: center;
        text-align: center;
        margin-bottom: 30px;
        z-index: 100;
    }
    .overlay {
        background: rgba(0, 0, 0, 0.699);
    }
    .gridbd {
        position: relative;
        inset: 0;
        margin-bottom: 0px;
        height: 100%;
        width: 80%;
    }

    .sb {
        cursor: pointer;
        display: block;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        font-size: 12px;
        color: black;
        text-decoration: none;
    }

    .projects {
        padding: 40px;
        display: flex;
        margin-top: 10px;
        align-items: center;
        justify-content: center;
    }

    h1 {
        margin: 20px 0 0;
        font-size: 3rem;
        letter-spacing: 1px;
        text-align: center;
    }
    @keyframes down {
        0% {
            opacity: 0;
            top: 8px;
        }
        5% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            top: 38px;
        }
    }
    @media screen and (max-width: 480px) {
        h1 {
            margin: 10px 0 0;
            font-size: 2rem;
        }
    }
    .butcenter {
        align-items: center;
    }
    .col {
        justify-content: center;
        margin: auto;
        display: inline-grid;
        grid-template-columns: auto auto;
        padding: 10px;
        gap: 20px 50px;
    }
    .sdiv {
        display: inline;
    }
    .sicon {
        color: white;
        margin-left: 10px;
        margin-right: 10px;
    }
    .ball {
        margin-top: 48px;
        margin-right: 10px;
        width: 20px;
        height: 20px;
        border: 1;
        border-radius: 100px;
        background: rgba(247, 2, 2, 0.733);
    }
    .details {
        display: block;
        margin: auto;
        border: 1;
    }
    .statusdiv {
    }
    .title {
        margin-top: 80px;
        display: flex;
        text-align: left;
        justify-content: left;
    }
    .bd {
        display: flex;
        justify-content: left;
        text-align: left;
        padding: 10px;
    }
    .img {
        margin: 10px;
        display: inline-block;
        border: 1;
        padding: 10px;
        border-radius: 10px;
    }
    h1 {
        margin-left: 10px;
        font-size: 50px;
    }
    @media screen and (max-width: 700px) {
        .col {
            justify-content: center;
            align-items: center;
            text-align: center;
            width: auto;
            grid-template-columns: auto auto;
        }
        .title {
            text-align: center;
            justify-content: center;
        }
        .gridbd {
            display: flex;
            text-align: center;
            justify-content: center;
            padding: 0;
            width: 100%;
            margin-top: 0;
            margin-left: auto;
            margin-right: auto;
            mask-image: none;
            -webkit-mask-image: none;
        }
        .mainp {
            margin-top: 0;
            margin-bottom: 0;
            padding: 0px;
            height: 100%;
            width: 100%;
        }
    }
    @media screen and (max-width: 500px) {
        .col {
            justify-content: center;
            align-items: center;
            text-align: center;
            width: auto;
            grid-template-columns: 100%;
        }
        .title {
            text-align: center;
            justify-content: center;
        }
        .bd {
            display: block;
        }
        .statusdiv {
        }
        .bar1 {
            margin-top: 20px;
            height: 55px;
        }
        .main {
            justify-content: space-between;
            display: block;
        }
    }
    .center {
        margin-left: auto;
        margin-right: auto;
    }
    .img {
        margin: 5px;
        border: 1;
        border-radius: 5px;
    }
    blockquote {
        border: 1;
        border-style: none;
        padding: 2px;
        text-align: center;
        border-radius: 5px;
    }
</style>
