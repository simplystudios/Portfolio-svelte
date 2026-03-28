<script>
    import { onMount } from "svelte";
    import { fadeUp } from "$lib/actions/fadeUp.js";

    let dp = [];
    let dw = [];
    let loading = true;

    onMount(async () => {
        try {
            let m = await fetch("/projects.json");
            if (!m.ok) throw new Error("JSON fetch failed");
            let j = await m.json();
            dp = j.projects;
            dw = j.work;
        } catch (error) {
            console.log(error);
        } finally {
            loading = false;
        }
    });
</script>

<svelte:head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<div class="main">
    <div class="profile">
        <h1 class="bodyhead">Projects</h1>
        <hr />
        {#each dp as t, i}
            <div use:fadeUp={{ delay: i * 60 }} class="projectsec">
                <div class="proitem">
                    <div class="pro-title-row">
                        <span class="pro-name">{t.name}</span>
                        <span class="prosubhead">{t.timeline}</span>
                    </div>
                    <p class="pro-desc">{t.description}</p>

                    <div class="tags">
                        {#each t.tags as p}
                            <span class="tag">{p}</span>
                        {/each}
                    </div>

                    <div class="links">
                        {#if t.githubLink}
                            <a
                                href={t.githubLink}
                                target="_blank"
                                rel="noopener"
                                class="linkpill"
                            >
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    ><path
                                        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77A5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                                    /></svg
                                >
                                GitHub
                            </a>
                        {/if}
                        {#if t.link && t.link !== t.githubLink}
                            <a
                                href={t.link}
                                target="_blank"
                                rel="noopener"
                                class="linkpill"
                            >
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    ><path
                                        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                                    /><polyline points="15 3 21 3 21 9" /><line
                                        x1="10"
                                        y1="14"
                                        x2="21"
                                        y2="3"
                                    /></svg
                                >
                                Live site
                            </a>
                        {/if}
                        {#if t.mdLink}
                            <a href={t.mdLink} class="linkpill">
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    ><path
                                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                                    /><polyline points="14 2 14 8 20 8" /><line
                                        x1="16"
                                        y1="13"
                                        x2="8"
                                        y2="13"
                                    /><line
                                        x1="16"
                                        y1="17"
                                        x2="8"
                                        y2="17"
                                    /><polyline points="10 9 9 9 8 9" /></svg
                                >
                                Blog
                            </a>
                        {/if}
                    </div>
                </div>
            </div>
            <hr />
        {/each}
    </div>

    <div class="profilew">
        <h1 class="bodyhead">Work</h1>
        <hr />
        {#each dw as t, i}
            <div use:fadeUp={{ delay: i * 60 }} class="projectsec">
                <div class="proitem">
                    <div class="pro-title-row">
                        <span class="pro-name">{t.name}</span>
                        <span class="prosubhead">{t.timeline}</span>
                    </div>
                    <p class="pro-desc">{t.description}</p>
                    <p class="prosubhead" style="margin-bottom: 10px;">
                        {t.type} · {t.role}
                    </p>
                    <div class="links">
                        {#if t.link}
                            <a
                                href={t.link}
                                target="_blank"
                                rel="noopener"
                                class="linkpill"
                            >
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    ><path
                                        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                                    /><polyline points="15 3 21 3 21 9" /><line
                                        x1="10"
                                        y1="14"
                                        x2="21"
                                        y2="3"
                                    /></svg
                                >
                                Live site
                            </a>
                        {/if}
                        {#if t.githubLink}
                            <a
                                href={t.githubLink}
                                target="_blank"
                                rel="noopener"
                                class="linkpill"
                            >
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    ><path
                                        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77A5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                                    /></svg
                                >
                                GitHub
                            </a>
                        {/if}
                    </div>
                </div>
            </div>
            <hr />
        {/each}
    </div>
</div>

<style>
    :global(html) {
        scroll-behavior: smooth;
    }
    :global(body) {
        background-color: #171717;
        margin: 0;
        padding: 0;
        /* prevents horizontal scroll from overflow on mobile */
        overflow-x: hidden;
    }
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    hr {
        border: none;
        border-top: 1px solid rgba(255, 255, 255, 0.06);
        margin: 0;
    }

    .main {
        display: block;
        color: #dfdfdf;
        /* responsive horizontal padding — tighter on small screens */
        padding: 24px 16px;
    }

    .profile,
    .profilew {
        margin: 0 auto;
        max-width: 600px;
        width: 100%;
        color: #a1a1a1;
        font-weight: 400;
        /* use clamp so padding scales with screen */
        padding: clamp(16px, 4vw, 30px);
    }
    .profilew {
        padding-top: 0;
    }

    .bodyhead {
        /* scales between 28px on small phones and 40px on desktop */
        font-size: clamp(28px, 6vw, 40px);
        color: #dfdfdf;
        margin-bottom: 24px;
        line-height: 1.2;
    }

    .projectsec {
        display: block;
        margin-top: 20px;
        padding-top: 15px;
        padding-bottom: 18px;
    }
    .proitem {
        padding: 0;
    }

    .pro-title-row {
        display: flex;
        align-items: baseline;
        flex-wrap: wrap; /* wraps on very narrow screens */
        gap: 8px;
        margin-bottom: 6px;
    }
    .pro-name {
        /* slightly smaller on mobile */
        font-size: clamp(15px, 4vw, 18px);
        color: #dfdfdf;
        font-weight: 500;
    }
    .prosubhead {
        color: dimgray;
        font-size: 13px;
        line-height: 1.4;
        margin: 0 0 6px;
    }
    .pro-desc {
        font-size: 14px;
        line-height: 1.7;
        color: #a1a1a1;
        margin: 0 0 10px;
        /* prevents long words like URLs from breaking layout */
        overflow-wrap: break-word;
        word-break: break-word;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 10px;
    }
    .tag {
        font-size: 12px;
        padding: 3px 10px;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #888;
        /* ensure tags never shrink below their content */
        white-space: nowrap;
    }

    .links {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    .linkpill {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        font-size: 12px;
        /* taller tap target for touch — 36px min height */
        padding: 6px 14px;
        min-height: 36px;
        border-radius: 999px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #888;
        text-decoration: none;
        background: rgba(255, 255, 255, 0.04);
        transition:
            border-color 0.15s,
            color 0.15s;
        /* prevent tap highlight flash on Android */
        -webkit-tap-highlight-color: transparent;
        white-space: nowrap;
    }
    .linkpill:hover {
        border-color: rgba(255, 255, 255, 0.25);
        color: #dfdfdf;
    }
    /* active state for touch feedback instead of hover */
    .linkpill:active {
        background: rgba(255, 255, 255, 0.08);
        color: #dfdfdf;
    }

    @media (max-width: 480px) {
        .main {
            padding: 16px 12px;
        }
        .profile,
        .profilew {
            padding: 16px 12px;
        }
        /* on very small screens, stack title and timeline vertically */
        .pro-title-row {
            flex-direction: column;
            gap: 2px;
        }
    }
</style>
