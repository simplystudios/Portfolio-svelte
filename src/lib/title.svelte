<script>
    import { onMount } from 'svelte';
    import { ModeWatcher, setMode, mode } from "mode-watcher";
let linkbr;
let open = false;
let color;

function toggletheme() {
    if ($mode === "light") {
        setMode("dark");
        console.log($mode)
        color = "#cfd0d4";
        document.querySelector('body').style = "background-color:black; color:#cfd0d4;";
        // document.documentElement.style.setProperty('--border-color', 'rgb(32, 31, 31)');
    } else {
        setMode("light");
         console.log($mode)
        document.querySelector('body').style = "background-color:#fafafa; color:#171717;";
        // color = "gray";
        // document.documentElement.style.setProperty('--border-color', '#edeceb');

    }
}

function openmenu() {
    if(open == false){
        open = true;
        linkbr.style.display = 'block';
    }
    else if(open == true){
        open = false;
        linkbr.style.display = 'none';
    }
}

    onMount(() => {
        if ($mode === "light") {
            console.log($mode)
        document.querySelector('body').style = "background-color:#fafafa; color:#171717;";
        color = "gray";
        document.documentElement.style.setProperty('--border-color', '#edeceb');
    } else {
        color = "#cfd0d4";
         console.log($mode)
         document.querySelector('body').style = "background-color:black; color:#cfd0d4;";
        document.documentElement.style.setProperty('--border-color', 'rgb(32, 31, 31)');

    }
        linkbr = document.getElementById('linkbr');
    });
</script>

<ModeWatcher />
<slot/>

<div class="main">
    <div class="menu">
       <button on:click={toggletheme}>
        Dark Mode
       </button>
    </div>
    <div id="linkbr" class="links">
        <!-- <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/projects">Projects</a> -->
    </div>
    <div class="right">
         <button on:click={window.open(`/photography`, '_self')}>
            Photography
       </button>
    </div>
</div>
<style>
.heading{
    margin-left: auto;
    margin-right: auto;
    
}
.right{
    text-align: right;
    width: 90%;
    padding: 15px;
    color: grey;
}
.menu{
    width: 90%;
    padding: 15px;
}
.main{
    display: flex;
    justify-content: center;
    width: 100%;
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
    margin-top: 10px;
    width: 500px;
    text-decoration:none;
    margin-bottom: 20px;
    font-size: 20px;
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
 @media screen and (max-width: 500px) {
    .main{
        justify-content: space-between;
    }
 }
</style>