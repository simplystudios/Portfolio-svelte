<script>
import Title from '$lib/title.svelte'
import Card from '$lib/Card.svelte'
import CardTitle from '$lib/CardTitle.svelte'
import CardImg from '$lib/CardImg.svelte'
import CardDesc from '$lib/CardTitle.svelte'
import CardButton from '$lib/CardButton.svelte'

    const intro = "Compiling dreams into reality with lines of code - 2023, Chatgpt"
    let title = "Ansh Wadhwa";
async function getdata() {
    const url = 'https://api.lanyard.rest/v1/users/600278222428438559';

    try {
        const resp = await fetch(url);
        const res = await resp.json(); // Await the JSON parsing
        
        const d = res['data'];
        const statusb = d.discord_status;
        un.innerText = `@${d.discord_user.username}`;
        statust.innerText = d.discord_status;

        if(statusb == 'dnd'){
            ball.style.background = '#f33f43';
        }
        else if (statusb == 'online'){
            ball.style.background = '#22a558';
        }
        else if (statusb == 'idle'){
            ball.style.background = '#f0b132'
        }
        else{
            ball.style.background = 'grey'
        }
        // Update the DOM element with the value

    } catch (error) {
        console.error("An error occurred:", error);
    }
}
getdata();

</script>
<div class="main">

    <Title/>
<div class="title">
    <div class="bd">
        <img id="pic" class="img" src="https://anshwadhwa.vercel.app/images/mypfp.jpg" alt="" width="260px" height="260px">
        <div class="details">
            <div class="statusdiv">
                <div id="ball" class="ball">
                    </div>
                    <h1>{title}</h1>
                </div>
                <h2>Coding is fun™</h2>
            <div>
            <h2 id="un">username loading...</h2>
            <h2 id="statust">status loading...</h2>
            <div class="sdiv">
                <a href="https://github.com/simplystudios" target="_blank" rel="noopener noreferrer"><img class="sicon" src="https://raw.githubusercontent.com/hackernoon/pixel-icon-library/main/Icons/PNG/For%20Dark%20Mode/24px/Brand%20Logos/Github.png" alt="icon title" /></a>
                <a href="https://twitter.com/anshwadhwa8" target="_blank" rel="noopener noreferrer"><img class="sicon" src="https://github.com/hackernoon/pixel-icon-library/blob/main/Icons/PNG/For%20Dark%20Mode/24px/Brand%20Logos/X.png?raw=true" alt="icon title" /></a>
                <a href="https://instagram.com/anshwadhwa8" target="_blank" rel="noopener noreferrer"><img class="sicon" src="https://i.ibb.co/6XHBcjP/logo-social-media-old-instagram-21.png" alt="" width="24px"></a>
            </div>
            </div>
        </div>
    </div>
</div>
<br>

    <div class="center">
        <blockquote>{intro}</blockquote>    
    </div>

</div>

<br>
<br>
<section class="about">
    <h1>About Me</h1>
    <h3>Hi there! I'm Ansh, a 15-year-old programmer and web developer from India. I started coding in 2020 after the lockdown hit. At that time, I was making websites with Weebly. In 2021, I started real coding by making apps in Sketchware, a Scratch-like IDE for Java Android apps. I made some real apps, which you can check out in my coding section. After that, I got into Python and made a lot of projects there too. In 2022, I started making proper websites. I am currently learning C++.</h3>
</section>
<br>
<br>
<section class="projects">
    <h1>Projects</h1>
    <div class="col">
    <Card>
        <CardImg>
            
        </CardImg>
        <CardTitle>
            HinduWiki
        </CardTitle>
        <br>
        <CardDesc>
            Exploring the Journey of a Multifaceted Creative
        </CardDesc>
        <br>
        <CardButton>
            View
        </CardButton>
    </Card>

    <Card>
        <CardImg imgurl="https://anshwadhwa.vercel.app/images/rhythmichead.png">

        </CardImg>
        <CardTitle>
            Rhythmic
        </CardTitle>
        <br>
        <CardDesc>
            An Music Streaming Service made using open source tools, api made using react native
        </CardDesc>
        <br>
        <CardButton>
            View
        </CardButton>
    </Card>

     <Card>
        <CardImg imgurl="https://anshwadhwa.vercel.app/images/gistbanner.png">

        </CardImg>
        <CardTitle>
            Gist - Know the gist of it
        </CardTitle>
        <br>
        <CardDesc>
            Gist is a project that i worked on in june of 2023 it is a news app which gives news in 64 words.
        </CardDesc>
        <br>
        <CardButton>
            View
        </CardButton>
    </Card>

</div>
</section>


<style>
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
        margin: 10px;
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
       border-color: white;
       border-style: dashed;
       padding: 10px;
       border-radius: 5px;
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
            display:block;
        }
        .statusdiv{
            margin-left: 20px;
            display: flex;
    }
    }
    .center{
        width: auto;
        margin: auto;
    }
    .img{
        margin: 5px;
        border: 1;
        border-radius: 5px;
    }
    blockquote{
        border: 1;
        border-style: dashed;
        padding: 10px;
        text-align: center;
        border-radius: 5px;
    }
</style>