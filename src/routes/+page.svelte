<script>
import Title from '$lib/title.svelte'
import Card from '$lib/Card.svelte'
import CardTitle from '$lib/CardTitle.svelte'
import { ModeWatcher, setMode, mode } from "mode-watcher";
import CardImg from '$lib/CardImg.svelte'
import CardDesc from '$lib/CardTitle.svelte'
import CardButton from '$lib/CardButton.svelte'
  import { onMount } from 'svelte';

    export let disabled = 'false';
    let isDarkMode;

$: isDarkMode = $mode === 'dark';

    // onMount(async() =>{
    //     if ($mode === "light") {
    //      document.querySelector('body').style = "background-color:#fafafa;";
    //     color = "gray";
    //     document.documentElement.style.setProperty('--border-color', '#edeceb');
    // } else {
    //     color = "#cfd0d4";
    //     document.querySelector('body').style = "background-color:#171717;";
    //     document.documentElement.style.setProperty('--border-color', 'rgb(32, 31, 31)');

    // }
    // })

    function scrollIntoView(id) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    }

    const intro = "'Compiling dreams into reality with lines of code' - 2023"
    let title = "/imgs/awbb.png";
// async function getdata() {
//     const url = 'https://api.lanyard.rest/v1/users/600278222428438559';

//     try {
//         const resp = await fetch(url);
//         const res = await resp.json(); // Await the JSON parsing
        
//         const d = res['data'];
//         const statusb = d.discord_status;
//         un.innerText = `@${d.discord_user.username}`;
//         statust.innerText = d.discord_status;

//         if(statusb == 'dnd'){
//             ball.style.background = '#f33f43';
//         }
//         else if (statusb == 'online'){
//             ball.style.background = '#22a558';
//         }
//         else if (statusb == 'idle'){
//             ball.style.background = '#f0b132'
//         }
//         else{
//             ball.style.background = 'grey'
//         }
//         // Update the DOM element with the value

//     } catch (error) {
//         console.error("An error occurred:", error);
//     }
// }
// getdata();

</script>
<Title/>
<div class="main">
<div class="mainp">
<div class="title">
    <br>
    <br>
    <div class="bd">
        <img id="pic" class="img" src="https://anshwadhwa.vercel.app/images/mypfp.jpg" alt="" width="280px" height="280px">
        <div class="details">
            <div class="statusdiv">
                <!-- <div id="ball" class="ball">
                    </div> -->
                     <h1 style="font-size: auto;">Ansh Wadhwa</h1>
                </div>
            <div>
            <h2 id="un">Student, Developer in Delhi India</h2> 
           <a href="https://wakatime.com/@f983c5d0-c6d8-471e-a499-43763ad1d6b4" target="_blank"><img src="https://wakatime.com/badge/user/f983c5d0-c6d8-471e-a499-43763ad1d6b4.svg?style=for-the-badge" alt="Total time coded since Sep 28 2021"></a>
            <!-- <div class="sdiv">
                <a href="https://github.com/simplystudios" target="_blank" rel="noopener noreferrer"><img class="sicon" src="/github.png" alt="github" /></a>
                <a href="https://twitter.com/anshwadhwa8" target="_blank" rel="noopener noreferrer"><img class="sicon" src="/x.png" alt="twtter/X.com" /></a>
                <a href="https://instagram.com/anshwadhwa8" target="_blank" rel="noopener noreferrer"><img class="sicon" src="/instagram.png" alt="instagram.com" width="24px"></a>
            </div>  -->
            </div>
        </div>
    </div>
</div>


<!-- <section class="about">
    <h3 style="font-size: auto;">Developer, Dreamer, Student and a Music and Photography Enjoyer</h3>
</section> -->
<br>
<div class="ppm">
        <div class="bar1"></div>
        <blockquote>{intro}</blockquote>    
    </div>
<!-- <br>
<div on:click={() =>scrollIntoView("pro")} class="sb">
    <p>Scroll Down</p>
<i style="font-size: 25px;" class='bx bx-down-arrow-alt' ></i>
</div> -->
</div>
</div>
<section id="pro" class="projects">
    <div>
        <div style="">
            <h1 class="le">Projects</h1>
        </div>
    <div class="col">
    <Card>
        <CardTitle>
            HinduWiki
        </CardTitle>
        <br>
        <CardDesc>
            Exploring the Journey of a Multifaceted Creative
        </CardDesc>
        <br>
        <!-- <button class="but" on:click={() => window.open("https://hinduwiki.vercel.app")}>
            View
        </button> -->
        <div class="hor">
            <div class="horg">
            <p>Html Css Js</p>
            </div>
        </div>
    </Card>

    <Card>
        <!-- <CardImg imgurl="https://anshwadhwa.vercel.app/images/rhythmichead.png">

        </CardImg> -->
        <CardTitle>
            Gist - Know the Gist of it
        </CardTitle>
        <br>
        <CardDesc>
            Gist is a news app which gives news in 64 words using inshorts.
        </CardDesc>
        <br>
        <!-- <button class="but" on:click={() => window.open("https://rythmicweb.netlify.app")}>
            View
        </button> -->
        <div class="hor">
            <div class="horg">
            <p>React Native</p>
            </div>
        </div>
    </Card>

     <Card>
        <!-- <CardImg imgurl="https://anshwadhwa.vercel.app/images/gistbanner.png">

        </CardImg> -->
        <CardTitle>
            Not Notion
        </CardTitle>
        <br>
        <CardDesc>
            A Minimal Markdown editor inspired by Notion on the web
        </CardDesc>
        <br>
        <!-- <button class="but" on:click={"https://gistweb.vercel.app"}>
            View
        </button> -->
        <div class="hor">
            <div class="horg">
            <p>Svelte</p>
            </div>
        </div>
    </Card>
    <div class="">
        
    </div>

</div>
<button on:click={() =>window.open("/projects")} class="but" class:dark-mode={isDarkMode}>
            See All
        </button>
    </div>
</section>

<footer>
    <div class="center">
        <p>Ansh Wadhwa @ 2025</p>
    </div>
</footer>


<style>
    :root{
        --border-color: #edeceb;
    }
    :global(html){
        scroll-behavior: smooth;
    }
    .about{
        font-style: normal;
    }
    .horg{
        border: 1;
        border-radius: 5px;
        background-color: transparent;
        padding: 2px;
        height:25px;
        margin-bottom: 15px;
    }
    .ppm{
        display: flex;
        justify-content: center;
    }
    .bar1{
        width: 2px;
        height: 30px;
        background-color: rgb(82, 82, 82);
        margin-right: 4px;
        margin-top: 10px;
    }
    .hor{
        display: flex;
        font-size: 13px;
    }
    .but{
        width: 100%;
        align-items: center;
        background-color: black;
        padding: 12px;
        color: white;
        border: 1px solid #edeceb;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
    }
    .dark-mode {
        background-color: #171717;
        color: #edeceb;
        border-color:#292929;
    }
    #container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  padding: 1px;
}
.center{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.le{
    text-align: center;
    margin-bottom: 40px;
}
.mainp{
    padding: 50px;
    margin-top: 20px;
    margin-bottom: 50px;
}
.main{
    display: flex;
    justify-content: center;
    text-align: center;
}
.sb{
    cursor: pointer;
    display: block;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    font-size: 12px;
    color: black;
    text-decoration: none;
}

.projects{
    padding: 40px;
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
}

h1 {
  margin: 20px 0 0;
  font-size: 3rem;
  letter-spacing: 1px;
  text-align: center;
}
@keyframes down {
  0% {
    opacity: 0;
    top: 8px;
  }
  5% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    top: 38px;
  }
}
@media screen and (max-width: 480px) {

  h1 {
    margin: 10px 0 0;
    font-size: 2rem;
  }
}
    .butcenter{
        align-items: center;
    }
    .col{
        justify-content: center;
        margin: auto;
        display: inline-grid;
        grid-template-columns: auto auto auto;
        padding: 10px;
        gap: 20px 50px;
    }
     .sdiv{
        display: inline;
    }
    .sicon{
        color: white;
        margin-left: 10px;
        margin-right: 10px;
    }
    .ball{
        margin-top: 48px;
        margin-right: 10px;
        width: 20px;
        height: 20px;
        border: 1;
        border-radius: 100px;
        background: rgba(247, 2, 2, 0.733);
    }
    .details{
        display: inline;
        margin: auto;
        border: 1;
    }
    .statusdiv{
        display: flex;
    }
    .title{
       display: flex; 
       text-align: center;
       justify-content: center;
    }
    .bd{
       display: flex; 
       text-align: center;
       justify-content: center;
       padding: 10px;
    }
    .img{
        margin: 10px;
        display: inline-block;
        border: 1;
        padding: 10px;
        border-radius: 10px;
    }
    h1{
        margin-left: 10px;
        font-size: 50px;
    }
     @media screen and (max-width: 700px) {
         .col{
            justify-content: center;
            align-items: center;
            text-align: center;
            width: auto;
            grid-template-columns: auto auto;
        }
     }
    @media screen and (max-width: 500px) {
        .col{
            justify-content: center;
            align-items: center;
            text-align: center;
            width: auto;
            grid-template-columns: 100%;
        }

        .bd{
            display:flex;
        }
        .statusdiv{
            text-align: center;
    }
    .main{
        justify-content: space-between;
    }
    }
    .center{
        margin-left: auto;
        margin-right: auto;
    }
    .img{
        margin: 5px;
        border: 1;
        border-radius: 5px;
    }
    blockquote{
        border: 1;
        border-style: none;
        padding: 2px;
        text-align: center;
        border-radius: 5px;
    }
</style>