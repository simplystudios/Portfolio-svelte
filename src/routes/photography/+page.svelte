<script>

const data = [
    {
        name: "Streets of Jaisalmer - 2024",
        image: "/photography/rajisthan/jaisalmer/IMG_20241218_163906219.jpg",
        link: "/photography/jaisalmer/"
    },
    {
        name: "Thar Desert - 2024",
        image: "/photography/rajisthan/thardesert/IMG_20241217_160532759.jpg",
        link: "/photography/thar/"
    },
    {
        name: "Sand Dunes - 2024",
        image: "/photography/rajisthan/thardesert/IMG_20241217_160722025.jpg",
        link: "/photography/thar/"
    },
    {
        name: "Sand Dunes 2 - 2024",
        image: "/photography/rajisthan/thardesert/IMG_20241217_173404741.jpg",
        link: "/photography/thar/"
    },
    {
        name: "Sand Dunes 3 - 2024",
        image: "/photography/rajisthan/thardesert/IMG_20241218_073142552.jpg",
        link: "/photography/thar/"
    },
    {
        name: "Road in Dunes 4 - 2024",
        image: "/photography/rajisthan/thardesert/IMG_20241218_100208179.jpg",
        link: "/photography/thar/"
    },
     {
        name: "Sand Dunes 5 - 2024",
        image: "/photography/rajisthan/thardesert/IMG_20241218_101302218.jpg",
        link: "/photography/thar/"
    },
]

</script>
<!-- <svelte:head>
    <script src="https://static.elfsight.com/platform/platform.js" async></script>
</svelte:head> -->
<div>
    <button style="" on:click={() => window.history.back()}>
        Take Me Back
    </button>
</div>

<title>Photography</title>
<div class="main">
    <div class="head">
        <h1 class="heading">Photography</h1>
    <div class="center">
        <p>Collection of all my adventures in one Place</p>
    </div>
    <br>
    </div>
    {#each data as d}
        <div style="margin-top: 20px; width:80% ;margin-left: auto; margin-right: auto;">
            <hr>
         <div>
            <p style="text-align: center;">
                <img src={d.image} alt="" width="100%" height="40%">
            </p>
            <h3 style="padding:0px; margin:0px;">{d.name}</h3>
         </div>
    </div>
    {/each}
</div>
<style>
     
    :global(body){
        background-color:whitesmoke;
        color: #333;
    }
    .main{
        margin-top: 40px;
    }
    .center{
        text-align: center;
    }
    .heading{
        text-align: center;
        font-size: 80px;
        font-weight: bolder;
    }
    .head{
        margin-bottom: 20px;
    }
    .dark-mode {
        background-color: #333;
        color: #f3f3ed;
    }
    button{
    background-color: transparent;
    border: 0;
    font-size: 15px;
    text-decoration: underline;
    font-family: Recoleta;
    font-weight: 1000;
}
button:hover{
    cursor: pointer;
}
</style>