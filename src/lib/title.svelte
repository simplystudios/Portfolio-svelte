<script>
 function openmenu(){
    linkbr.style.display = block
 }
</script>
<div class="main">
    <div class="menu">
        <img onclick="openmenu" id="menubut" class="imgp" src="https://raw.githubusercontent.com/hackernoon/pixel-icon-library/main/Icons/PNG/For%20Dark%20Mode/24px/Solid/Bars.png" alt="" height="24px">
        <h1 class="heading">Ansh Wadhwa</h1>
    </div>
    <div id="linkbr" class="links">
        <a href="#">Home</a>
        <a href="#About">About</a>
        <a href="#">Projects</a>
    </div>
</div>
<style>
.main{
}
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