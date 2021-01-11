<template>
  <div class="first">
    <!-- 背景图 -->
    <div class="background">
      <img :src="imgSrc"
           width="100%"
           height="100%"
           alt="" />
    </div>
    <!-- 弹框 -->
    <div class="lottery_page"
         v-if="lottery_next">
      <div class="page_top">
      </div>
      <div class="page_list">
        <ul class="flip-container">
          <li class="flipper"
              v-for="(item,index) in winners_length"
              @click="overturn_btn(item)"
              :class="item.judgment ? 'overturn_array' : '' "
              :key="index">
            <div class="front">
            </div>
            <div class="back">
              <div class="overturn">{{item.winner}}</div>
            </div>
          </li>
        </ul>
        <!-- </div> -->
      </div>
      <div class="page_returna">
        <button class="lottery_returna"
                :disabled="isReturn"
                @click="lottery_returna_click">返回</button>
      </div>
    </div>
    <!-- 主体内容 -->
    <div class="main_body_a">
      <!-- 顶部 -->
      <div class="Topa">
        <!-- <button class="btn"
                @click="btn">测试用按钮</button>
        <button>开始抽奖</button> -->
        <div class="Topa_show">
          <div class="show_border">
            <div class="show_img">
              <img src="../../assets/prize/first.jpg"
                   alt="">
            </div>
          </div>
          <div class="show_awards">
            <p>一等奖</p>
            <p>小米电视-32寸</p>
          </div>
        </div>
      </div>
      <!-- 抽奖器底座 -->
      <div class="footera">
        <div class="imgFootera">
          <button class="btn_lottery_luck">祝您中奖</button>
        </div>
        <div class="imgFooterb">
          <button @click="btn_lottery"
                  :disabled="isDisabled"
                  class="btn_lottery_click">
            抽奖啦
          </button>
        </div>
        <div class="imgFooterc">
          <button @click="btn_lottery_next"
                  class="btn_lottery_next">下一轮</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, reactive, set } from '@vue/composition-api';
import $ from 'jquery'
export default {
  setup (props, { root }) {
    //-------------------------------------------------------------------------data------------------------------------------------------------------------------

    // 页面排版需要用到的图片
    const imgSrc = require('../../assets/li/firsta.png')
    const imgFootera = require('../../assets/li/e1.png')  // 底座变换二
    const imgFooterb = require('../../assets/li/e2.png') // 底座变换一
    // const imgFooterc = require('../../assets/li/e11.png') // 点击按钮
    // const imgFooterd = require('../../assets/li/e12.png') // 中奖名单
    // 事件所需定义：
    // 参与抽奖人员
    const people = ref(root.$store.getters.total);
    //  false可以点击 true不可以点击
    // 抽奖之后按钮禁用
    const isDisabled = ref(false)
    // 弹框是否浮现 false隐藏 true显示
    const lottery_next = ref(false);
    const lottery_change = ref(true);
    // 返回按钮是否禁用
    let isReturn = ref(false)
    // 定义循环几次
    const Num = ref(0);
    let showNum = ref(0);
    // 每一轮奖品个数
    const clickNum = root.$store.getters.prize[3].content.number;
    // 抽奖轮数
    const clickRounds = root.$store.getters.prize[3].content.count;
    // 全部人员数据
    let arrayFilter = root.$store.getters.total_list;
    // 定时器
    var timer = null
    var timera = null
    var timers = null
    // 每一轮的中奖名单
    let Section_winners = reactive([]);
    // 动态数组 用于页面渲染
    let Dynamic_winners = reactive([]);
    // 要返回到vuex的中奖名单数组
    let All_winners_virector = reactive([]);
    // 判断中奖号码是否达到三个的数组
    let winners_length = reactive([]);


    var istrue = ref(true);


    //------------------------------------------------------------------------methods----------------------------------------------------------------------------
    // 点击抽奖
    const btn_lottery = () => {
      let l = localStorage.getItem('istrue');
      // console.log(l);
      if (l) {
        return alert('已经抽过奖品了');
      }
      if (Num.value < clickRounds) {
        timers = setTimeout(() => {
          lottery_next.value = true;//弹框显示
          $(".lottery_page").animate({
            top: "1.6%",
          });
        }, 500)
        isDisabled.value = true;//开始抽奖按钮禁用
        isReturn.value = true;//返回按钮禁用
        Num.value++;//判断下一轮按钮是否启用
        // console.log(clickNum);
        for (var i = 0; i < clickNum; i++) {
          var random_Number = {};
          // 1-600范围的随机数
          random_Number.winner = Math.round(Math.random() * people.value);
          random_Number.judgment = false;
          // 判断筛选出来的随机数是否在之前中过奖品
          if (!arrayFilter[random_Number.winner - 1].out) {
            winners_length.push(random_Number);// 通过判断每一轮该变量的length长度 然后输入到页面的中奖数据
            // 最后要返回到vuex的数据 
            All_winners_virector.push(arrayFilter[random_Number.winner - 1]);// 最后要汇总到这二等奖的所有中奖号码的数组
            // console.log(All_winners_virector);
            root.$store.commit('LOCALS');
            arrayFilter[random_Number.winner - 1].out = true;// 给中奖号码的out值改为true
          }else{
            i--
          }
        }
        root.$store.commit('SET_IONS',[All_winners_virector,'1']);
        localStorage.setItem("istrue", istrue);
      } else {
        alert("本轮抽奖结束")
      }
    }
    // 点击返回
    const lottery_returna_click = (() => {
      // console.log(showNum);
      if (showNum.value == 3) {
        // 抽奖弹框关闭
        lottery_next.value = false;
        // 清除定时器
        clearTimeout(timers);
        timers = null;
      }
    })
    // 跳转页面 下一项抽奖
    const btn_lottery_next = reactive(() => {
      let l = localStorage.getItem('istrue');
      // console.log(l);
      if (l) {
        if (Num.value > 0) {
          // lottery_next.value = false;
          let nextPage = root.$router.push({
            path: '/special',
          })
          window.open(nextPage.herf, '_self');
        } else {
          alert("本轮抽奖完毕，才可开启下一轮抽奖哦")
        }
      } else {
        return false
      }

    })
    // 翻牌子
    const overturn_btn = (item) => {
      if (!item.judgment) {
        item.judgment = true
        showNum.value++;
        // console.log(showNum.value);
      }
      if (showNum.value == 3) {
        // 打开的牌子达到三个 返回按钮启用 可以返回
        isReturn.value = false;
      }
    }


    return {
      // ref
      imgSrc,
      imgFootera,
      imgFooterb,
      isDisabled,
      Dynamic_winners,
      isReturn,
      Num,
      winners_length,
      // methods
      btn_lottery,
      lottery_returna_click,
      lottery_next,
      btn_lottery_next,
      overturn_btn
    }
  }
}
</script>
<style lang="scss" scoped>
.first {
  .btn {
    width: 80px;
    height: 40px;
    line-height: 40px;
  }
  .background {
    width: 100%;
    height: 100%; /**宽高100%是为了图片铺满屏幕 */
    z-index: -1;
    position: absolute;
  }
  // 遮罩层
  .lottery_page {
    z-index: 1000;
    background-color: violet;
    width: 90%;
    height: 80%;
    margin-left: 2.5%;
    margin-top: 2%;
    position: absolute;
    border-image-source: url("../../assets/li/backgrounda.png");
    border-style: solid;
    border-image-slice: 25 fill;
    border-image-repeat: stretch;
    border-width: 3.125rem;
    background-color: rgba(0, 0, 0, 0.1);
    .page_top {
      width: 80%;
      height: 10%;
      margin: -2.5% auto 0 auto;
      box-sizing: content-box;
      background: url("../../assets/li/e10.png") no-repeat;
      background-size: 100% 100%;
    }
    .page_list {
      width: 98%;
      height: 78%;
      box-sizing: border-box;
      padding: 0 1% 0 1%;
      margin: 0 auto;
      //  翻牌子
      ul,
      li {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      ul {
        // margin-left: -20px;
        width: 100%;
        height: 100%;
        text-align: center;
        box-sizing: border-box;
        padding-top: 3%;
        li:nth-child(2) {
          margin: 0 12%;
        }
      }
      .flipper {
        // transition: transform 0.6s ease-out;
        transition: transform 0.5s ease-in-out;
        transform-style: preserve-3d;
        display: inline-block;
        position: relative;
        width: 283px;
        height: 466px;
        overflow: hidden;
      }
      .overturn_array {
        .back {
          transform: rotateY(0deg);
          z-index: 2;
        }
        .front {
          transform: rotateY(180deg);
          z-index: 1;
        }
      }
      .front,
      .back {
        backface-visibility: hidden;
        transition: 0.6s ease-out;
        -webkit-transition: 0.6s ease-out;
        transform-style: preserve-3d;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        .overturn {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          text-align: center;
          box-sizing: border-box;
          padding-top: 60%;
          font-size: 73px;
          color: red;
        }
      }
      .front img,
      .back img {
        width: 100%;
        height: 100%;
        overflow: hidden;
        // opacity: 0.6;
      }
      .front {
        z-index: 2;
        transform: rotateY(0deg);
        // border: 1px solid #000;
        background: url("../../assets/li/user1.png");
        background-size: 100% 100%;
      }
      .back {
        z-index: 1;
        transform: rotateY(-180deg);
        // border: 1px solid #fff;@/assets/li/user2.jpg
        background: url("../../assets/li/user2.jpg");
        background-size: 100% 100%;
      }
      // }
    }
    .page_returna {
      box-sizing: border-box;
      width: 19%;
      height: 11%;
      margin: 2% auto 0 auto;
      background: url("../../assets/li/e11.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      .lottery_returna {
        width: 100%;
        height: 100%;
        outline: 0;
        border: none;
        background-color: transparent;
        color: white;
        font-size: 22px;
      }
    }
  }
  // 主体内容
  .main_body_a {
    width: 100%;
    height: 100%;
    z-index: 1;
    position: absolute;
  }
  .Topa {
    width: 100%;
    height: 77%;
    box-sizing: border-box;
    padding-top: 6.5%;
    .Topa_show {
      width: 20.3%;
      height: 83%;
      margin: 0 auto;
      border: 1px solid white;
      border-radius: 8px;
      box-shadow: 0 0 1rem 0 #ffc800, inset 0 0 6.25rem 0 #ffc800;
      position: relative;
      .show_awards {
        margin: 0 auto;
        display: block;
        width: 83%;
        height: 25%;
        // line-height: 25%;
        padding-top: 10%;
        text-align: center;
        box-sizing: border-box;
        color: white;
        p:first-child {
          font-size: 24px;
        }
        p:last-child {
          font-size: 18px;
        }
      }
      .show_border {
        width: 83%;
        height: 61.8%;
        margin: 8.51% auto 0 auto;
        border: 1px solid #fff;
        border-radius: 8px;
        background-color: rgba(0, 0, 0, 0.6);
        box-shadow: 0 0 1rem 0 #ffc800, inset 0 0 6.25rem 0 #ffc800;
        .show_img {
          // width: 4.67%;
          width: 96%;
          height: 96%;
          margin: 2% auto 0 auto;
          background-color: pink;
          img {
            display: inline-block;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .footera {
    margin: 0 auto;
    width: 55.3%;
    height: 8%;
    text-align: center;
    border-image-source: url("../../assets/li/backgrounda.png");
    border-style: solid;
    border-image-slice: 25 fill;
    border-image-repeat: stretch;
    border-width: 3.125rem;
    background-color: rgba(0, 0, 0, 0.1);
    .imgFootera {
      display: inline-block;
      width: 19%;
      height: 100%;
      color: white;
      font-size: 16px;
      .btn_lottery_luck {
        width: 100%;
        height: 100%;
        outline: 0;
        border: none;
        background-color: transparent;
        color: white;
        font-size: 18px;
      }
    }
    .imgFooterb {
      display: inline-block;
      margin: 0 3% 0 3%;
      width: 22%;
      height: 100%;
      .btn_lottery_click {
        width: 100%;
        height: 100%;
        border: none;
        text-align: center;
        background: url("../../assets/li/firstc.png") no-repeat;
        background-size: 100% 100%;
        background-color: transparent;
        outline: 0;
        color: white;
        font-size: 22px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .imgFooterc {
      display: inline-block;
      width: 19%;
      height: 100%;
      box-sizing: border-box;
      color: white;
      font-size: 16px;
      .btn_lottery_next {
        width: 100%;
        height: 100%;
        outline: 0;
        border: none;
        background-color: transparent;
        color: white;
        font-size: 18px;
      }
    }
  }
}
</style>
