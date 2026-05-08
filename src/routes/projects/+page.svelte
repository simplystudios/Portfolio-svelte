<script>
    import { fadeUp } from "$lib/actions/fadeUp.js";

    export let data;
    // Fallbacks
    let dw = data.work || [];
    let dp = data.projects || [];

    // Helper to generate GitHub OpenGraph image URLs from a repo link
    function getGithubOgImage(link) {
        if (!link) return null;
        try {
            const url = new URL(link);
            if (url.hostname === "github.com") {
                // Split the path and remove empty strings
                const parts = url.pathname.split("/").filter(Boolean);
                // Ensure we have at least owner and repo name
                if (parts.length >= 2) {
                    const owner = parts[0];
                    const repo = parts[1];
                    // '1' acts as a placeholder for the hash to fetch the latest OG image
                    return `https://socialify.git.ci/${owner}/${repo}/image?font=Raleway&language=1&name=1&owner=1&pattern=Plus&theme=DarkewsReader?font=Raleway&language=1&name=1&owner=1&pattern=Solid&theme=Dark`;
                }
            }
        } catch (e) {
            // Fails silently if the URL is invalid
        }
        return null;
    }
</script>

<svelte:head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<main class="resume-container">
    <h1>Work</h1>
    <br />
    <br />
    <div class="timeline">
        {#each dw as job, i}
            <div use:fadeUp={{ delay: i * 50 }} class="timeline-item">
                <div class="timeline-year">
                    {job.timeline ? job.timeline.split(" ")[0] : "2026"}
                </div>

                <div class="timeline-content">
                    <div class="meta-header">
                        {#if job.logo}
                            <img
                                src={job.logo}
                                alt={job.name}
                                class="company-logo"
                            />
                        {:else}
                            <img
                                src="/imgs/gistlogo.jpg"
                                alt="Company"
                                class="company-logo fallback"
                            />
                        {/if}

                        <span class="company-name">
                            {job.name}
                        </span>

                        <span class="dot">•</span>

                        <span
                            class="status {job.isCurrent ? 'current' : 'past'}"
                        >
                            {job.isCurrent
                                ? "Now"
                                : `with ${job.partner || "Team"}`}
                        </span>
                    </div>

                    <h3 class="role-title">{job.role}</h3>
                    <p class="description">{job.description}</p>

                    {#if job.images && job.images.length > 0}
                        <div class="media-grid">
                            {#each job.images as img}
                                <div class="media-card {img.aspect || 'wide'}">
                                    <img
                                        on:click={() => open(job.url)}
                                        src={img.url}
                                        alt="Work preview"
                                    />
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>

    <div class="section-divider">
        <h1 style="">Projects</h1>
    </div>

    <div class="timeline" style="margin-top: 70px;">
        {#each dp as project, i}
            <div use:fadeUp={{ delay: i * 50 }} class="timeline-item">
                <div class="timeline-year">
                    {project.timeline ? project.timeline.split(" ")[0] : "2026"}
                </div>

                <div class="timeline-content">
                    <div class="meta-header">
                        {#if project.logo}
                            <img
                                src={project.logo}
                                alt={project.name}
                                class="company-logo"
                            />
                        {:else}
                            <div
                                style="border: 1; border-radius: 20px; height:16px;width: 16px; background-color:#484a4c;"
                            ></div>
                        {/if}

                        <span class="company-name">
                            {project.name}
                        </span>
                    </div>

                    <p class="description">{project.description}</p>

                    {#if project.tags}
                        {#each project.tags as tag}
                            <span class="tag">{tag}</span>
                        {/each}
                    {/if}

                    <!-- IMAGE RENDERING LOGIC -->
                    {#if project.image && project.image.length > 0}
                        <div class="media-grid">
                            {#if project.image.length > 1}
                                {#each project.image as image}
                                    <div class="media-card {image.type}">
                                        <img
                                            src={image.url}
                                            alt={project.name}
                                        />
                                    </div>
                                {/each}
                            {:else}
                                <div class="media-card {project.image[0].type}">
                                    <img
                                        src={project.image[0].url}
                                        alt={project.name}
                                    />
                                </div>
                            {/if}
                        </div>
                        <!-- GITHUB FALLBACK LOGIC -->
                    {:else if project.githubLink && getGithubOgImage(project.githubLink)}
                        <div class="media-grid">
                            <div class="media-card wide">
                                <img
                                    src={getGithubOgImage(project.githubLink)}
                                    alt="{project.name} GitHub Repository"
                                />
                            </div>
                        </div>
                    {/if}

                    <div class="text-links">
                        {#if project.githubLink}
                            <a href={project.githubLink} target="_blank"
                                >GitHub</a
                            >
                        {/if}
                        {#if project.link && project.link !== project.githubLink}
                            <a href={project.link} target="_blank">Live Site</a>
                        {/if}
                        {#if project.mdLink}
                            <a href={`/projects/view?id=${project.id}`}
                                >Read Case Study</a
                            >
                        {/if}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</main>

<style>
    :global(body) {
        background-color: #0a0a0a;
        margin: 0;
        padding: 0;
        font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #dfdfdf;
    }

    .tag {
        display: inline-block;
        background-color: #1a1a1a;
        color: #dfdfdf;

        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        margin-right: 4px;
        margin-bottom: 16px;
    }

    .resume-container {
        max-width: 720px;
        margin: 100px auto;
        padding: 0 24px;
    }

    .timeline-item {
        display: flex;
        gap: 32px;
        margin-bottom: 30px;
    }

    .timeline-year {
        width: auto;
        flex-shrink: 0;
        font-size: 13px;
        font-weight: 500;
        color: #888;
        padding-top: 6px;
    }

    .timeline-content {
        flex: 1;
        min-width: 0;
    }

    .meta-header {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 6px;
        font-size: 15px;
    }

    .company-logo {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        object-fit: cover;
        border: 1px solid rgba(255, 255, 255, 0.1);
        background-color: #1f1f1f;
    }

    .company-logo.fallback {
        opacity: 0.8;
    }

    .company-name {
        font-weight: 500;
        font-size: 17px;
        letter-spacing: -0.01em;
        color: #dfdfdf;
    }

    .dot {
        color: #444;
        font-size: 12px;
    }

    .status {
        font-weight: 500;
    }

    .status.current {
        color: #10b981;
    }

    .status.past {
        color: #888;
        font-weight: 400;
    }

    .role-title {
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
        margin: 0 0 6px 0;
        letter-spacing: -0.01em;
    }

    .description {
        font-size: 15px;
        line-height: 1.6;
        color: #a1a1a1;
        margin: 0 0 10px 0;
    }

    .media-grid {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        flex-column: 2;
    }

    .media-card {
        background-color: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 10px;

        overflow: hidden;
        position: relative;
    }

    .media-card img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .media-card.square {
        width: 300px;
        height: 300px;
    }

    .media-card.wide {
        width: 400px;
        height: 220px;
    }

    .media-card.ewide {
        width: 350px;
        max-width: 500px;
        object-fit: contain;
        height: 280px;
    }

    .media-card.esquare {
        width: 300px;
        height: 400px;
    }

    .text-links {
        display: flex;
        gap: 16px;
        margin-top: 20px;
    }

    .section-divider {
        border-top: 1px solid #1e1e1e;
        margin: 34px 0 22px;
        padding-top: 30px;
    }

    .text-links a {
        font-size: 14px;
        font-weight: 500;
        color: #888;
        text-decoration: none;
        transition: color 0.15s ease;
    }

    .text-links a:hover {
        color: #ffffff;
        text-decoration: underline;
        text-underline-offset: 4px;
    }

    @media (max-width: 600px) {
        .resume-container {
            padding: 0 16px;
            margin: 60px auto;
        }

        .timeline-item {
            gap: 16px;
            margin-bottom: 56px;
        }

        .timeline-year {
            width: 36px;
        }

        .media-card.square {
            width: 100%;
            height: auto;
            aspect-ratio: 1 / 1;
        }

        .media-card.wide {
            aspect-ratio: 16 / 10;
        }
    }
</style>
