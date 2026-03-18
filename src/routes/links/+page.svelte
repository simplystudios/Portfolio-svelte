<script>
    import { onMount } from "svelte";
    let mounted = false;

    const socials = [
        {
            name: "GitHub",
            handle: "@simplystudios",
            url: "https://github.com/simplystudios",
        },
        {
            name: "Twitter/X",
            handle: "@anshwadhwa8",
            url: "https://twitter.com/anshwadhwa8",
        },
        {
            name: "Peerlist",
            handle: "@anshwadhwa",
            url: "https://peerlist.io/anshwadhwa",
        },
    ];

    const interests = [
        { label: "Photography", note: "Street & travel" },
        { label: "Design", note: "UI, typography, systems" },
        { label: "Music", note: "All genres, all moods" },
        { label: "Movies", note: "Cinema nerd" },
        { label: "Linux", note: "Hyprland, ricing" },
        { label: "Building", note: "Apps, tools, whatever" },
    ];

    // Shows — TMDB poster URLs hardcoded (they're permanent)
    const shows = [
        {
            title: "Breaking Bad",
            year: "2008",
            poster: "https://image.tmdb.org/t/p/w300/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
        },
        {
            title: "Better Call Saul",
            year: "2015",
            poster: "https://resizing.flixster.com/4kbpQ0rJSLQOVZc9jlVttSWYjBU=/fit-in/352x330/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10492751_b_v13_al.jpg",
        },
        {
            title: "The Boys",
            year: "2019",
            poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYxan0RVMaKr1JxY2uZlvhPqhqU-KIGXbYpU_LW1HG3-f9-RpYQlOPok90hExi-L3cvRuE&s=10",
        },
        {
            title: "IT Welcome to Derry",
            year: "1999",
            poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD6yz3vSX7saZ4ChKjCrhXuYhCb4W9b-NMgLUV_ys5u8sE6d3Nz5py_ZhSwnBM_XYu5XAL&s=10",
        },
    ];

    // movies
    const movies = [
        {
            title: "500 Days of Summer",
            year: "2008",
            poster: "https://lumiere-a.akamaihd.net/v1/images/image_63f04f06.jpeg",
        },
        {
            title: "Udaan",
            year: "2015",
            poster: "https://resizing.flixster.com/z7dGZIvVgR1DCYMBRWXV2BP2Hto=/fit-in/352x330/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p135331_p_v10_aa.jpg",
        },
        {
            title: "The Social Network",
            year: "2010",
            poster: "https://m.media-amazon.com/images/M/MV5BMjlkNTE5ZTUtNGEwNy00MGVhLThmZjMtZjU1NDE5Zjk1NDZkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        },
        {
            title: "Fight Club",
            year: "1999",
            poster: "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_QL75_UX190_CR0,2,190,281_.jpg",
        },
        {
            title: "Rockstar",
            year: "2011",
            poster: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQMJVG9VNiLA0_FkCRYLY-mNYV8-ISc-V8weY-Otj5fU3wu0dM1",
        },
        {
            title: "Ted",
            year: "2011",
            poster: "https://m.media-amazon.com/images/M/MV5BMTQ1OTU0ODcxMV5BMl5BanBnXkFtZTcwOTMxNTUwOA@@._V1_QL75_UX190_CR0,10,190,281_.jpg",
        },
        {
            title: "Dune",
            year: "2011",
            poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt7xlJEzb-xopDqcQ6iw9SbY8PAlJN8H7DYUzTqmZkwLT9o8JXv6YWvDMGRKwkyRnf6RHzGg&s=10",
        },
        {
            title: "Yeh Jawani Hai Deewani",
            year: "2011",
            poster: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQhI92ZPIrEyAsuKs0MPVUnuhyH8boKCLcM1xtXKOP8gTNkEz5i",
        },
    ];

    // Artists to fetch from iTunes
    const artistNames = [
        "Tame Impala Currents",
        "Karan Aujila",
        "Chaar Diwari",
        "Anuv Jain",
    ];

    // albumArt[artistName] = { artworkUrl, albumName }
    let albumArt = {};
    let artLoading = true;

    async function fetchAlbumArt(artist) {
        try {
            const q = encodeURIComponent(artist);
            const res = await fetch(
                `https://itunes.apple.com/search?term=${q}&media=music&entity=album&limit=1`,
            );
            const data = await res.json();
            if (data.results?.length > 0) {
                const r = data.results[0];
                return {
                    artworkUrl: r.artworkUrl100.replace("100x100", "300x300"),
                    albumName: r.collectionName,
                    artistNamel: r.artistName,
                };
            }
        } catch (e) {
            console.error("iTunes fetch failed for", artist, e);
        }
        return null;
    }

    onMount(async () => {
        mounted = true;
        const results = await Promise.all(
            artistNames.map(async (name) => {
                const art = await fetchAlbumArt(name);
                return [name, art];
            }),
        );
        albumArt = Object.fromEntries(results.filter(([, v]) => v !== null));
        artLoading = false;
    });
</script>

<svelte:head>
    <title>Ansh Wadhwa — Links</title>
</svelte:head>

<div class="shell">
    <div class="content" class:visible={mounted}>
        <header class="page-header">
            <h1>Links</h1>
            <p class="subtitle">Where to find me, what I'm into.</p>
        </header>

        <!-- SOCIALS -->
        <section class="section">
            <p class="section-label">Socials</p>
            <div class="list">
                {#each socials as s, i}
                    <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="row link-row"
                        style="animation-delay: {i * 50}ms"
                    >
                        <div class="row-left">
                            <span class="row-name">{s.name}</span>
                            <span class="row-note">{s.handle}</span>
                        </div>
                        <span class="ext-arrow">↗</span>
                    </a>
                    {#if i < socials.length - 1}<div class="divider"></div>{/if}
                {/each}
            </div>
        </section>

        <section class="section">
            <p class="section-label">Movies I Like</p>
            <div class="cover-grid">
                {#each movies as show, i}
                    <div class="cover-card" style="animation-delay: {i * 60}ms">
                        <div class="cover-img-wrap">
                            <img
                                src={show.poster}
                                alt={show.title}
                                class="cover-img"
                                loading="lazy"
                            />
                        </div>
                        <p class="cover-title">{show.title}</p>
                        <p class="cover-sub">{show.year}</p>
                    </div>
                {/each}
            </div>
        </section>

        <hr style="color: rgba(255, 255, 255, 0.06);" />
        <br />
        <!-- NOW — WATCHING -->
        <section class="section">
            <p class="section-label">Tv Shows I Like</p>
            <div class="cover-grid">
                {#each shows as show, i}
                    <div class="cover-card" style="animation-delay: {i * 60}ms">
                        <div class="cover-img-wrap">
                            <img
                                src={show.poster}
                                alt={show.title}
                                class="cover-img"
                                loading="lazy"
                            />
                        </div>
                        <p class="cover-title">{show.title}</p>
                        <p class="cover-sub">{show.year}</p>
                    </div>
                {/each}
            </div>
        </section>

        <hr style="color: rgba(255, 255, 255, 0.06);" />
        <br />

        <!-- NOW — LISTENING -->
        <section class="section">
            <p class="section-label">Now listening</p>
            {#if artLoading}
                <div class="cover-grid">
                    {#each artistNames as _, i}
                        <div
                            class="cover-card skeleton-card"
                            style="animation-delay: {i * 60}ms"
                        >
                            <div class="cover-img-wrap skeleton"></div>
                            <div class="skeleton-line short"></div>
                            <div class="skeleton-line shorter"></div>
                        </div>
                    {/each}
                </div>
            {:else}
                <div class="cover-grid">
                    {#each artistNames as artist, i}
                        <div
                            class="cover-card"
                            style="animation-delay: {i * 60}ms"
                        >
                            {#if albumArt[artist]}
                                <div class="cover-img-wrap album">
                                    <img
                                        src={albumArt[artist].artworkUrl}
                                        alt={artist}
                                        class="cover-img"
                                        loading="lazy"
                                    />
                                </div>
                                <p class="cover-title">{artist}</p>
                                <p class="cover-sub">
                                    {albumArt[artist].albumName}
                                </p>
                            {:else}
                                <div class="cover-img-wrap no-art">
                                    <span class="no-art-emoji">🎵</span>
                                </div>
                                <p class="cover-title">
                                    {albumArt[artist].artistNamel}
                                </p>
                            {/if}
                        </div>
                    {/each}
                </div>
            {/if}
        </section>

        <!-- INTERESTS -->
        <section class="section">
            <p class="section-label">Interests</p>
            <div class="list">
                {#each interests as item, i}
                    <div class="row" style="animation-delay: {i * 50}ms">
                        <span class="row-name">{item.label}</span>
                        <span class="row-note">{item.note}</span>
                    </div>
                    {#if i < interests.length - 1}<div
                            class="divider"
                        ></div>{/if}
                {/each}
            </div>
        </section>
    </div>

    <footer class="footer">
        <p>Ansh Wadhwa © 2026</p>
    </footer>
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
        opacity: 0;
        transform: translateY(8px);
        transition:
            opacity 0.35s ease,
            transform 0.35s ease;
    }
    .content.visible {
        opacity: 1;
        transform: none;
    }

    .page-header {
        margin-bottom: 56px;
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

    .section {
        margin-bottom: 48px;
    }

    .section-label {
        font-size: 11px;
        font-weight: 500;
        color: #444;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin: 0 0 14px;
    }

    /* list rows */
    .list {
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 12px;
        overflow: hidden;
    }

    .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 14px 16px;
        animation: fadeUp 0.3s ease both;
    }

    @keyframes fadeUp {
        from {
            opacity: 0;
            transform: translateY(5px);
        }
        to {
            opacity: 1;
            transform: none;
        }
    }

    .row-left {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }
    .row-name {
        font-size: 15px;
        font-weight: 500;
        color: #e0e0e0;
    }
    .row-note {
        font-size: 13px;
        color: #555;
    }

    a.link-row {
        text-decoration: none;
        transition: background 0.15s ease;
    }
    a.link-row:hover {
        background: rgba(255, 255, 255, 0.03);
    }
    a.link-row:hover .ext-arrow {
        color: #aaa;
        transform: translate(1px, -1px);
    }

    .ext-arrow {
        font-size: 14px;
        color: #3a3a3a;
        flex-shrink: 0;
        transition:
            color 0.15s,
            transform 0.15s;
    }

    .divider {
        height: 1px;
        background: rgba(255, 255, 255, 0.05);
        margin: 0 16px;
    }

    /* cover grid */
    .cover-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        gap: 16px;
    }

    .cover-card {
        display: flex;
        flex-direction: column;
        gap: 7px;
        animation: fadeUp 0.3s ease both;
    }

    .cover-img-wrap {
        width: 100%;
        aspect-ratio: 2/3; /* poster ratio for shows */
        border-radius: 10px;
        overflow: hidden;
        background: #222;
        border: 1px solid rgba(255, 255, 255, 0.06);
    }

    /* album art is square */
    .cover-img-wrap.album {
        aspect-ratio: 1;
        border-radius: 8px;
    }

    .cover-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition:
            opacity 0.2s ease,
            transform 0.3s ease;
        transform: scale(1.001);
    }
    .cover-card:hover .cover-img {
        opacity: 0.8;
        transform: scale(1.03);
    }

    .cover-title {
        font-size: 13px;
        font-weight: 500;
        color: #ccc;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .cover-sub {
        font-size: 12px;
        color: #555;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* no art fallback */
    .no-art {
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1 !important;
    }
    .no-art-emoji {
        font-size: 28px;
    }

    /* skeleton loading */
    .skeleton-card {
        pointer-events: none;
    }

    .skeleton {
        background: linear-gradient(90deg, #222 25%, #2a2a2a 50%, #222 75%);
        background-size: 200% 100%;
        animation: shimmer 1.4s infinite;
    }

    @keyframes shimmer {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }

    .skeleton-line {
        height: 10px;
        border-radius: 4px;
        background: linear-gradient(90deg, #222 25%, #2a2a2a 50%, #222 75%);
        background-size: 200% 100%;
        animation: shimmer 1.4s infinite;
    }
    .skeleton-line.short {
        width: 80%;
    }
    .skeleton-line.shorter {
        width: 55%;
    }

    /* footer */
    .footer {
        max-width: 600px;
        width: 100%;
        margin: 80px auto 0;
        padding-top: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.04);
    }
    .footer p {
        font-size: 13px;
        color: #444;
        margin: 0;
    }

    @media (max-width: 400px) {
        .cover-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>
