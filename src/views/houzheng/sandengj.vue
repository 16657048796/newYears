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
            <button v-if="btn_display" class="btn" @click="btn">开始抽取二等奖</button>
        </div>
        <button class="guanbi" @click="Display=false">

        </button>
    </div>
        <!-- <button class="btn" @click="btn">开始抽取二等奖</button> -->

        <!-- 中上匾牌 -->
        <div class="bianpai" :style="bianpai">第1轮抽奖</div>
        <!-- 中间 -->
        <div>
            <div class="main_seat">
                <img
                    class="main_seat_one"
                    src="@/assets/main/seat-img1.png"
                    alt=""
                />
                <img
                    class="main_seat_two"
                    src="@/assets/main/seat-img2.png"
                    alt=""
                />
                <img
                    class="main_seat_three"
                    src="@/assets/main/seat-img3.png"
                    alt=""
                />
                <img
                    class="main_seat_four"
                    src="@/assets/main/seat-img4.png"
                    alt=""
                />
            </div>
            <!-- 抽奖按钮 -->
            <div class="btn_start">
                <div class="btn_start_num">
                    <p >抽奖数量 ： 20</p>
                    <!-- <input type="text" /> -->
                </div>
                <button @click="btn_start" class="btn_start_sty" >开始抽奖</button>
            </div>
            <!-- 抽奖动画 -->
            <div class="timer_p"></div>
        </div>
        <div class="lottery_wrap" :style="bg_right">
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
                    <img :src="people_prize.data[1].img" alt="" />
                </div>
                <p>{{ people_prize.data[1].text }}</p>
            </div>
        </div>
        <!-- <div class="snow kaiguan"></div> -->
        <!-- <snow :snow_style_data="snow_style_data"/> -->
    </div>

    
</template>

<script>
import { ref , reactive, onMounted, watch } from '@vue/composition-api';
import $ from 'jquery'  
export default {
    // components: {
    //     snow,
    // },
    setup( props , context ){
 //-------------------------(------------------------------------------------data------------------------------------------------------------------------------
    const btn_display = ref(false)
 //------------------------------------------------------------------------methods----------------------------------------------------------------------------
        const btn = reactive( () => {
            let nextPage = context.root.$router.push({
                path: '/second',
            })
            window.open( nextPage.herf, '_self' );
        } )

        //
        //雪花样式
        // const snow_style_data = reactive([
        //     "❉",
        //     "✻",
        //     "✼",
        //     "❅",
        //     "❆",
        //     "❈",
        //     "❉",
        //     "❊",
        // ]);

        //-------------------------------------------------------------------------data-----------------------------------------------------------------------------

        //抽奖人数
        // const people = ref(999);
        //抽奖环节
        const people_prize = reactive({
            data: [
                {
                    img: require("@/assets/prize/first.jpg"),
                    text: "参与奖",
                },
                {
                    img: require("@/assets/prize/third.jpg"),
                    text: "三等奖",
                },
                {
                    img: require("@/assets/prize/second.jpg"),
                    text: "二等奖",
                },
                {
                    img: require("@/assets/prize/participation.jpg"),
                    text: "参与奖",
                },
            ],
        });
        //开始按钮
        // var timer = null;
        // function btn_start() {
        //   if ($(".btn_start_sty").html() == "开始抽奖") {
        //     timer = setInterval(function () {
        //       var html = Math.round(Math.random() * people.value);
        //       if (html < 100) {
        //         html = "0" + html;
        //       }else if(html<10){
        //         html = "00" + html;
        //       }
        //       $(".timer_p").html(html);
        //       $(".btn_start_sty").html("停止抽奖");
        //       $("body").css({
        //         'cursor':"wait"
        //       })
        //     }, 100);
        //   } else {
        //     $(".btn_start_sty").html("开始抽奖");
        //     clearInterval(timer);
        //     console.log($(".timer_p").html());
        //     $("body").css({
        //       'cursor':"pointer"
        //     })
        //   }
        // }
        //------------------------------------------------------------------------methods----------------------------------------------------------------------------
      
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
                bottom: "-50vw",
                left: "50vw",
            });
            $(".lottery_wrap").css({
                top: "-80vh",
            });
            $(".bianpai").css({
                top: "-50vh",
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
            $(".prize_wrap").css({
                top: "34vh",
                transition: "all .78s linear",
            });
        }, 3000);
        setTimeout(() => {
            $(".timer_p").html("<p>111</p>");
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
        // const a=[
        //     [[1,1,1,1,1,1,1,1],[]]
        //     [[],[]]
        //     [[],[]]
        //     [[],[]]
        // ]
        //开始按钮
        //抽奖人数
        var disable = ref(false)
        const Display = ref(false);
        const people = ref(context.root.$store.getters.total-1);
        const list = context.root.$store.getters.total_list;
        const items = context.root.$store.getters.prize[1].content.item;
        const rounds = context.root.$store.getters.prize[1].content.rounds;
        var timers = null;
        var timer = null;
        var Delay_frame = null;
        var num = 1;
        var arrss = [];
        var newarrs = reactive([]);
        var text = null;
        var AllPeople = reactive([]);
        var newPeoplePrize = reactive([])
        var itemsArr = ref('-1')
        var Number_of_Raffles = ref('')

        //自动显示
        const autodisplay = (()=>{
        Display.value = true
        })

        const btn_start = (btn_start) => {

            if ($(".btn_start_sty").html() == "开始抽奖") {
                $(".btn_start_sty").html('暂停抽奖');
                if(AllPeople.length === items[itemsArr.value]){
                    AllPeople.length = 0;
                }
                if ( $(".bianpai").html() != "第一轮抽奖" && itemsArr.value < 3 ) {
                        itemsArr.value++
                }
                timers = setInterval(function () {
                    var randm = Math.round(Math.random() * people.value);
                    var Winning_list = randm;
                    if (!list[randm].out) {
                        list[randm].out = true;
                        AllPeople.push(list[randm]);
                        newPeoplePrize.push(list[randm]);
                        context.root.$store.commit('LOCALS');
                    }
                    if (AllPeople.length == items[itemsArr.value]) {
                        
                        clearInterval(timers);
                        timers = null;
                        newarrs.push(AllPeople);
                        context.root.$store.commit('SET_THR',newPeoplePrize)
                    }
                }, 700);
                timer = setInterval(function () {
                    var html = Math.round(Math.random() * people.value);
                    $(".timer_p").html(html);
                    if (timers == null) {
                        clearInterval(timer);
                        timer = null;
                        
                        if( $(".bianpai").html() == "第1轮抽奖" ){
                            $(".timer_p").html(AllPeople[19].num);
                        } else if ( $(".bianpai").html() == "第2轮抽奖" ){
                            $(".timer_p").html(AllPeople[19].num);
                        } else {
                            $(".timer_p").html(AllPeople[9].num);
                        }

                        if ($(".bianpai").html() != "第一轮抽奖") {
                            num++;
                        }

                        if( num === 4){
                            btn_display.value = true
                            $(".bianpai").html(`第3轮抽奖`);
                            $(".btn_start_sty").html('开始抽奖');
                            autodisplay()
                            return false
                        }else{
                            $(".bianpai").html(`第${num}轮抽奖`);
                        }
                        // console.log(newarrs)
                        
                        $(".btn_start_sty").html('本轮抽奖完毕');
                        Delay_frame = setTimeout(() => {
                            
                            if ($(".btn_start_sty").html() == "本轮抽奖完毕") {
                                $(".btn_start_sty").html("开始抽奖");
                                $(".bianpai").html(`第${num}轮抽奖`);
                                // console.log(num);
                                // console.log(rounds);
                                if(rounds == num){
                                     $(".btn_start_num p").html('抽奖数量 ：10')
                                }
                                if (rounds < num) {
                                    Display.value = true;
                                    // console.log(Display.value)
                                }
                            }
                            autodisplay()
                        }, 400);
                    // if( num ===  3 ){
                    //     btn_display.value = true
                    //   }
                    }
                }, 10);
                 if(num === 4){
                    alert('本轮抽奖已结束，请进行下一轮抽奖')  
                    clearInterval(timer);
                    clearInterval(timers);
                    btn_start = null;
                    $(".btn_start_sty").html('开始抽奖');
                }
            }else{
            $(".btn_start_sty").html('开始抽奖');
            itemsArr.value--
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
            items,
            //总人数
            people,
            //获奖背景
            bg_right,
            //获奖人数单个背景
            bg_right_people,newPeoplePrize,
            //抽奖环节
            people_prize,
            //   total,
            //   oktotal,
            //中上匾牌
            bianpai,
            //雪花样式
            //snow_style_data,
            AllPeople,
            newarrs,
            Display,
            itemsArr,
            disable,
            ///////////////////////////////////////////methods//////////////////////////////////////
            btn,
            //抽奖开始按钮
            btn_start,
            mark,
            winning,
            autodisplay,
            btn_display
            
        }
    }
}
// setTimeout(function () {
//     var minSize = 10; //雪花大小初始值
//     var maxSize = 30; //雪花大小增长值
//     var dhight = $(window).height(); //页面的高度雪花
//     var dw = $(window).width(); //页面的宽度                                        //❉  ❤  ❀
//     var snow_data = ["❉", "✻", "✼", "❄", "❅", "❆", "❈", "❉", "❊"];
//     var snow_style = 1;
//     // var flak = ;//设置要插入的标签
//     var timer = setInterval(function () {
//         snow_style = Math.round(Math.random() * snow_data.length);
//         var sizeflak = minSize + Math.random() * maxSize; //雪花的大小x
//         var startLeft = Math.random() * dw; //雪花的左边定位
//         var startopcity = 0.8 + Math.random() * 0.3; //雪花透明度
//         var endpositionTop = dhight - 100; //雪花距底部消失的距离
//         var endLeft = Math.random() * dw; //雪花左边的定位
//         var durationfull = 5000 + Math.random() * 5000; //执行时间的随机
//         $("<div class='xh'></div>")
//             .css({ position: "fixed", top: "0px" })
//             .html(snow_data[snow_style])
//             .clone()
//             .appendTo($(".snow"))
//             .css({
//                 //将标签深复制插入到也买那种的 snow
//                 "font-size": sizeflak, //设置标签里的雪花大小
//                 left: startLeft, //设置标签里的雪花大小
//                 opacity: startopcity, //设置标签里的雪花透明度
//                 color: "#f3f3f3", //设置标签里的雪花颜色
//                 "z-index": "9999",
//             })
//             .stop()
//             .animate(
//                 {
//                     //用动画走
//                     top: endpositionTop, //设置标签里的雪花的终点值
//                     left: endLeft, //不断的改变left值从而实现雪花变化的效果
//                     apacity: 0.1, //透明度慢慢的变淡
//                 },
//                 durationfull,
//                 function () {
//                     //动画执行的时间
//                     $(this).remove(); //动画执行完清除这个标签
//                 }
//             );
//     }, 10);
// }, 1);
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
        font-size: 25px;
        color: #fff;
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
    @media screen and (min-width: 1920px) {
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
    .prize_wrap_wrap{
      
      position: fixed;
      top: -100vh;
      left: 15vw;
    }
</style>
