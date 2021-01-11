<template>
    <div id="app">
        <div id="nav">
            <img src="@/assets/logo.png" alt="">
        </div>
        <router-view />
     <bgVideo />
    </div>
</template>

<script>
import bgVideo from "@/views/bg_video/bg_video"
export default {
    components:{
        bgVideo
    },
}
</script>
<style lang="scss">
    #app {
        width: 100%;
        height: 100vh;
    }
    body{
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
        cursor: crosshair;
        button{
            cursor: pointer;
        }
    }
    #nav{
        width: 144px;
        height: 37px;
        position: fixed;
        top: 3vh;
        left: 3vw;
        z-index: 999;
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>
