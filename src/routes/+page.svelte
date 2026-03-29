<script>
    // import Navbar from "$lib/./Navbar.svelte";
</script>

<div class="main">
    <!-- <div class="pfpc">
        <img class="pfp" src="./imgs/pfpmainfs.jpeg" alt="Ansh Wadhwa" />
    </div> -->
    <div class="profile">
        <h1 class="bodyhead">Ansh Wadhwa</h1>
        <p class="bodytxt">
            Student, Developer, and a bit of UI/UX Designer Love Making New
            Things. Currently developing <strong>Detro</strong>, A Material 3
            transit app for the Delhi Metro.
        </p>
        <p class="bodytext"></p>
    </div>
</div>

<style>
    /* 1. Global Reset to fix scroll and padding issues */
    :global(*) {
        box-sizing: border-box;
    }

    :global(html) {
        scroll-behavior: smooth;
    }

    :global(body) {
        background-color: #171717;
        margin: 0;
        padding: 0;
        font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    /* 2. The Main Wrapper */
    .main {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 60px; /* The perfect space between image and text */
        max-width: 900px; /* Stops the layout from stretching too wide */
        margin: 0 auto; /* Centers the whole block horizontally */
        min-height: 100vh; /* Centers the block vertically on the screen */
        padding: 40px 24px; /* Breathing room for smaller screens */
    }

    /* 3. Profile Picture Section */
    .pfpc {
        flex-shrink: 0; /* Prevents the image from getting squished by the text */
    }

    .pfp {
        width: 280px;
        height: 280px;
        object-fit: cover; /* Ensures image doesn't stretch weirdly */
        border-radius: 32px; /* Soft Apple-style curves */
    }

    /* 4. Text Profile Section */
    .profile {
        max-width: 500px; /* Keeps text readable and not too long */
        color: #a1a1a1;
    }

    .bodyhead {
        font-size: 40px;
        color: #ffffff;
        line-height: 1.1;
        margin-top: 0;
        margin-bottom: 24px;
        font-weight: 500;
    }

    .bodytxt {
        font-size: 20px; /* Slightly reduced from 24px for better readability */
        line-height: 1.6;
        color: #888888;
        margin-bottom: 20px;
    }

    strong {
        color: #dfdfdf;
        font-weight: 500;
    }

    /* 5. Mobile Responsiveness */
    /* 5. Mobile Responsiveness */
    @media only screen and (max-width: 768px) {
        .main {
            /* 1. Linear gradient acts as the dark filter OVER the image */
            background-image:
                linear-gradient(rgba(23, 23, 23, 0.87), rgba(23, 23, 23, 0.95)),
                url("/imgs/npfpm.jpg");

            /* 2. 'cover' scales the image to fill the entire container without stretching */
            background-size: cover;
            background-position: center;
            background-attachment: scroll; /* Ensures it stays pinned while scrolling */
            align-items: center; /* vertically center the text */
            justify-content: center;
            min-height: 100svh; /* use svh so mobile browser chrome doesn't interfere */
            padding: 40px 28px 100px; /* bottom padding clears the nav pill */
        }

        .bodyhead {
            font-size: 38px;
            text-shadow: none; /* not needed with a dark enough overlay */
        }

        .bodytxt {
            font-size: 18px;
            text-shadow: none;
        }
    }
</style>
