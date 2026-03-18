<script>
    import { page } from "$app/stores";

    const tabs = [
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: "Photography", path: "/photography" },
        { name: "Links", path: "/links" },
    ];

    // Menu state track karne ke liye
    let isOpen = false;

    // Mobile button par current page ka naam dikhane ke liye
    $: activeTabName =
        tabs.find((t) => t.path === $page.url.pathname)?.name || "Menu";
</script>

<div class="nav-wrapper">
    <nav class="mainbar {isOpen ? 'expanded' : ''}">
        <button class="mobile-toggle" on:click={() => (isOpen = !isOpen)}>
            {activeTabName}
            <span class="chevron">{isOpen ? "▲" : "▼"}</span>
        </button>

        <div class="nav-links">
            {#each tabs as tab}
                <a
                    href={tab.path}
                    class="nav-item {$page.url.pathname === tab.path
                        ? 'active'
                        : ''}"
                    on:click={() => (isOpen = false)}
                >
                    {tab.name}
                </a>
            {/each}
        </div>
    </nav>
</div>

<style>
    /* Wrapper remains the same */
    .nav-wrapper {
        position: fixed;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
    }

    a {
        text-decoration: none;
    }

    /* Outer Pill */
    .mainbar {
        display: flex;
        flex-direction: row; /* Default layout for desktop */
        background: rgba(23, 23, 23, 0.7);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 32px; /* Slightly adjusted to accommodate vertical expansion nicely */
        padding: 6px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden; /* Keeps the glass effect contained */
    }

    /* Container for the links */
    .nav-links {
        display: flex;
        flex-direction: row;
        gap: 4px;
    }

    /* Mobile trigger button - Hidden on desktop */
    .mobile-toggle {
        display: none;
        background: transparent;
        border: none;
        color: #ffffff;
        font-family: inherit;
        font-size: 15px;
        font-weight: 500;
        padding: 10px 24px;
        cursor: pointer;
        width: 100%;
        justify-content: space-between;
        align-items: center;
    }

    .chevron {
        font-size: 10px;
        margin-left: 8px;
        color: #888;
    }

    .nav-item {
        background: transparent;
        border: none;
        color: #888888;
        font-family: inherit;
        font-size: 15px;
        font-weight: 500;
        padding: 10px 24px;
        border-radius: 999px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        text-align: center; /* Centers text if stacked */
    }

    .nav-item:hover:not(.active) {
        color: #cccccc;
    }

    .nav-item.active {
        background: #333333;
        color: #ffffff;
    }

    /* ==========================================
       MOBILE RESPONSIVENESS (The Magic Happens Here)
       ========================================== */
    @media only screen and (max-width: 768px) {
        .mainbar {
            flex-direction: column; /* Stack items vertically */
            min-width: 200px; /* Gives the expanded menu a nice width */
        }

        .mobile-toggle {
            display: flex; /* Show the trigger button */
        }

        .nav-links {
            display: none; /* Hide links by default */
            flex-direction: column; /* Stack them */
            gap: 4px;
            margin-top: 4px; /* Space between toggle and links */
        }

        /* When 'expanded' class is active (isOpen is true) */
        .mainbar.expanded .nav-links {
            display: flex; /* Reveal the links */
        }

        .mainbar.expanded .mobile-toggle {
            background: rgba(
                255,
                255,
                255,
                0.05
            ); /* Slight highlight on the active toggle */
            border-radius: 20px;
        }

        .nav-item {
            width: 100%; /* Make buttons stretch full width of the menu */
            border-radius: 20px;
        }
    }
</style>
