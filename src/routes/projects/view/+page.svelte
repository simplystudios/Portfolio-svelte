<script>
    import Markdown from "svelte-exmarkdown";
    import { page } from "$app/stores";

    // URL parameter
    $: id = $page.url.searchParams.get("id");

    let md = "";
    let loading = true;
    let errorMsg = "";

    // Ye reactive block tab tab chalega jab bhi 'id' ki value change hogi
    $: if (id) {
        fetchProjectMarkdown(id);
    }

    async function fetchProjectMarkdown(projectId) {
        loading = true;
        errorMsg = "";
        md = "";

        try {
            // 1. Apni JSON file fetch kar
            const res = await fetch("/projects.json");
            if (!res.ok) throw new Error("JSON load nahi hua");

            const data = await res.json();

            // 2. 'projects' aur 'work' dono arrays mein se project dhoondh
            const allProjects = [
                ...(data.projects || []),
                ...(data.work || []),
            ];
            const project = allProjects.find((p) => p.id === projectId);

            if (!project) {
                errorMsg = "Project not found. Check your URL.";
                loading = false;
                return;
            }

            if (!project.mdLink) {
                errorMsg = "Is project ka markdown link missing hai JSON mein.";
                loading = false;
                return;
            }

            // 3. GitHub (ya external link) se raw markdown fetch kar
            const mdRes = await fetch(project.mdLink);
            if (!mdRes.ok) throw new Error("Markdown file fetch fail ho gayi");

            md = await mdRes.text();
        } catch (error) {
            console.error("Fetch error:", error);
            errorMsg = "Oops! Data load karne mein problem aayi.";
        } finally {
            loading = false;
        }
    }
</script>

<div class="main">
    <div class="markdown-wrapper">
        <button class="back-btn" on:click={() => open("/projects")}>
            ← Back
        </button>

        {#if loading}
            <p class="status">Loading project details...</p>
        {:else if errorMsg}
            <p class="status error">{errorMsg}</p>
        {:else}
            <Markdown {md} />
        {/if}
    </div>
</div>

<style>
    :global(*) {
        box-sizing: border-box;
    }
    :global(body) {
        background-color: #171717;
        color: #a1a1a1;
        margin: 0;
        font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    .main {
        display: flex;
        justify-content: center;
        padding: 80px 20px;
        min-height: 100vh;
    }

    .markdown-wrapper {
        width: 100%;
        max-width: 600px;
    }

    /* Clean Back Button */
    .back-btn {
        background: none;
        border: none;
        color: #888888;
        font-size: 16px;
        cursor: pointer;
        padding: 0;
        margin-bottom: 40px;
        transition: color 0.2s ease;
        font-family: inherit;
    }

    .back-btn:hover {
        color: #ffffff;
    }

    /* Status Messages */
    .status {
        text-align: left;
        color: #888888;
        font-size: 18px;
    }

    .status.error {
        color: #ff6b6b;
    }

    /* MARKDOWN STYLING */
    .markdown-wrapper :global(h1) {
        color: #ffffff;
        font-size: 36px;
        margin-top: 0;
        margin-bottom: 24px;
        line-height: 1.2;
    }

    .markdown-wrapper :global(h2) {
        color: #ffffff;
        font-size: 24px;
        margin-top: 48px;
        margin-bottom: 16px;
    }

    .markdown-wrapper :global(h3) {
        color: #dfdfdf;
        font-size: 20px;
        margin-top: 32px;
        margin-bottom: 12px;
    }

    .markdown-wrapper :global(p) {
        font-size: 18px;
        line-height: 1.6;
        margin-top: 0;
        margin-bottom: 24px;
    }

    .markdown-wrapper :global(strong) {
        color: #dfdfdf;
        font-weight: 500;
    }

    .markdown-wrapper :global(a) {
        color: #dfdfdf;
        text-decoration: none;
        border-bottom: 1px solid #444;
        padding-bottom: 1px;
        transition: border-color 0.2s ease;
    }

    .markdown-wrapper :global(a:hover) {
        border-color: #ffffff;
    }

    .markdown-wrapper :global(hr) {
        border: none;
        border-top: 1px solid rgba(255, 255, 255, 0.06);
        margin: 48px 0;
    }

    .markdown-wrapper :global(ul) {
        font-size: 18px;
        line-height: 1.6;
        padding-left: 24px;
        margin-bottom: 24px;
    }

    .markdown-wrapper :global(li) {
        margin-bottom: 8px;
    }

    .markdown-wrapper :global(img) {
        max-width: 100%;
        height: auto;
        border-radius: 12px;
        margin: 32px 0;
        display: block;
    }
</style>
