<script>
    import { onMount } from "svelte";
    import { fadeUp } from "$lib/actions/fadeUp.js";
    let dp = [];
    let dw = [];

    let loading = true;
    onMount(async () => {
        try {
            // 2. IMPORTANT: Use absolute path "/projects.json" so it always looks in the static root
            let m = await fetch("/projects.json");

            if (!m.ok) {
                throw new Error("JSON fetch failed");
            }
            let j = await m.json();
            console.log(j);
            dp = j.projects;
            dw = j.work;
        } catch {
            console.log(error);
        } finally {
            loading = false;
        }
    });
    // import Navbar from "$lib/./Navbar.svelte";
    // let currentTab = "Projects";
</script>

<div class="main">
    <div class="profile">
        <h1 class="bodyhead">Projects</h1>
        <hr style="color: rgba(255, 255, 255, 0.06);" />
        {#each dp as t}
            <div
                use:fadeUp={{ delay: i * 60 }}
                onclick={open(`/projects/view?id=${t.id}`)}
                class="projectsec"
            >
                <div class="proitem">
                    <a href={t.link}>{t.name} ↗</a>
                    <p class="prosubhead">{t.timeline}</p>
                    <p style="line-height: 25px;">{t.description}</p>
                    <div style="display: flex;">
                        {#each t.tags as p}
                            <p style="padding: 5px;">{p}</p>
                        {/each}
                    </div>
                </div>
            </div>
            <hr style="color: rgba(255, 255, 255, 0.06);" />
        {/each}
    </div>
    <br />
    <div class="profilew">
        <h1 class="bodyhead">Work</h1>
        <hr style="color: rgba(255, 255, 255, 0.06);" />
        {#each dw as t}
            <div
                use:fadeUp={{ delay: i * 60 }}
                onclick={open(`/view?id=${t.id}`)}
                class="projectsec"
            >
                <div class="proitem">
                    <a href={t.link}>{t.name} ↗</a>
                    <p class="prosubhead">{t.timeline}</p>
                    <p style="line-height: 25px;">{t.description}</p>
                    <p style="line-height: 25px;">{t.type} | {t.role}</p>
                </div>
            </div>
            <hr style="color: rgba(255, 255, 255, 0.06);" />
        {/each}
    </div>
</div>

<style>
    :root {
        --border-color: #edeceb;
        --grid-color: #414344;
        --mp-color: rgba(255, 255, 255, 0.533);
    }
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
    :global(html) {
        scroll-behavior: smooth;
    }
    :global(*) {
        box-sizing: border-box;
    }
    :global(body) {
        background-color: #171717;
    }
    .proitem {
        padding: 0px;
        line-height: 12px;
    }
    .projectsec {
        display: block;
        margin-top: 20px;
        padding-top: 15px;
    }
    a {
        color: #dfdfdf;
        font-size: 20px;
        text-decoration: none;
    }
    .projectsec:hover {
        cursor: pointer;
    }
    a:hover {
        text-decoration: underline;
        text-decoration-color: dimgray;
        text-decoration-thickness: 3px;
    }
    .prosubhead {
        color: dimgray;
    }
    .bodytxt {
        font-size: 24px;
        line-height: 1.6;
        color: #888888;
        margin-bottom: 16px;
    }
    strong {
        color: #dfdfdf;
        font-weight: 400;
    }

    .secondary {
        color: #888888;
        font-size: 16px;
    }

    .bodyhead {
        font-size: 40px;
        color: #dfdfdf;
        margin-bottom: 30px;
        line-height: 42px;
    }
    .main {
        display: block;
        color: #dfdfdf;
        margin: 30px;
        align-items: center;
        justify-content: center;
    }
    .pfp {
        width: 40%;
        min-width: 280px;
        border-radius: 25px;
    }
    .pfpc {
        margin-right: 0px;
        flex: 0;
        margin-left: 280px;
    }
    .profile {
        /* MAIN CHANGES HERE: */
        margin: 0 auto; /* Centers the div */
        max-width: 600px; /* Restricts width so it forms a neat column */
        width: 100%; /* Ensures it works on mobile */

        color: #a1a1a1;
        font-weight: 400;
        padding: 30px;
        padding-bottom: 0px;
        /* Removed flex: 1; so it doesn't stretch across the whole screen */
    }
    .profilew {
        /* MAIN CHANGES HERE: */
        margin: 0 auto; /* Centers the div */
        max-width: 600px; /* Restricts width so it forms a neat column */
        width: 100%; /* Ensures it works on mobile */

        color: #a1a1a1;
        font-weight: 400;
        padding: 30px;
        padding-top: 0px;
        /* Removed flex: 1; so it doesn't stretch across the whole screen */
    }
    @media only screen and (max-width: 1280px) {
        .main {
            display: block;
        }
        .pfp {
            margin-left: 40px;
            margin-right: 40px;
        }
        .pfpc {
            margin: 0;
        }
        .profile {
            margin: 0 auto; /* Keeps it centered on mobile too */
        }
    }
</style>
