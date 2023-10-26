<script>
    import { onMount } from 'svelte';

    let linkbr;
    let open = false
    function openmenu() {
        if(open == false){
            open = true
            linkbr.style.display = 'block';
        }
        else if(open == true){
            open = false
            linkbr.style.display = 'none';
        }
    }

    onMount(() => {
        linkbr = document.getElementById('linkbr');
    });
</script>

<div class="main">
    <div class="menu">
        <img on:click={openmenu} id="menubut" class="imgp" src="https://raw.githubusercontent.com/hackernoon/pixel-icon-library/main/Icons/PNG/For%20Dark%20Mode/24px/Solid/Bars.png" alt="" height="24px">
        <h1 class="heading">Ansh Wadhwa</h1>
    </div>
    <div id="linkbr" class="links">
        <a href="#">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
    </div>
</div>
<style>
.heading{
    margin-left: auto;
    margin-right: auto;
}
.menu{
    display: flex;
    text-align: center;
}
.imgp{   
    display: none;
    margin-left: 10px;
    margin-top: auto;
    margin-bottom: auto;
}
.links{
    display: block;
    text-align: center;
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 20px;
}
 @media screen and (max-width: 500px) {
    .imgp{
        display: block;
    }
    .links{
        display: none;
    }
 }
</style>