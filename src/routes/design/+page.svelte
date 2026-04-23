<script>
    import { Modal, Content, Trigger } from "sv-popup";

    export let data;
    let designs = [];
    let mounted = true;

    designs = data.design;

    // Group design items by type directly from the designs array
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
</script>

<svelte:head>
    <title>Ansh Wadhwa — Design</title>
</svelte:head>

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
                                <div
                                    class="design-item"
                                    style="animation-delay: {gi * 80 +
                                        i * 30}ms"
                                >
                                    <Modal
                                        big={false}
                                        button={false}
                                        basic={false}
                                    >
                                        <Content>
                                            <div class="lightbox">
                                                <img
                                                    src={d.image}
                                                    alt={d.name}
                                                    class="lightbox-img"
                                                />
                                            </div>
                                        </Content>
                                        <Trigger>
                                            <div class="design-wrap">
                                                <img
                                                    src={d.image}
                                                    alt={d.name}
                                                    class="design-img"
                                                    loading="lazy"
                                                />
                                                <div class="design-hover">
                                                    <span
                                                        class="design-hover-label"
                                                    >
                                                        {d.name}
                                                    </span>
                                                </div>
                                            </div>
                                        </Trigger>
                                    </Modal>
                                    <!-- <p class="design-label">{d.name}</p> -->
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
    .dim {
        color: #444;
        font-size: 14px;
    }

    .design-badge {
        font-size: 10px;
        font-weight: 500;
        color: #a78bfa;
        background: rgba(167, 139, 250, 0.1);
        border: 1px solid rgba(167, 139, 250, 0.2);
        border-radius: 4px;
        padding: 2px 7px;
        letter-spacing: 0.03em;
        flex-shrink: 0;
    }

    .design-badge.large {
        font-size: 11px;
        padding: 3px 10px;
        border-radius: 6px;
        align-self: center;
        margin-bottom: 6px;
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

    /* ── design view ── */
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
    }

    .design-wrap.square {
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        border: 1px solid rgba(167, 139, 250, 0.04);
        background: #1a1228;
        cursor: zoom-in;
        aspect-ratio: 1/1;
    }

    .design-wrap.wide {
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        border: 1px solid rgba(167, 139, 250, 0.08);
        background: #1a1228;
        cursor: zoom-in;
        aspect-ratio: 16/9;
    }

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
        overflow: hidden;
        align-items: center;
        justify-content: left;
        opacity: 0;
        transition: opacity 0.2s ease;
    }
    .design-wrap:hover .design-hover {
        opacity: 1;
    }

    .design-hover-label {
        font-size: 30px;
        font-weight: 400;
        color: #e0e0e0;
        transform: translateY(120px) translateX(0px);

        padding: 5px 12px;
        border-radius: 6px;
    }

    .design-label {
        margin: 8px 0 0;
        font-size: 12px;
        color: #555;
    }

    /* ── lightbox ── */
    .lightbox {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(12px);
        padding: 24px;
    }
    .lightbox-img {
        max-width: min(90%, 900px);
        max-height: 90vh;
        border-radius: 8px;
        object-fit: contain;
        box-shadow: 0 32px 80px rgba(0, 0, 0, 0.8);
    }

    @media (max-width: 500px) {
        .design-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
