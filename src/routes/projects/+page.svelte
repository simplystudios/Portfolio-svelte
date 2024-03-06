<script>
import Title from '$lib/title.svelte'
import Card from '$lib/Card.svelte'
import CardTitle from '$lib/CardTitle.svelte'
import CardImg from '$lib/CardImg.svelte'
import CardDesc from '$lib/CardTitle.svelte'
import CardButton from '$lib/CardButton.svelte'
import { onMount } from 'svelte';
  import { each } from 'svelte/internal';


let data = []
onMount(async() =>{
    const repos = await fetch('https://api.github.com/users/simplystudios/repos');
    data = await repos.json()
    console.log(data);

})
</script>
 <Title/>
 <section class="projects">
    <h1>Projects</h1>
    <div class="col">
    {#if data.length>0}
    {#each data as d}
    {#if d.fork == true}
        
    {:else}
    <Card>
        <CardTitle>
            {d.name}
            {#if d.homepage == null}
            
        {:else}
            <img width="15px" height="15px" on:click={window.open(d.homepage)} src="https://static-00.iconduck.com/assets.00/external-link-icon-2048x2048-wo7lfgrz.png" alt="">
        {/if}
        </CardTitle>
        <div class="hor">
            <img style="padding: 5px;" width="15px" height="15px" src="https://t4.ftcdn.net/jpg/05/40/09/17/360_F_540091788_AvDyNUSbtnKQfNccukuFa3ZlsHFnMYrK.png" alt="">
            <h3>{d.stargazers_count}</h3>
            <div class="horg">
            <p>{d.language}</p>
            </div>
        </div>
        <br>
        <CardDesc>
            {d.description}
        </CardDesc>
        <br>
        <CardButton link={window.open(d.html_url)}>
            View on Github
        </CardButton>
    </Card>
    {/if}
    {/each}
    {/if}

    

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
    .center{
        align-items: center;
        justify-content: center;
    }
    .hor{
        align-items: center;
        justify-content: center;
        display: flex;
        margin-left: auto;
        margin-right: auto;
    }
    .horg{
        border: 1;
        border-radius: 5px;
        background-color: rgb(134, 136, 137);
        width: min-content;
        margin-left: 5px;
        padding: 5px;
        height: 15px;
        justify-content: center;

    }
    p{
        margin: 0px;
        font-size: 15px;
    }

</style>