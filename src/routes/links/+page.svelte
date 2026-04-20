<script>
    import { onMount } from "svelte";

    const LASTFM_API_KEY = "3698b5021e209cb9eec8fdf8666eda66";

    const LASTFM_USER = "punchoneman";

    let articles = [];
    let articlesLoading = true;
    let recentTracks = [];
    let userd = {};
    let userimg;
    let tracksLoading = true;

    function extractThumbnail(content) {
        const match = content.match(/<img[^>]+src="([^">]+)"/);
        return match ? match[1] : null;
    }

    async function fetchMedium() {
        try {
            const res = await fetch(
                "https://api.rss2json.com/v1/api.json?rss_url=https://anshwadhwa8.medium.com/feed",
            );
            const data = await res.json();
            if (data.status === "ok") {
                articles = data.items.slice(0, 6).map((item) => ({
                    title: item.title,
                    url: item.link,
                    tag: item.categories?.[0] ?? "Article",
                    thumbnail: item.thumbnail || extractThumbnail(item.content),
                    read: `${Math.ceil(item.content.replace(/<[^>]+>/g, "").split(" ").length / 200)} min read`,
                }));
            }
        } catch (e) {
            console.error("Medium RSS fetch failed", e);
        } finally {
            articlesLoading = false;
        }
    }

    onMount(async () => {
        fetchMedium();
        try {
            const temp = await fetch(
                `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json`,
            );
            const data = await temp.json();
            userd = data.user;

            console.log(userd);
            userimg = data.user.image[2]["#text"];
            console.log(userimg);
        } catch (e) {
            console.error("Last.fm fetch failed", e);
        } finally {
            tracksLoading = false;
        }
    });

    const socials = [
        {
            name: "GitHub",
            handle: "@simplystudios",
            img: "/githubicon.png",
            size: 20,
            url: "https://github.com/simplystudios",
        },
        {
            name: "Twitter / X",
            handle: "@anshwadhwa8",
            img: "/tweetbird.png",
            size: 15,
            url: "https://twitter.com/anshwadhwa8",
        },
        {
            name: "Peerlist",
            handle: "@anshwadhwa",
            img: "/peerlisticon.png",
            size: 24,
            url: "https://peerlist.io/anshwadhwa",
        },
    ];

    const interests = [
        { label: "Photography", note: "street & travel" },
        { label: "Design", note: "UI, type, systems" },
        { label: "Music", note: "all genres" },
        { label: "Cinema", note: "film nerd" },
        { label: "Linux", note: "Hyprland, ricing" },
        { label: "Building", note: "apps & tools" },
    ];
</script>

<svelte:head>
    <title>Ansh Wadhwa — Links</title>
</svelte:head>

<div class="page">
    <header class="page-header">
        <h1>Links</h1>
        <p>Where to find me, what I'm into.</p>
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
                    class="row"
                >
                    <div class="row-left-img">
                        {#if s.img}
                            <img height={s.size} src={s.img} alt={s.name} />
                        {:else}
                            <span class="row-avatar">{s.name[0]}</span>
                        {/if}
                    </div>

                    <div class="row-left">
                        <span class="row-name">{s.name}</span>
                        <span class="row-note">{s.handle}</span>
                    </div>
                    <span class="row-arrow">↗</span>
                </a>
                {#if i < socials.length - 1}<div class="divider"></div>{/if}
            {/each}
        </div>
    </section>

    <!-- WRITING -->
    <section class="section">
        <p class="section-label">Writing</p>
        {#if articlesLoading}
            <div class="h-scroll">
                {#each Array(4) as _}
                    <div class="article-card skeleton-card">
                        <div class="article-card-thumb skeleton"></div>
                        <div class="article-card-body">
                            <div
                                class="skeleton-line"
                                style="width:80%; height:13px; margin-bottom:6px;"
                            ></div>
                            <div
                                class="skeleton-line"
                                style="width:50%; height:11px;"
                            ></div>
                        </div>
                    </div>
                {/each}
            </div>
        {:else if articles.length === 0}
            <p class="empty-note">No articles found.</p>
        {:else}
            <div class="h-scroll">
                {#each articles as a}
                    <a
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="article-card"
                    >
                        <div class="article-card-thumb">
                            {#if a.thumbnail}
                                <img
                                    src={a.thumbnail}
                                    alt={a.title}
                                    class="thumb-img"
                                />
                            {:else}
                                <div class="thumb-placeholder"></div>
                            {/if}
                        </div>
                        <div class="article-card-body">
                            <p class="article-card-title">{a.title}</p>
                            <div class="article-meta">
                                <span>{a.read}</span>
                                <span class="article-dot"></span>
                                <span class="article-tag">{a.tag}</span>
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        {/if}
    </section>

    <!-- FILM & TV -->
    <section class="section">
        <p class="section-label">Film & TV</p>
        <div class="service-grid">
            <a
                href="https://letterboxd.com/anshwadhwa"
                target="_blank"
                rel="noopener noreferrer"
                class="service-card"
            >
                <div class="service-info">
                    <div class="service-icon" style="background:#14181c;">
                        <!-- Letterboxd wordmark-style icon -->
                        <img
                            src="https://a.ltrbxd.com/logos/letterboxd-mac-icon.png"
                            alt=""
                            width="30"
                        />
                    </div>
                    <div class="service-text">
                        <p class="name">Letterboxd</p>
                        <p class="sub">Movies I've watched</p>
                    </div>
                </div>
                <span class="row-arrow">↗</span>
            </a>
        </div>
    </section>

    <!-- MUSIC -->
    <section class="section">
        <p class="section-label">Music</p>
        <div class="service-grid" style="margin-bottom:10px;">
            <a
                href="https://www.last.fm/user/{LASTFM_USER}"
                target="_blank"
                rel="noopener noreferrer"
                class="service-card"
            >
                <div class="service-info">
                    <div class="service-icon" style="background:#1a0000;">
                        <!-- Last.fm logo -->
                        <img
                            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fuxwing.com%2Fwp-content%2Fthemes%2Fuxwing%2Fdownload%2Fbrands-and-social-media%2Flast-fm-logo-icon.png&f=1&nofb=1&ipt=196aee540c7864e101b49a122f45c26ec2fa42392835eab4c5f543123b410ccb"
                            alt=""
                            width="22"
                        />
                    </div>
                    <div class="service-text">
                        <p class="name">Last.fm</p>
                        <p class="sub">@{LASTFM_USER}</p>
                    </div>
                </div>
                <span class="row-arrow">↗</span>
            </a>
        </div>

        <section class="section">
            <div class="service-grid" style="margin-bottom:10px;">
                <div class="service-card">
                    <div class="service-info">
                        <div style="">
                            <!-- Last.fm logo -->
                            <img
                                class="card-icon"
                                src={userimg}
                                alt=""
                                width="100"
                            />
                        </div>
                        <div class="service-text">
                            <p class="name">{userd.realname}</p>

                            <p style="margin-top: 5px;" class="sub">
                                {userd.playcount} scrobbles
                            </p>
                            <p class="sub">
                                {userd.track_count} tracks
                            </p>

                            <p class="sub">{userd.artist_count} artists</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Top artists -->
        {#if tracksLoading}
            <div class="list">
                {#each Array(5) as _, i}
                    <div class="track-row">
                        <div class="track-thumb skeleton"></div>
                        <div class="track-body">
                            <div
                                class="skeleton-line"
                                style="width:55%; height:13px; margin-bottom:6px;"
                            ></div>
                            <div
                                class="skeleton-line"
                                style="width:35%; height:11px;"
                            ></div>
                        </div>
                    </div>
                    {#if i < 4}<div class="divider"></div>{/if}
                {/each}
            </div>
        {:else if recentTracks.length === 0}
            <p class="empty-note">No data found.</p>
        {:else}
            <div class="list">
                {#each recentTracks as artist, i}
                    <a
                        href={artist.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="track-row"
                    >
                        <div class="track-thumb">
                            {#if artist.image}
                                <img
                                    src={artist.image}
                                    alt={artist.name}
                                    class="thumb-img"
                                    width="20"
                                />
                            {:else}
                                <div class="thumb-placeholder"></div>
                            {/if}
                        </div>
                        <div class="track-body">
                            <p class="track-name">{artist.name}</p>
                            <p class="track-sub">
                                {Number(artist.playcount).toLocaleString()} scrobbles
                            </p>
                        </div>
                        <span class="row-arrow">↗</span>
                    </a>
                    {#if i < recentTracks.length - 1}<div
                            class="divider"
                        ></div>{/if}
                {/each}
            </div>
        {/if}
    </section>

    <!-- INTERESTS -->
    <section class="section">
        <p class="section-label">Interests</p>
        <div class="interests-wrap">
            {#each interests as item}
                <span class="interest-pill">
                    {item.label}
                    <span class="interest-note">· {item.note}</span>
                </span>
            {/each}
        </div>
    </section>

    <hr class="footer-line" />
    <p class="footer-text">Ansh Wadhwa © 2026</p>
</div>

<style>
    :global(body) {
        background-color: #171717;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
    }

    .page {
        max-width: 600px;
        margin: 0 auto;
        padding: 56px 20px 80px;
        font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        -webkit-font-smoothing: antialiased;
    }

    .page-header {
        margin-bottom: 52px;
    }
    .page-header h1 {
        font-size: 26px;
        font-weight: 500;
        color: #fff;
        margin: 0 0 6px;
        letter-spacing: -0.3px;
    }
    .page-header p {
        font-size: 14px;
        color: #555;
        margin: 0;
    }

    .section {
        margin-bottom: 44px;
    }
    .section-label {
        font-size: 11px;
        font-weight: 500;
        color: #444;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin: 0 0 12px;
    }

    .empty-note {
        font-size: 13px;
        color: #555;
        margin: 0;
    }

    /* Shared list */
    .list {
        border: 0.5px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        overflow: hidden;
    }

    .row {
        display: flex;
        align-items: center;
        padding: 13px 16px;
        text-decoration: none;
        transition: background 0.12s ease;
    }
    .row:hover {
        background: rgba(255, 255, 255, 0.03);
    }
    .row-left {
        display: flex;
        flex-direction: column;
        gap: 2px;
        flex: 1; /* ADD THIS */
    }
    .row-left-img {
        display: flex;
        color: lightgray;
        width: 24px; /* fixed width so icons don't shift layout */
        margin-right: 12px;
        align-items: center;
        justify-content: center;
        flex-shrink: 0; /* prevent it from squishing */
    }
    .row-left-img img {
        opacity: 0.85;
        filter: grayscale(20%);
    }
    .row-name {
        font-size: 14px;
        font-weight: 500;
        color: #e0e0e0;
    }
    .row-note {
        font-size: 13px;
        color: #555;
    }
    .row-arrow {
        font-size: 13px;
        color: #444;
        flex-shrink: 0;
    }

    .divider {
        height: 0.5px;
        background: rgba(255, 255, 255, 0.05);
        margin: 0 16px;
    }

    /* Horizontal scroll strip for articles */
    .h-scroll {
        display: flex;
        gap: 12px;
        overflow-x: auto;
        padding-bottom: 8px;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
    }
    .h-scroll::-webkit-scrollbar {
        height: 3px;
    }
    .h-scroll::-webkit-scrollbar-track {
        background: transparent;
    }
    .h-scroll::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.08);
        border-radius: 999px;
    }

    .article-card {
        flex-shrink: 0;
        width: 240px;
        scroll-snap-align: start;
        border: 0.5px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        overflow: hidden;
        text-decoration: none;
        background: #1a1a1a;
        transition: background 0.12s ease;
        display: flex;
        flex-direction: column;
    }
    .article-card:hover {
        background: #202020;
    }

    .article-card-thumb {
        width: 100%;
        height: 120px;
        overflow: hidden;
        background: #222;
        flex-shrink: 0;
    }
    .article-card-body {
        padding: 10px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        flex: 1;
    }
    .article-card-title {
        font-size: 13px;
        font-weight: 500;
        color: #e0e0e0;
        margin: 0;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .skeleton-card {
        pointer-events: none;
    }

    /* Track rows */
    .track-row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        text-decoration: none;
        transition: background 0.12s ease;
    }
    .track-row:hover {
        background: rgba(255, 255, 255, 0.03);
    }
    .track-thumb {
        width: 40px;
        height: 40px;
        border-radius: 6px;
        overflow: hidden;
        flex-shrink: 0;
        background: #222;
        border: 0.5px solid rgba(255, 255, 255, 0.06);
    }
    .track-body {
        flex: 1;
        min-width: 0;
    }
    .track-name {
        font-size: 14px;
        font-weight: 500;
        color: #e0e0e0;
        margin: 0 0 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .track-sub {
        font-size: 12px;
        color: #555;
        margin: 0;
    }

    /* Shared thumb */
    .thumb-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: opacity 0.2s ease;
    }
    .article-card:hover .thumb-img,
    .track-row:hover .thumb-img {
        opacity: 0.8;
    }
    .thumb-placeholder {
        width: 100%;
        height: 100%;
        background: #222;
    }

    /* Article meta */
    .article-meta {
        font-size: 11px;
        color: #555;
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
    }
    .article-dot {
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: #444;
        flex-shrink: 0;
    }
    .article-tag {
        font-size: 11px;
        font-weight: 500;
        padding: 2px 7px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.05);
        color: #888;
        border: 0.5px solid rgba(255, 255, 255, 0.08);
    }

    /* Service cards */
    .service-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 10px;
    }
    .service-card {
        background: #1a1a1a;
        border: 0.5px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-decoration: none;
        transition: background 0.12s ease;
    }
    .service-card:hover {
        background: #202020;
    }
    .service-info {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .service-icon {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        border: 0.5px solid rgba(255, 255, 255, 0.06);
    }
    .card-icon {
        padding: 8px;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    .service-text .name {
        font-size: 14px;
        font-weight: 500;
        color: #e0e0e0;
        margin: 0 0 2px;
    }
    .service-text .sub {
        font-size: 13px;
        color: #555;
        margin: 0;
    }

    /* Skeleton */
    .skeleton,
    .skeleton-line {
        border-radius: 4px;
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

    /* Interests */
    .interests-wrap {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    .interest-pill {
        font-size: 13px;
        color: #aaa;
        padding: 6px 14px;
        border-radius: 999px;
        border: 0.5px solid rgba(255, 255, 255, 0.08);
        background: #1a1a1a;
        display: flex;
        align-items: center;
        gap: 4px;
    }
    .interest-note {
        font-size: 12px;
        color: #555;
    }

    .footer-line {
        border: none;
        border-top: 0.5px solid rgba(255, 255, 255, 0.05);
        margin: 56px 0 24px;
    }
    .footer-text {
        font-size: 13px;
        color: #444;
        margin: 0;
    }

    @media (max-width: 480px) {
        .service-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
