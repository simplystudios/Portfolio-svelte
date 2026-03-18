<script>
    import { Modal, Content, Trigger } from "sv-popup";
    import { onMount } from "svelte";

    let datvrid = [];
    let datamus = [];
    let dataraj = [];
    let datadhausi = [];
    let datadesign = [];
    let loading = true;
    let activeFolder = null;
    let mounted = false;
    let photoLayout = "list"; // "list" | "grid" | "magazine"

    onMount(async () => {
        mounted = true;
        try {
            const res = await fetch("/photos.json");
            if (!res.ok) throw new Error("Failed to load photos");
            const data = await res.json();
            datvrid = data.vrindavan || [];
            datamus = data.mussoorie || [];
            dataraj = data.rajasthan || [];
            datadhausi = data.dhausi || [];
            datadesign = data.design || [];
        } catch (e) {
            console.error(e);
        } finally {
            loading = false;
        }
    });

    // Photography folders
    $: photoFolders = [
        {
            id: "rajasthan",
            name: "Rajasthan",
            desc: "Thar Desert & Forts",
            year: "2024",
            data: dataraj,
        },
        {
            id: "mussoorie",
            name: "Mussoorie",
            desc: "Mountains & Fog",
            year: "2024",
            data: datamus,
        },
        {
            id: "vrindavan",
            name: "Vrindavan",
            desc: "Temples & Peace",
            year: "2023",
            data: datvrid,
        },
        {
            id: "dhausi",
            name: "Dhausi",
            desc: "Small village on top of the mountain",
            year: "2025",
            data: datadhausi,
        },
    ].filter((f) => f.data.length > 0);

    // Design folder — single entry, flagged as design type
    $: designFolder = {
        id: "design",
        name: "Design",
        desc: "Logos, UI, Posters & Illustrations",
        isDesign: true,
        data: datadesign,
    };

    function openFolder(folder) {
        activeFolder = folder;
    }

    function closeFolder() {
        activeFolder = null;
    }

    // Group design items by type
    $: designGroups = (() => {
        if (!activeFolder?.isDesign) return [];
        const order = ["ui", "logo", "poster", "illustration"];
        const map = {};
        for (const item of activeFolder.data) {
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
    <title>Ansh Wadhwa — Photography</title>
</svelte:head>

<div class="shell">
    <div class="content">
        <!-- ══════════ INDEX ══════════ -->
        {#if activeFolder === null}
            <div class="page-enter" class:visible={mounted}>
                <div class="top-bar">
                    <header class="page-header">
                        <h1>Photography</h1>
                        <p class="subtitle">
                            Collection of all my adventures in one place.
                        </p>
                    </header>
                </div>

                {#if loading}
                    <p class="dim">Loading...</p>
                {:else}
                    <!-- Photography section -->
                    <div class="folder-list">
                        {#each photoFolders as folder, i}
                            <button
                                class="folder-row"
                                style="animation-delay: {i * 60}ms"
                                on:click={() => openFolder(folder)}
                            >
                                <div class="folder-thumb">
                                    <div class="folder-body">
                                        <div class="folder-tab"></div>
                                        <div class="folder-face"></div>
                                    </div>
                                </div>
                                <div class="folder-text">
                                    <span class="folder-name"
                                        >{folder.name}</span
                                    >
                                    <span class="folder-desc"
                                        >{folder.desc}</span
                                    >
                                </div>
                                <div class="folder-right">
                                    <span class="count"
                                        >{folder.data.length} items</span
                                    >
                                    <span class="chevron">›</span>
                                </div>
                            </button>
                            <div class="divider"></div>
                        {/each}

                        <!-- Design folder — same row, colored badge -->
                        {#if designFolder.data.length > 0}
                            <button
                                class="folder-row"
                                style="animation-delay: {photoFolders.length *
                                    60}ms"
                                on:click={() => openFolder(designFolder)}
                            >
                                <div class="folder-thumb">
                                    <div class="folder-body">
                                        <div
                                            class="folder-tab design-tab"
                                        ></div>
                                        <div
                                            class="folder-face design-face"
                                        ></div>
                                    </div>
                                </div>
                                <div class="folder-text">
                                    <div class="folder-name-row">
                                        <span class="folder-name"
                                            >{designFolder.name}</span
                                        >
                                        <span class="design-badge"
                                            >Creative</span
                                        >
                                    </div>
                                    <span class="folder-desc"
                                        >{designFolder.desc}</span
                                    >
                                </div>
                                <div class="folder-right">
                                    <span class="count"
                                        >{designFolder.data.length} items</span
                                    >
                                    <span class="chevron">›</span>
                                </div>
                            </button>
                        {/if}
                    </div>
                {/if}
            </div>

            <!-- ══════════ PHOTO VIEW ══════════ -->
        {:else if !activeFolder.isDesign}
            <div class="page-enter visible">
                <div class="top-bar">
                    <button class="back-btn" on:click={closeFolder}
                        >← Back</button
                    >
                    <div class="layout-switcher">
                        <button
                            class="layout-btn"
                            class:active={photoLayout === "list"}
                            on:click={() => (photoLayout = "list")}
                            title="List"
                        >
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                            >
                                <rect
                                    x="0"
                                    y="1"
                                    width="15"
                                    height="2"
                                    rx="1"
                                    fill="currentColor"
                                />
                                <rect
                                    x="0"
                                    y="6"
                                    width="15"
                                    height="2"
                                    rx="1"
                                    fill="currentColor"
                                />
                                <rect
                                    x="0"
                                    y="11"
                                    width="15"
                                    height="2"
                                    rx="1"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                        <button
                            class="layout-btn"
                            class:active={photoLayout === "grid"}
                            on:click={() => (photoLayout = "grid")}
                            title="Grid"
                        >
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                            >
                                <rect
                                    x="0"
                                    y="0"
                                    width="6"
                                    height="6"
                                    rx="1.5"
                                    fill="currentColor"
                                />
                                <rect
                                    x="9"
                                    y="0"
                                    width="6"
                                    height="6"
                                    rx="1.5"
                                    fill="currentColor"
                                />
                                <rect
                                    x="0"
                                    y="9"
                                    width="6"
                                    height="6"
                                    rx="1.5"
                                    fill="currentColor"
                                />
                                <rect
                                    x="9"
                                    y="9"
                                    width="6"
                                    height="6"
                                    rx="1.5"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                        <button
                            class="layout-btn"
                            class:active={photoLayout === "magazine"}
                            on:click={() => (photoLayout = "magazine")}
                            title="Magazine"
                        >
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                            >
                                <rect
                                    x="0"
                                    y="0"
                                    width="6"
                                    height="9"
                                    rx="1.5"
                                    fill="currentColor"
                                />
                                <rect
                                    x="9"
                                    y="0"
                                    width="6"
                                    height="5"
                                    rx="1.5"
                                    fill="currentColor"
                                />
                                <rect
                                    x="9"
                                    y="7"
                                    width="6"
                                    height="8"
                                    rx="1.5"
                                    fill="currentColor"
                                />
                                <rect
                                    x="0"
                                    y="11"
                                    width="6"
                                    height="4"
                                    rx="1.5"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <header class="page-header">
                    <h1>{activeFolder.name}</h1>
                    <p class="subtitle">
                        {activeFolder.desc} · {activeFolder.data.length} photos
                    </p>
                </header>

                {#if photoLayout === "list"}
                    <div class="photo-stack">
                        {#each activeFolder.data as d, i}
                            <div
                                class="photo-item"
                                style="animation-delay: {i * 40}ms"
                            >
                                <Modal big={false} button={false} basic={false}>
                                    <Content
                                        ><div class="lightbox">
                                            <img
                                                src={d.image}
                                                alt={d.name}
                                                class="lightbox-img"
                                            />
                                        </div></Content
                                    >
                                    <Trigger
                                        ><div class="photo-wrap">
                                            <img
                                                src={d.image}
                                                alt={d.name}
                                                class="photo-img"
                                                loading="lazy"
                                            />
                                        </div></Trigger
                                    >
                                </Modal>
                                <p class="photo-label">{d.name}</p>
                            </div>
                        {/each}
                    </div>
                {:else if photoLayout === "grid"}
                    <div class="photo-grid">
                        {#each activeFolder.data as d, i}
                            <div
                                class="grid-item"
                                style="animation-delay: {i * 30}ms"
                            >
                                <Modal big={false} button={false} basic={false}>
                                    <Content
                                        ><div class="lightbox">
                                            <img
                                                src={d.image}
                                                alt={d.name}
                                                class="lightbox-img"
                                            />
                                        </div></Content
                                    >
                                    <Trigger
                                        ><div class="grid-wrap">
                                            <img
                                                src={d.image}
                                                alt={d.name}
                                                class="grid-img"
                                                loading="lazy"
                                            />
                                        </div></Trigger
                                    >
                                </Modal>
                                <p class="grid-label">{d.name}</p>
                            </div>
                        {/each}
                    </div>
                {:else if photoLayout === "magazine"}
                    <div class="magazine-grid">
                        {#each activeFolder.data as d, i}
                            <div
                                class="mag-item"
                                class:mag-tall={i % 5 === 0}
                                class:mag-wide={i % 5 === 3}
                                style="animation-delay: {i * 30}ms"
                            >
                                <Modal big={false} button={false} basic={false}>
                                    <Content
                                        ><div class="lightbox">
                                            <img
                                                src={d.image}
                                                alt={d.name}
                                                class="lightbox-img"
                                            />
                                        </div></Content
                                    >
                                    <Trigger>
                                        <div class="mag-wrap">
                                            <img
                                                src={d.image}
                                                alt={d.name}
                                                class="mag-img"
                                                loading="lazy"
                                            />
                                            <div class="mag-overlay">
                                                <span class="mag-label"
                                                    >{d.name}</span
                                                >
                                            </div>
                                        </div>
                                    </Trigger>
                                </Modal>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>

            <!-- ══════════ DESIGN VIEW ══════════ -->
        {:else}
            <div class="page-enter visible">
                <div class="top-bar">
                    <button class="back-btn" on:click={closeFolder}
                        >← Back</button
                    >
                </div>

                <header class="page-header">
                    <div class="design-header-row">
                        <h1>{activeFolder.name}</h1>
                        <span class="design-badge large">Creative</span>
                    </div>
                    <p class="subtitle">
                        {activeFolder.desc} · {activeFolder.data.length} items
                    </p>
                </header>

                <!-- grouped by type -->
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
                                        <Content
                                            ><div class="lightbox">
                                                <img
                                                    src={d.image}
                                                    alt={d.name}
                                                    class="lightbox-img"
                                                />
                                            </div></Content
                                        >
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
                                                        >{d.name}</span
                                                    >
                                                </div>
                                            </div>
                                        </Trigger>
                                    </Modal>
                                    <p class="design-label">{d.name}</p>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style>
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    :global(body) {
        background: #171717;
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

    .top-bar {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 40px;
    }

    .page-header {
        margin: 0;
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

    /* ── layout switcher ── */
    .layout-switcher {
        display: flex;
        gap: 2px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        padding: 3px;
        flex-shrink: 0;
        margin-top: 4px;
    }

    .layout-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        color: #444;
        padding: 6px 9px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition:
            background 0.15s,
            color 0.15s;
    }
    .layout-btn:hover {
        color: #888;
    }
    .layout-btn.active {
        background: rgba(255, 255, 255, 0.09);
        color: #ccc;
    }

    .back-btn {
        background: none;
        border: none;
        padding: 0;
        font-size: 14px;
        color: #555;
        cursor: pointer;
        font-family: inherit;
        transition: color 0.15s;
        margin-top: 6px;
    }
    .back-btn:hover {
        color: #ccc;
    }

    /* ── folder list ── */
    .folder-list {
        display: flex;
        flex-direction: column;
    }

    .folder-row {
        display: flex;
        align-items: center;
        gap: 18px;
        padding: 14px;
        margin: 0 -14px;
        background: transparent;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        text-align: left;
        width: calc(100% + 28px);
        transition: background 0.18s ease;
        animation: fadeUp 0.3s ease both;
    }
    .folder-row:hover {
        background: rgba(255, 255, 255, 0.035);
    }
    .folder-row:hover .chevron {
        transform: translateX(3px);
        color: #888;
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

    .folder-thumb {
        flex-shrink: 0;
        width: 62px;
    }
    .folder-body {
        position: relative;
        width: 62px;
        height: 46px;
    }

    .folder-tab {
        position: absolute;
        top: -7px;
        left: 0;
        width: 22px;
        height: 9px;
        background: #2e2e2e;
        border-radius: 3px 3px 0 0;
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-bottom: none;
    }

    .folder-face {
        position: absolute;
        inset: 0;
        background: linear-gradient(160deg, #333 0%, #1c1c1c 100%);
        border-radius: 2px 5px 5px 5px;
        border: 1px solid rgba(255, 255, 255, 0.07);
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            0 4px 12px rgba(0, 0, 0, 0.5);
    }

    /* design folder — purple tinted */
    .design-tab {
        background: #2d2040;
        border-color: rgba(167, 139, 250, 0.15);
    }

    .design-face {
        background: linear-gradient(
            160deg,
            #2d2040 0%,
            #1a1228 100%
        ) !important;
        border-color: rgba(167, 139, 250, 0.12) !important;
        box-shadow:
            inset 0 1px 0 rgba(167, 139, 250, 0.08),
            0 4px 12px rgba(0, 0, 0, 0.5) !important;
    }

    .folder-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
    }

    .folder-name-row {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .folder-name {
        font-size: 16px;
        font-weight: 500;
        color: #e0e0e0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .folder-desc {
        font-size: 13px;
        color: #555;
    }

    /* design badge */
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

    .folder-right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        flex-shrink: 0;
    }
    .count {
        font-size: 12px;
        color: #444;
    }
    .chevron {
        font-size: 22px;
        color: #3a3a3a;
        line-height: 1;
        transition:
            transform 0.2s ease,
            color 0.2s ease;
    }

    .divider {
        height: 1px;
        background: rgba(255, 255, 255, 0.04);
    }

    /* ── photo list ── */
    .photo-stack {
        display: flex;
        flex-direction: column;
        gap: 36px;
    }
    .photo-item {
        animation: fadeUp 0.3s ease both;
    }

    .photo-wrap {
        overflow: hidden;
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.05);
        cursor: zoom-in;
    }
    .photo-img {
        display: block;
        width: 100%;
        height: auto;
        object-fit: cover;
        background: #1e1e1e;
        transform: scale(1.001);
        transition:
            opacity 0.2s ease,
            transform 0.3s ease;
    }
    .photo-wrap:hover .photo-img {
        opacity: 0.8;
        transform: scale(1.01);
    }
    .photo-label {
        margin: 10px 0 0;
        font-size: 13px;
        color: #555;
        font-weight: 400;
    }

    /* ── photo grid ── */
    .photo-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
    }
    .grid-item {
        animation: fadeUp 0.3s ease both;
    }

    .grid-wrap {
        overflow: hidden;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.05);
        cursor: zoom-in;
        aspect-ratio: 1;
    }
    .grid-img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        background: #1e1e1e;
        transform: scale(1.001);
        transition:
            opacity 0.2s ease,
            transform 0.3s ease;
    }
    .grid-wrap:hover .grid-img {
        opacity: 0.75;
        transform: scale(1.04);
    }
    .grid-label {
        margin: 6px 0 0;
        font-size: 12px;
        color: #444;
    }

    /* ── magazine ── */
    .magazine-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 140px;
        gap: 6px;
    }
    .mag-item {
        animation: fadeUp 0.3s ease both;
    }
    .mag-tall {
        grid-row: span 2;
    }
    .mag-wide {
        grid-column: span 2;
    }

    .mag-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.05);
        cursor: zoom-in;
    }
    .mag-img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        background: #1e1e1e;
        transform: scale(1.001);
        transition:
            opacity 0.2s ease,
            transform 0.35s ease;
    }
    .mag-wrap:hover .mag-img {
        opacity: 0.6;
        transform: scale(1.04);
    }
    .mag-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: flex-end;
        padding: 10px;
        opacity: 0;
        transition: opacity 0.2s ease;
    }
    .mag-wrap:hover .mag-overlay {
        opacity: 1;
    }
    .mag-label {
        font-size: 11px;
        color: #ddd;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(6px);
        padding: 3px 8px;
        border-radius: 4px;
    }

    /* ── design view ── */
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
        gap: 10px;
    }

    .design-item {
        animation: fadeUp 0.3s ease both;
    }

    .design-wrap {
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        border: 1px solid rgba(167, 139, 250, 0.08);
        background: #1a1228;
        cursor: zoom-in;
        aspect-ratio: 4/3;
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
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.2s ease;
    }
    .design-wrap:hover .design-hover {
        opacity: 1;
    }

    .design-hover-label {
        font-size: 12px;
        color: #e0e0e0;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(8px);
        padding: 5px 12px;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.08);
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
        background: rgba(0, 0, 0, 0.92);
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
        .magazine-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 120px;
        }
        .mag-wide {
            grid-column: span 2;
        }
        .design-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
