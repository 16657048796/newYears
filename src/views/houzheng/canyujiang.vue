<template>
  <div class="meet">
    <div :id=" Display ? 'mark' : 'marknone' "  :style="mark">
        <div class="prizeData_wrap">
          <ul>
            <li class="frotate_wrap" v-for="(item ,index) in newPeoplePrize" :key="index" >
                <div class="frotate_wrap_w">
                    <img src="@/assets/main/zhuan2.png" alt="">
                </div>
                <div  class='lottery-luckers-img frotate'  >
                    <p>{{item.num}}</p>
                </div>
            </li>
          </ul>
        </div>
        <div class="alert">
            <button v-if="btn_display" class="btn" @click="btn">开始抽取三等奖</button>
        </div>
        <button class="guanbi" @click="Display=false">

        </button>
    </div>
    
    <div class="main_background">
        <img src="@/assets/bg/bg2.png" alt="">
    </div>
    <!-- 中上匾牌 -->
    <div class="bianpai" :style="bianpai">第1轮抽奖</div>
    <!-- 中间 -->
    <div>
      <div class="main_seat">
        <img class="main_seat_one" src="@/assets/main/seat-img1.png" alt="" />
        <img class="main_seat_two" src="@/assets/main/seat-img2.png" alt="" />
        <img class="main_seat_three" src="@/assets/main/seat-img3.png" alt="" />
        <img class="main_seat_four" src="@/assets/main/seat-img4.png" alt="" />
      </div>
      <!-- 抽奖按钮 -->
      <div class="btn_start">
        <div class="btn_start_num">
          <p>抽奖数量 ： 10</p>
          <!-- <input type="text" /> -->
        </div>
        <button @click="btn_start" class="btn_start_sty">开始抽奖</button>
      </div>
      <!-- 抽奖动画 -->
      <div class="timer_p"></div>
    </div>
    <div class="lottery_wrap" :style="bg_right">
      <!-- <ul v-for="(item,index) in newarrs" :key="index"> -->
      <ul>
            <li :style="bg_right_people" v-for="(_item,_index) in AllPeople" :key="_index">{{_item.num}}</li>
      </ul>
    </div>
    <!-- <div class="amount">
      <p>当前未中奖人数:</p>
      <p>{{ oktotal }} / {{ total }}</p>
    </div> -->
    <div class="prize_wrap_wrap">
      <div class="winning">
        <button @click="autodisplay">获奖名单</button>
      </div>
      <div class="prize_wrap">
        <div class="prize">
          <img src="@/assets/prize/participation.jpg" alt="" />
        </div>  
        <p>参与奖</p>
      </div>
    </div>
    <!-- <div class="snow kaiguan"></div> -->
    <snow :snow_style_data="snow_style_data"/>
  </div>
</template>

<script>
import { ref, reactive, computed } from "@vue/composition-api";
import $ from "jquery";
import snow from "../bg_video/snow"
export default {
    components:{
      snow
    },
  setup(props, context) {
    //雪花样式
   const snow_style_data = reactive(["❉",'✻','✼','❅','❆','❈','❉','❊'])

    //-------------------------------------------------------------------------data-----------------------------------------------------------------------------
    const btn_display = ref(false)
    
    //------------------------------------------------------------------------methods----------------------------------------------------------------------------
    const btn = reactive(() => {
      let nextPage = context.root.$router.push({
        path: "/third",
      });
      window.open(nextPage.herf, "_self");
    });
    /////////////////////////////////////////////////////////////////////////JQ////////////////////////////////////////
    setTimeout(function () {
      $(".main_seat_one").css({
        top: "100vh",
        left: "50vw",
      });
      $(".main_seat_two").css({
        top: "50vh",
        left: "-100vw",
      });
      $(".main_seat_three").css({
        top: "50vh",
        left: "150vw",
      });
      $(".main_seat_four").css({
        top: "-50vw",
        left: "50vw",
      });
      $(".btn_start").css({
        bottom: "-10vh",
        left: "50vw",
      });
      $(".lottery_wrap").css({
        top: "-80vh",
      });
      $(".bianpai").css({
        top: "-50vh",
      });
      $(".main_background").css({
          left: "0",
      });
    }, 1);
    setTimeout(function () {
      $(".main_seat_one").css({
        top: "50vh",
        left: "50vw",
        transition: "all .78s linear",
      });
      $(".main_seat_two").css({
        top: "50vh",
        left: "50vw",
        transition: "all .78s linear",
      });
      $(".main_seat_three").css({
        top: "50vh",
        left: "50vw",
        transition: "all .78s linear",
      });
      $(".main_seat_four").css({
        top: "50vh",
        left: "50vw",
        transition: "all .78s linear",
      });
      $(".btn_start").css({
        bottom: "10vw",
        left: "50vw",
        transition: "all .78s linear",
      });
      $(".lottery_wrap").css({
        top: "23vh",
        transition: "all .78s linear",
      });
      $(".prize_wrap_wrap").css({
        top: "27vh",
        transition: "all .78s linear",
      });
    }, 3000);
    setTimeout(() => {
      $(".timer_p").html("<p>888</p>");
      $(".bianpai").css({
        top: "7vh",
        transition: "all .78s linear ",
      });
    }, 3780);
    setTimeout(function () {
      $(".bianpai").css({
        height: "150px",
        lineHeight: "150px",
      });
    }, 4780);
    //右边获奖背景
    const bg_right = reactive({
      background: "url(" + require("@/assets/zjmd_bg.png") + ") ",
      backgroundSize: "100% 100%",
    });
    const bg_right_people = reactive({
      backgroundImage: "url(" + require("@/assets/bg_people.png") + ") ",
      backgroundSize: "100% 100% ",
    });
    // const total = computed(() => {
    //   return context.root.$store.getters.total;
    // });
    // const oktotal = computed(() => {
    //   let sum = 0;
    //   context.root.$store.getters.total_list.map((item) => {
    //     if (!item.out) {
    //       sum++;
    //     }
    //     sum;
    //   });
    //   return sum;
    // });
    //中上匾牌
    const bianpai = reactive({
      background: "url(" + require("@/assets/main/bo.png") + ")",
    });
    const mark = reactive({
      background: "url(" + require("@/assets/main/zhong.png") + ") ",
      backgroundSize: '100% 100%'
    });
    //自动显示
    const autodisplay = (()=>{
      Display.value = true
    })
    // const a=[
    //     [[1,1,1,1,1,1,1,1],[]]
    //     [[],[]]
    //     [[],[]]
    //     [[],[]]
    // ]
    //开始按钮
    //抽奖人数
    const Display = ref(false)
    const people=ref(context.root.$store.getters.total-1);
    const list = context.root.$store.getters.total_list;
    const items = context.root.$store.getters.prize[0].content.item
    const rounds = context.root.$store.getters.prize[0].content.rounds
    var timers=null
    var timer=null
    var Delay_frame = null
    var num = 1
    var arrss = [];
    var newarrs =  reactive([])
    var newPeoplePrize =  reactive([])
    var text = null;
    var AllPeople = reactive([])


    //////////////////////////////methods///////////////////////////
    //封装随机数
    const start_random = (()=>{
      timers=setInterval(function(){
                 var randm = Math.round(Math.random()*people.value);
                 var Winning_list = randm;
                if(!list[randm].out){
                    list[randm].out=true;
                    AllPeople.push(list[randm]);
                    context.root.$store.commit('LOCALS');
                    newPeoplePrize.push(list[randm])
                }
                if( AllPeople.length == items ){
                    clearInterval(timers);
                    timers = null;
                    newarrs.push(AllPeople)
                }
        },700)
    })
    //封装抽奖
    const start_luckdraw = (()=>{
      timer=setInterval(function(){
                var html=Math.round(Math.random()*people.value)
                $(".timer_p").html(html)
               if(timers == null){
                    clearInterval(timer);
                    timer = null;
                    $(".timer_p").html(AllPeople[9].num);
                    // console.log(newarrs)
                    if( $('.bianpai').html()!='第一轮抽奖' ){
                        num++
                    }
                    if( num === 9){
                      context.root.$store.commit('SET_MEET',newPeoplePrize)
                        $(".bianpai").html(`第8轮抽奖`);
                    }else{
                      context.root.$store.commit('SET_MEET',newPeoplePrize)
                        $(".bianpai").html(`第${num}轮抽奖`);
                    }
                    $(".btn_start_sty").html('本轮抽奖完毕');
                    // $(".bianpai").html('本轮抽奖完毕');
                    Delay_frame = setTimeout(() => {
                        if($(".btn_start_sty").html()=='本轮抽奖完毕'){
                             $(".btn_start_sty").html('开始抽奖');
                             //$('.bianpai').html(`第${num}轮抽奖`); 
                            if(rounds < num){
                                Display.value = true
                                // console.log(Display.value)
                            }
                            autodisplay()
                        }
                    }, 400);
                      if( num ===  9 ){
                        btn_display.value = true
                      }
                     
               }
            },10)
    })


    const btn_start = (btn_start)=>{
        if($(".btn_start_sty").html()=="开始抽奖"){
            $(".btn_start_sty").html('暂停抽奖');
            if( AllPeople.length === 10){
             AllPeople.length = 0;
            }

            //随机数调用
            start_random()

           //抽奖调用
           start_luckdraw()
           if(num === 9){
                    alert('本轮抽奖已结束，请进行下一轮抽奖')  
                    clearInterval(timer);
                    clearInterval(timers);
                    btn_start = null;
                    $(".btn_start_sty").html('开始抽奖');
                }
        }else{
            $(".btn_start_sty").html('开始抽奖');
            clearInterval(timer);
            clearInterval(timers);
        }
    }
    function guanbi(){
      Display.value=false
    }
    function winning(){
      Display.value=true
    }
    return {
      /////////////////////////////////////////////data///////////////////////////////////////
      //隐藏跳转按钮
      btn_display,
      //总人数
      people,
      //获奖背景
      bg_right,
      //获奖人数单个背景
      bg_right_people,
      guanbi,newPeoplePrize,
      //抽奖环节
      //people_prize,
    //   total,
    //   oktotal,
      //中上匾牌
      winning,
      bianpai,
      mark,
      //雪花样式
      snow_style_data,AllPeople,newarrs,Display,
      ///////////////////////////////////////////methods//////////////////////////////////////
      btn,
      //抽奖开始按钮
      btn_start,
      //自动显示
      autodisplay,
      start_random,start_luckdraw
    };
  },
};
</script>
<style lang="scss" scoped> 
.main_background{
    left: 100vw;
    transition: left 3s linear;
  z-index: -1;
}
#marknone{
  display: none;
}
#mark{
  display: block;
    width: 80vw;
    height: 80vh;
    background-color: #000000;
    opacity: 0.9;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -40vw;
    margin-top: -40vh;
    z-index: 2000;
    .alert{
        width: 300px;
        height: 300px;
        margin: 120px auto;
        .btn {
          height: 50px;
          line-height: 50px;
          font-size: 20px;
          color: #fff;
          background: #a41b0d;
          position: absolute;
          bottom: 5vh;
          left: 50%;
          margin-left: -80px;
          padding: 0 20px;
          border-radius: 50px;
          outline: none;
          border: 1px solid #fff;
          font-weight: 700;
        }
        .btn_disaplay {
          display: none;
        }

    }
    .guanbi{
      width: 30px;
      height: 30px;
      background: rgba($color: #000000, $alpha: 0);
      border: 50%;
      position: absolute;
      top: 0;
      right: 0;
      outline: none;
    }
    .prizeData_wrap{       
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        padding: 0;
        margin-top: 30px;
        width: 77VW;
        height: 56vh;
        overflow: auto;
        margin-left: 20px;
        margin-top: 70px;
      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        border: 0;
        border-radius: 3px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #fcdb11 !important;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #ccc;
        background-clip: padding-box;
        min-height: 28px;
        border: 0;
        border-radius: 3px;
      }
      &::-webkit-scrollbar-track-piece {
        background-color: rgba(0, 0, 0, 0.1);
        border: 0;
        border-radius: 3px;
      }
      li{
        float: left;
        width: 100px;
        height: 100px;
        background: #ea5d19e0;
        margin: 20px 10px;
        line-height: 100px;
        text-align: center;
        border-radius: 50%;
        font-size: 30px;
        user-select: none;
        color: #480000;
        font-weight: 500;
      }
        .frotate_wrap{
        width:100px;
        height:100px;
        position: relative; 
        user-select: none;
            .frotate_wrap_w{
                width:100px;
                height:100px;
                position: absolute;
                top: 0;
                left: 0;
                img {
                    width: 100%;
                    height: 100%;
                    display: inline-block;
                    animation: foreverrotatea linear infinite;
                    animation-duration: 2s;
                }
            }
            .lottery-luckers-img {
                width:100px;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 11;
                height:100px;
                p{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    text-align: center;
                    line-height: 100px;
                    font-size: 38px;
                    color: #1f1111;

                }
            }
        } 
        @keyframes foreverrotatea {
            0% {
                transform: rotate(0)
            }
            to {
                transform: rotate(-1turn)
            }
        }
    }
}  
.winning{    
  // position: fixed;
  // top: 23vh;
  // left: 18vw;   
  margin-bottom: 70px;
  margin-left: 50px;
  button{    
    width: 200px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 28px;
    color: #c31818;
    outline: none;
    border: 1px solid #da1313;
    border-radius: 4px;
    background: #fcdb11cc;
    font-weight: 300;
  }

}
.meet {
  .bianpai {
    width: 750px;
    height: 10px;
    position: fixed;
    left: 50vw;
    margin-left: -375px;
    text-align: center;
    line-height: 150px;
    user-select: none;
    font-size: 53px;
    color: #c51223ba;
    overflow: hidden;
    font-weight: 300;
    overflow: hidden;
  }
  .main_seat {
    width: 40vw;
    height: 40vh;
    img {
      width: 40vw;
      height: 50vh;
      position: fixed;
      top: -50vh;
      left: -50vw;
      right: 50vw;
      bottom: 50vw;
      margin-left: -20vw;
      margin-top: -20vh;
    }
  }
  .btn_start {
    width: 430px;
    height: 50px;
    position: fixed;
    left: 50vw;
    margin-left: -240px;
    background-color: #de3e2e;
    border-radius: 5px;
    box-shadow: 0 2px 0px 0px rgba(0, 0, 0, 0.15),
      0 -6px 0px 0px rgba(185, 28, 24, 1) inset;
    padding: 15px;
    .btn_start_num {
      width: 60%;
      height: 50px;
      line-height: 50px;
      float: left;
      p {
        float: left;
        font-size: 20px;
        margin-left: 18%;
        color: rgb(255, 191, 18);
        user-select: none;
      }
      input {
        width: 66px;
        height: 35px;
        margin-left: 30px;
        font-size: 20px;
        color: rgb(164, 27, 18);
        font-weight: 900;
        border-radius: 10px;
      }
    }
    .btn_start_sty {
      background-color: rgb(255, 222, 18);
      box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 0px 0px,
        rgb(255, 158, 37) 0px -6px 0px 0px inset;
      display: block;
      text-align: center;
      width: 112px;
      font-size: 18px;
      color: rgb(162, 14, 11);
      font-family: 微软雅黑;
      float: left;
      cursor: pointer;
      border-radius: 5px;
      padding: 6px 15px 10px;
      border-width: initial;
      border-style: none;
      border-color: initial;
      border-image: initial;
      float: right;
      outline: none;
    }
  }
  .timer_p {
    width: 8vw;
    height: 9vh;
    // background: #000;
    color: #fff;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -4vw;
    margin-top: -4vh;
    text-align: center;
    line-height: 9vh;
    font-size: 60px;
    user-select: none;
  }
  .lottery_wrap {    
    width: 360px;
    height: 605px;
    position: fixed;
    top: -80vh;
    left: 66vw;
    z-index: 1;
    ul {
      width: 77%;
      position: absolute;
      top: 85px;
      left: 39px;
      right: 49px;
      bottom: 40px;
      overflow: auto;
      padding-left: 0px;
      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        border: 0;
        border-radius: 3px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #fcdb11 !important;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #ccc;
        background-clip: padding-box;
        min-height: 28px;
        border: 0;
        border-radius: 3px;
      }
      &::-webkit-scrollbar-track-piece {
        background-color: rgba(0, 0, 0, 0.1);
        border: 0;
        border-radius: 3px;
      }
      li {
        // background-image: url(../images/xyh/table-winBg.png);
        color: rgb(235, 29, 49);
        font-family: 微软雅黑;
        text-align: center;
        float: left;
        background-size: 75px 70px;
        width: 75px;
        font-size: 19px;
        line-height: 60px;
        padding-bottom: 10px;
        background-repeat: no-repeat;
        margin: 2px 6.5px 0px;
        overflow: hidden;
        user-select: none;
      }
    }
  }
    @media screen and (min-width: 1920px){

    }
    .prize_wrap_wrap{
      
      position: fixed;
      top: -100vh;
      left: 15vw;
    }
  .prize_wrap {
    width: 16.32vw;
    // height: 40vh;
    border: 1px solid #ffffff;
    background: rgba($color: #000000, $alpha: 0.4); 
    border-color: #fff;
    box-shadow: 0 0 1rem 0 #ffc800, inset 0 0 6.25rem 0 #ffc800;
    border-radius: 4px;
    padding-top: 16px;   
    animation: foreverrotate linear infinite;
    animation-duration: 5s;
    @keyframes foreverrotate {
      0% {
          transform: rotate(0)
      }
      to {
        transform:rotateY(-1turn)
      }
  }
    .prize {
      width: 10.88vw;
      // height: 26.66vh;
      margin: 0 auto;
      margin-top: 1vh;
      border: 1px solid #fff;
      box-sizing: border-box;
      padding: 4px;
      border-color: #fff;
      box-shadow: 0 0 1rem 0 #ffc800, inset 0 0 6.25rem 0 #ffc800;
      img {
        width: 100%;
        // height: 100%;
        border-color: #fff;
        background-color: rgba(0, 0, 0, 0.6);
        box-shadow: 0 0 1rem 0 #ffc800, inset 0 0 6.25rem 0 #ffc800;
      }
    }
    p {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      width: 100%;
      height: 9.5rem;
      font-size: 20px;
      color: #fff;
    }
  }
  .prize_deng {
    position: absolute;
    bottom: 0;
    left: 13vw;
    // margin-left: -24vw;
    width: 24vw;
    height: 70vh;
    background-repeat: no-repeat;
  }
}
</style>
