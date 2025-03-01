<script>
import Title from '$lib/title.svelte'
import Card from '$lib/Card.svelte'
import CardTitle from '$lib/CardTitle.svelte'
import CardImg from '$lib/CardImg.svelte'
import CardDesc from '$lib/CardTitle.svelte'
import CardButton from '$lib/CardButton.svelte'
import { onMount } from 'svelte';
import { Star, GitFork } from 'lucide-svelte';

import { ModeWatcher, setMode, mode } from "mode-watcher";

let color;
let isDarkMode;


$: isDarkMode = $mode === 'dark';


let data = []
onMount(async() =>{
    const repos = await fetch('https://api.github.com/users/simplystudios/repos');
    data = await repos.json()
    console.log(data);
    if ($isDarkMode === true) {
    color = "#171717";
    console.log("whaa")
    }
    else{
        color = "#cfd0d4";
        console.log("naahhhh")
    }

})
</script>
 <Title/>
 <div class="projects">
    <h1 style="font-size: 30px;">Projects</h1>
    <div class="col">
    {#if data.length>0}
    {#each data as d}
    {#if d.fork == true}
    {:else}
          <div class:dark-mode={isDarkMode} class="protemp">
        <div style="font-size: 20px; font-weight: 600; padding-bottom: 5px;">
            {d.name}
        </div>
            
        <div style="margin: 2px; font-size: 15px;">
            {d.description}
        </div>
        <div class="hor">
            <Star size="20" color={color} style="margin-top: 10px; margin-right: 5px;"/>
            <h3>{d.stargazers_count}</h3>
            <GitFork size="20" color={color} style="margin-top: 10px; margin-left: 5px;"/>
            <h3 style="margin-right: 5px;">{d.forks}</h3>
            <div class:horg-black={isDarkMode} class="horg">
            <p>{d.language}</p>
            </div>
        </div>
    </div>
    {/if}
    {/each}
    {/if}

    

</div>
</div>
<style>

  .protemp{
    background-color: #ffffff;
    color: black;
    padding: 10px;
    border: 1px solid #d0d0cf;
    border-radius: 5px;
    border-style: groove;
    font-family: Recoleta;
  }
  .dark-mode {
        background-color: #171717;
        color: #edeceb;
        border-color: rgb(42, 42, 42);
    }
 .col{
        justify-content: center;
        margin: auto;
        display: inline-grid;
        grid-template-columns: auto auto;
        padding: 10px;
        gap: 20px 50px;
    }
    .center{
        align-items: center;
        justify-content: center;
    }
    .hor{
        display: flex;
        margin-left: auto;
        margin-right: auto;
        font-size: 10px;
    }
    
    .horg{
        border: 1;
        border-radius: 5px;
        background-color: transparent;
        width: min-content;
        margin-left: 10px;
        padding: 5px;
        height: 15px;
        margin-top: 5px;
        justify-content: center;
    }
    .horg-black{
        border: 1;
        border-radius: 5px;
        background-color: transparent;
        width: min-content;
        margin-left: 10px;
        padding: 5px;
        height: 15px;
        margin-top: 5px;
        justify-content: center;
    }
    p{
        margin: 0px;
        font-size: 15px;
    }

    @media only screen and (max-device-width: 720px) { 
        .col{
        justify-content: center;
        margin: auto;
        display: inline-grid;
        grid-template-columns: auto;
        padding: 10px;
        gap: 20px 50px;
    }
    }
</style>