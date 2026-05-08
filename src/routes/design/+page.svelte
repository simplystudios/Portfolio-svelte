<script>
    import { onMount } from "svelte";

    export let data;
    let designs = [];
    let mounted = false;
    let active = null;

    onMount(() => {
        mounted = true;
    });

    designs = data.design;

    $: designGroups = (() => {
        if (designs.length === 0) return [];
        const order = ["ui", "logo", "poster", "illustration"];
        const map = {};
        for (const item of designs) {
            const t = item.type || "other";
            if (!map[t]) map[t] = [];
            map[t].push(item);
        }
        const labels = {
            ui: "UI & Mockups",
            logo: "Logos",
            poster: "Posters",
            illustration: "Illustrations",
            other: "Other",
        };
        return [...order, ...Object.keys(map).filter((k) => !order.includes(k))]
            .filter((k) => map[k])
            .map((k) => ({ key: k, label: labels[k] || k, items: map[k] }));
    })();

    const tagInfo = {
        detro: {
            title: "Detro",
            desc: "A Material 3 transit app for Delhi-NCR. Minimal, Clean and Native Experience. built for everyday riders by everyday riders",
        },
        nutrifact: {
            title: "Nutrifact",
            desc: "A nutrition scanner app that breaks down food labels instantly. Designed for quick scanning with a clean, readable interface.",
        },
        tick: {
            title: "Tick",
            desc: "A minimal focus timer app. Clean home and timer screens built around distraction-free productivity.",
        },
        cinewatch: {
            title: "Cinewatch",
            desc: "A movie tracking and watchlist app with a cinematic dark aesthetic.",
        },
        vardaan: {
            title: "Vardaan MUN",
            desc: "Brand identity and website design for a Model United Nations conference.",
        },
    };

    const typeLabels = {
        ui: "UI & Mockup",
        logo: "Logo",
        poster: "Poster",
        illustration: "Illustration",
    };

    function open(d) {
        active = d;
        document.body.style.overflow = "hidden";
    }

    function close() {
        active = null;
        document.body.style.overflow = "";
    }

    function handleKey(e) {
        if (e.key === "Escape") close();
    }

    function getRelated(current) {
        return designs
            .filter((d) => d !== current && d.tag === current.tag)
            .slice(0, 6);
    }
</script>

<svelte:window on:keydown={handleKey} />
<svelte:head>
    <title>Ansh Wadhwa — Design</title>
</svelte:head>

<!-- lightbox -->
{#if active}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="lb-backdrop" on:click={close}>
        <div class="lb-panel" on:click|stopPropagation>
            <div class="lb-image-wrap">
                <img src={active.image} alt={active.name} class="lb-img" />
            </div>
            <aside class="lb-sidebar">
                <button class="lb-close" on:click={close} aria-label="Close">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                            d="M1 1l12 12M13 1L1 13"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                        />
                    </svg>
                </button>

                <div class="lb-info">
                    <span class="lb-type-tag"
                        >{typeLabels[active.type] || active.type}</span
                    >
                    <h2 class="lb-title">{active.name}</h2>
                    {#if active.tag && tagInfo[active.tag]}
                        <p class="lb-project-name">
                            {tagInfo[active.tag].title}
                        </p>
                        <p class="lb-desc">{tagInfo[active.tag].desc}</p>
                    {/if}
                </div>

                {#if getRelated(active).length > 0}
                    <div class="lb-related">
                        <p class="lb-related-label">Related</p>
                        <div class="lb-related-grid">
                            {#each getRelated(active) as r}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div
                                    class="lb-related-thumb"
                                    on:click={() => (active = r)}
                                >
                                    <img
                                        src={r.image}
                                        alt={r.name}
                                        class="lb-related-img"
                                    />
                                    <span class="lb-related-name">{r.name}</span
                                    >
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
            </aside>
        </div>
    </div>
{/if}

<div class="shell">
    <div class="content">
        <div class="page-enter" class:visible={mounted}>
            <header class="page-header">
                <div class="design-header-row">
                    <h1>Design</h1>
                </div>
                <p class="subtitle">
                    Logos, UI, Posters & Illustrations · {designs.length} items
                </p>
            </header>

            <div class="gallery-container">
                {#each designGroups as group, gi}
                    <div
                        class="design-section"
                        style="animation-delay: {gi * 80}ms"
                    >
                        <p class="design-group-label">{group.label}</p>
                        <div class="design-grid">
                            {#each group.items as d, i}
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div
                                    class="design-item"
                                    style="animation-delay: {gi * 80 +
                                        i * 30}ms"
                                    on:click={() => open(d)}
                                >
                                    <div class="design-wrap">
                                        <img
                                            src={d.image}
                                            alt={d.name}
                                            class="design-img"
                                            loading="lazy"
                                        />
                                        <div class="design-hover">
                                            <span class="design-hover-label"
                                                >{d.name}</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    :global(body) {
        background: #0a0a0a;
        margin: 0;
        font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        -webkit-font-smoothing: antialiased;
    }

    .shell {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        padding: 80px 20px 160px;
    }

    .content {
        max-width: 600px;
        width: 100%;
        margin: 0 auto;
        flex: 1;
    }

    .page-enter {
        opacity: 0;
        transform: translateY(8px);
        transition:
            opacity 0.35s ease,
            transform 0.35s ease;
    }
    .page-enter.visible {
        opacity: 1;
        transform: none;
    }

    .page-header {
        margin: 0 0 40px;
    }

    h1 {
        font-size: 32px;
        font-weight: 600;
        color: #fff;
        margin: 0 0 6px;
        letter-spacing: -0.5px;
    }

    .subtitle {
        font-size: 15px;
        color: #666;
        margin: 0;
    }

    .design-header-row {
        display: flex;
        align-items: baseline;
        gap: 12px;
        margin-bottom: 6px;
    }
    .design-header-row h1 {
        margin: 0;
    }

    @keyframes fadeUp {
        from {
            opacity: 0;
            transform: translateY(6px);
        }
        to {
            opacity: 1;
            transform: none;
        }
    }

    .gallery-container {
        display: flex;
        flex-direction: column;
    }

    .design-section {
        margin-bottom: 48px;
        animation: fadeUp 0.3s ease both;
    }

    .design-group-label {
        font-size: 11px;
        font-weight: 500;
        color: #555;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin: 0 0 14px;
    }

    .design-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
    }

    .design-item {
        animation: fadeUp 0.3s ease both;
        cursor: zoom-in;
    }

    /*.design-wrap {
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        background: #111;
        aspect-ratio: 3/4;
        border: 1px solid rgba(255, 255, 255, 0.04);
    }*/

    .design-img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(1.001);
        transition:
            opacity 0.2s ease,
            transform 0.3s ease;
    }
    .design-wrap:hover .design-img {
        opacity: 0.7;
        transform: scale(1.03);
    }

    .design-hover {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        opacity: 0;
        padding: 12px;
        transition: opacity 0.2s ease;
    }
    .design-wrap:hover .design-hover {
        opacity: 1;
    }

    .design-hover-label {
        font-size: 12px;
        font-weight: 500;
        color: #ccc;
        background: rgba(10, 10, 10, 0.72);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        padding: 4px 9px;
        border-radius: 5px;
        letter-spacing: 0.01em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: calc(100% - 24px);
        transform: translateY(4px);
        transition: transform 0.2s ease;
    }
    .design-wrap:hover .design-hover-label {
        transform: translateY(0);
    }

    /* ── lightbox ── */
    .lb-backdrop {
        position: fixed;
        inset: 0;
        z-index: 1000;
        background: rgba(0, 0, 0, 0.88);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        animation: fadeIn 0.18s ease;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .lb-panel {
        display: flex;
        width: 100%;
        max-width: 1000px;
        height: min(85vh, 700px);
        background: #111;
        border: 1px solid rgba(255, 255, 255, 0.07);
        border-radius: 16px;
        overflow: hidden;
        animation: slideUp 0.2s ease;
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(12px);
        }
        to {
            opacity: 1;
            transform: none;
        }
    }

    .lb-image-wrap {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 32px;
        background: #0d0d0d;
        min-width: 0;
    }

    .lb-img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 8px;
    }

    .lb-sidebar {
        width: 360px;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        border-left: 1px solid rgba(255, 255, 255, 0.06);
        overflow-y: auto;
        padding: 28px 24px;
        gap: 28px;
        position: relative;
    }

    .lb-close {
        position: absolute;
        top: 16px;
        right: 16px;
        background: rgba(255, 255, 255, 0.06);
        border: none;
        color: #888;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition:
            background 0.15s ease,
            color 0.15s ease;
        flex-shrink: 0;
    }
    .lb-close:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
    }

    .lb-info {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-top: 8px;
    }

    .lb-type-tag {
        font-size: 10px;
        font-weight: 500;
        color: #444;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    .lb-title {
        font-size: 17px;
        font-weight: 600;
        color: #fff;
        margin: 0;
        letter-spacing: -0.2px;
        line-height: 1.3;
    }

    .lb-project-name {
        font-size: 11px;
        font-weight: 500;
        color: #444;
        margin: 4px 0 0;
        text-transform: uppercase;
        letter-spacing: 0.08em;
    }

    .lb-desc {
        font-size: 13px;
        color: #555;
        margin: 0;
        line-height: 1.65;
    }

    .lb-related {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .lb-related-label {
        font-size: 10px;
        font-weight: 500;
        color: #444;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin: 0;
    }

    .lb-related-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 6px;
    }

    .lb-related-thumb {
        display: flex;
        flex-direction: column;
        gap: 4px;
        cursor: pointer;
    }

    .lb-related-img {
        width: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.05);
        transition: opacity 0.15s ease;
    }
    .lb-related-thumb:hover .lb-related-img {
        opacity: 0.7;
    }

    .lb-related-name {
        font-size: 10px;
        color: #444;
        line-height: 1.3;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    /* mobile */
    @media (max-width: 600px) {
        .lb-backdrop {
            padding: 0;
            align-items: flex-end;
        }

        .lb-panel {
            flex-direction: column;
            width: 100%;
            max-width: 100%;
            height: 95dvh;
            border-radius: 20px 20px 0 0;
            border-bottom: none;
        }

        .lb-image-wrap {
            flex: 1;
            padding: 24px 20px 16px;
        }

        .lb-sidebar {
            width: 100%;
            border-left: none;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            padding: 20px;
            max-height: 40dvh;
            gap: 20px;
        }
    }
</style>
