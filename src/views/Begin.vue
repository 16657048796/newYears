<template>
    <div class="begin">
    <!-- 左右门 -->
    <div class="door_left" :style="bg_left"></div>
    <div class="door_right" :style="bg_right"></div>
    <!-- <div class="ipt_wrap" v-if="door_btn_show" >
        <p>当前会场人数</p>
        <input type="text" v-model="Total"  @keyup.enter="btn" placeholder="000">
    </div> -->
    <!-- 开始按钮 -->
    <div v-show="door_btn_show">
        <p class="door_btn"  @click="btn" :style="door_btn_bg"></p>
    </div>
        <snow :snow_style_data="snow_style_data"/>
    </div>
    
</template>

<script>
import { ref , reactive, onMounted ,components} from '@vue/composition-api';
import $ from 'jquery' 
import snow from "./bg_video/snow"
export default {
    components:{
      snow
    },
    setup( props , context ){
   const snow_style_data = reactive(["❉",'✻','✼','❅','❆','❈','❉','❊'])
        // onMounted( () => {
        //     if( context.root.$store.state.total ){
        //         let nextPage = context.root.$router.push({
        //                 path: '/about',
        //             })
        //         window.open( nextPage.herf, '_self' );
        //     }
        // } )
//-------------------------------------------------------------------------data------------------------------------------------------------------------------
           const Total = ref (null);
//------------------------------------------------------------------------methods----------------------------------------------------------------------------
        //开关按钮
        const btn = reactive( () => {
            setTimeout(() => {
                let nextPage = context.root.$router.push({
                    path: '/Start',
                })
                window.open( nextPage.herf, '_self' );
            },2000);
            bg_left.left='-50vw'
            bg_right.right="-50vw"
            door_btn_show.value=false
        } )
        const btn1 = reactive( () => {
           
        } )
//////////////////////////////////////////////////////////////////////动画背景图样式//////////////////////////////////////
        //左门
        const bg_left=reactive({
            left:'0',
            background: "url(" + require("@/assets/bg/bg1.png") + ") 00vw 100vh",
            backgroundSize:  "100vw 100vh",
            backgroundOrigin:  "50vw 100vh",
        })
        //右门
        const bg_right=reactive({
            right:"0",
            background: "url(" + require("@/assets/bg/bg1.png") + ") 50vw 100vh",
            backgroundSize:  "100vw 100vh",
            backgroundOrigin:  "50vw 100vh",
        })
        const door_btn_show=ref(true)
        //开始按钮背景色
        const door_btn_bg=reactive({
            background: "url(" + require("@/assets/main/start_door_btn.png") + ")",
            backgroundPositionY:0,
        })

        
        // setTimeout(()=>{
        //     $(".door_btn").css({
        //         "left":"54vw"
        //     })
        //     setTimeout(() => {
        //         $(".door_btn").css({
        //             "left":"50vw"
        //         })  
        //         setTimeout(() => {
        //             $(".door_btn").css({
        //                 "left":"54vw"
        //             })  
        //             setTimeout(() => {
        //                 $(".door_btn").css({
        //                     "left":"50vw"
        //                 })  
        //             }, 120);
        //         }, 120);
        //     }, 100);
        // },1000)
        return {
            /////////////////////////////////////////////data///////////////////////////////////////
            //开门动画background
            bg_left,
            bg_right,
            //开门按钮是否消失
            door_btn_show,
            //开始按钮背景色
            door_btn_bg,
            //ipt输入框人数
            Total,
            //雪花
            snow_style_data,
            ///////////////////////////////////////////methods//////////////////////////////////////
            //开始按钮
            btn,
            
        }
    }
}
</script>
<style lang="scss" scoped>
    .begin{
        .door_left{
            width: 50vw;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 5;
            transition: left 2s linear;
        }
        .door_right{
            width: 50vw;
            height: 100vh;
            position: fixed;
            top: 0;
            right: 0;
            background-size:  100vw 100vh;
            background-origin:  50vw 100vh;
            transition: right 2s linear;
            z-index: 5;
        }
        .door_btn{
            width: 220px;
            height: 68px;
            position: fixed;
            top: 82vh;
            left: 50vw;
            margin-left: -95px;
            z-index: 10;
            cursor: pointer;
            transition: top .1s linear;
            &:hover{
                background-position-y:50% !important;
            }
        }
        .ipt_wrap{
            width: 365px;
            height: 100px;
            position: fixed;
            top: 80vh;
            left: 50%;
            z-index: 15;
            margin-left: -365px;
            line-height: 100px;
            border-radius: 6px;
            padding: 0 20px;
            box-sizing: border-box;
            p{  
                display: inline-block;
                color: rgb(243, 239, 31);
                // color: rgb(221, 43, 53);
                font-size: 40px;
                font-weight: 600;
            }
            input{
                float: right;
                width: 75px;
                height: 50px;
                font-size: 40px;
                margin-top: 22px;
            // background: rgba($color: #000000, $alpha: .3);
            // border: 1px solid rgb(236, 118, 22);
                border-radius: 6px;
                border-color: #f8b651f0;
                color: #feba5fc9;
                background: rgb(253 ,66, 91);
            }
        }
        .btn{
            width: 80px;
            height: 40px;
            line-height: 40px;
        }
    }
</style>
