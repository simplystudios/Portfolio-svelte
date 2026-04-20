<script>
    import { page } from "$app/stores";

    const tabs = [
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: "Photography", path: "/photography" },
        { name: "Links", path: "/links" },
    ];

    let isOpen = false;

    $: activeTabName =
        tabs.find((t) => t.path === $page.url.pathname)?.name || "Menu";
</script>

<div class="nav-wrapper">
    <nav class="mainbar" class:expanded={isOpen}>
        <button
            class="mobile-toggle"
            on:click={() => (isOpen = !isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
        >
            <span class="active-name">{activeTabName}</span>
            <svg
                class="chevron"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d="m6 9 6 6 6-6" />
            </svg>
        </button>

        <div class="nav-links-wrapper">
            <div class="nav-links">
                {#each tabs as tab}
                    <a
                        href={tab.path}
                        class="nav-item"
                        class:active={$page.url.pathname === tab.path}
                        on:click={() => (isOpen = false)}
                    >
                        {tab.name}
                    </a>
                {/each}
            </div>
        </div>
    </nav>
</div>

<style>
    /* ==========================================
       POSITIONING & BASE
       ========================================== */
    .nav-wrapper {
        position: fixed;
        bottom: 2.5rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
    }

    a {
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
    }

    /* ==========================================
       MAIN PILL (GLASSMORPHISM)
       ========================================== */
    .mainbar {
        display: flex;
        flex-direction: row;
        background: rgba(15, 15, 15, 0.65);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        /* Subtle inner border for premium feel */
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 100px;
        padding: 6px;
        box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        transition:
            border-radius 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            background 0.4s ease;
    }

    /* ==========================================
       DESKTOP LAYOUT (Default)
       ========================================== */
    .nav-links-wrapper {
        display: block;
    }

    .nav-links {
        display: flex;
        flex-direction: row;
        gap: 4px;
    }

    .mobile-toggle {
        display: none;
    }

    .nav-item {
        background: transparent;
        border: none;
        color: #888888;
        font-family: inherit;
        font-size: 14px;
        font-weight: 500;
        padding: 10px 24px;
        border-radius: 100px;
        cursor: pointer;
        transition:
            color 0.3s ease,
            background 0.3s ease;
        text-align: center;
        letter-spacing: 0.2px;
    }

    .nav-item:hover:not(.active) {
        color: #e0e0e0;
        background: rgba(255, 255, 255, 0.03);
    }

    /* Minimalist active state: sharp contrast instead of muddy grays */
    .nav-item.active {
        background: rgba(255, 255, 255, 0.1);
        color: #ffffff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    /* ==========================================
       MOBILE RESPONSIVENESS
       ========================================== */
    @media only screen and (max-width: 768px) {
        .mainbar {
            flex-direction: column;
            min-width: 220px;
            /* Less rounded corners when expanded to look like a menu panel */
            border-radius: 28px;
        }

        .mainbar.expanded {
            background: rgba(20, 20, 20, 0.85);
            border-radius: 24px;
        }

        /* --- The Mobile Toggle --- */
        .mobile-toggle {
            display: flex;
            background: transparent;
            border: none;
            color: #ffffff;
            font-family: inherit;
            font-size: 15px;
            font-weight: 500;
            padding: 12px 20px;
            cursor: pointer;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            border-radius: 20px;
            transition: background 0.3s ease;
        }

        .mainbar.expanded .mobile-toggle {
            background: rgba(255, 255, 255, 0.05);
            margin-bottom: 8px; /* Adds space before links appear */
        }

        .chevron {
            color: #888;
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mainbar.expanded .chevron {
            transform: rotate(-180deg);
        }

        /* --- Smooth Height Animation via CSS Grid --- */
        .nav-links-wrapper {
            display: grid;
            grid-template-rows: 0fr; /* Collapsed state */
            transition: grid-template-rows 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mainbar.expanded .nav-links-wrapper {
            grid-template-rows: 1fr; /* Expanded state */
        }

        .nav-links {
            overflow: hidden; /* Crucial for the grid height trick */
            display: flex;
            flex-direction: column;
            gap: 4px;
            opacity: 0; /* Fade out when closed */
            transition: opacity 0.3s ease;
        }

        .mainbar.expanded .nav-links {
            opacity: 1; /* Fade in when open */
        }

        .nav-item {
            width: 100%;
            border-radius: 16px; /* Slightly squarer inner buttons on mobile */
            padding: 12px 24px;
        }
    }
</style>
