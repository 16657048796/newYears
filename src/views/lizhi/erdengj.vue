<template>
  <div class="second">
    <!-- 背景图 -->
    <div class="background">
      <img :src="imgSrc"
           width="100%"
           height="100%"
           alt="" />
    </div>
    <!-- 抽奖弹框 -->
    <div class="lottery_page"
         v-show="lottery_next">
      <div class="page_top">
      </div>
      <div class="page_list">
        <!-- 中奖号码 -->
        <ul>
          <li class="frotate_wrap frotate_right"
              v-for="(itema,indexa) in replacea_winners"
              :key="indexa">
            <div class="frotate_wrap_s">
              <img src="../../assets/li/zhuan.png"
                   alt=""
                   class="xuan">
            </div>
            <div class='lottery-luckers-img frotate'>
              <p class="p">{{itema}}</p>
            </div>
          </li>
        </ul>
        <!-- 循环数据 -->
        <ul>
          <li class="frotate_wrap frotate_right"
              v-for="(item,index) in Dynamic_winners"
              :key="index">
            <div class="frotate_wrap_w">
              <img src="../../assets/li/zhuan.png"
                   alt=""
                   class="xuan">
            </div>
            <div class='lottery-luckers-img frotate'>
              <p class="p">{{item}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="page_returna">
        <button class="lottery_Timeouta"
                :disabled='disTimeout'
                @click="lottery_Timeouta_click">暂停</button>
        <button class="lottery_returna"
                :disabled="isReturn"
                @click="lottery_returna_click">返回</button>
      </div>
    </div>
    <!-- 中奖名单弹框 -->
    <div class="ListWinners"
         v-if="List_ofWinners">
      <div class="ListWinners-main">
        <span class="spana"
              v-for="(winnera,indexb) in winners_show"
              :key="indexb">{{winnera.winner}}</span>
      </div>
    </div>
    <!-- 主体内容 -->
    <div class="main_body_a">
      <!-- 顶部 -->
      <div class="Topa">
        <div class="Topa_show">
          <div class="show_border">
            <div class="show_img">
              <img src="../../assets/prize/second.jpg"
                   alt="">
            </div>
          </div>
          <div class="show_awards">
            <p>二等奖</p>
            <p>康佳12L电烤箱</p>
          </div>
        </div>
      </div>
      <!-- 抽奖器底座 -->
      <div class="footera">
        <div class="imgFootera">
          <button class="btn_lottery_luck"
                  @click="List_winners">中奖名单</button>
        </div>
        <div class="imgFooterb">
          <button @click="btn_lottery"
                  :disabled="isDisabled"
                  class="btn_lottery_click">开始抽奖</button>
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
    const imgSrc = require('../../assets/bg/bg8888.png')
    const imgFootera = require('../../assets/li/e1.png')  // 底座变换二
    const imgFooterb = require('../../assets/li/e2.png') // 底座变换一
    // 事件所需定义：
    // 参与抽奖人员
    const people = ref(root.$store.getters.total);
    //  false可以点击 true不可以点击
    // 抽奖之后按钮禁用
    const isDisabled = ref(false)
    // 抽奖弹框是否浮现 false隐藏 true显示
    const lottery_next = ref(false);
    // 中奖名单是否浮现 false隐藏 true显示
    const List_ofWinners = ref(false);
    // 暂停按钮是否禁用
    const disTimeout = ref(false);
    // 返回按钮是否禁用
    const isReturn = ref(true)
    // 定义循环几次
    const Num = ref(0);
    // 每一轮奖品个数 不会改变的 固定死的数据
    const clickNum = root.$store.getters.prize[2].content.item;
    // 每一轮奖品个数 用于减减 为了随着中奖号码的出现 而减少随机筛选的数据
    let clickaddNum = root.$store.getters.prize[2].content.item;
    // 获取总共需要抽出来的奖品个数 20个
    const clickNumAll = root.$store.getters.prize[2].content.number;
    // 抽奖轮数
    const clickRounds = root.$store.getters.prize[2].content.count;
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
    // 判断中奖号码是否达到十个的数组
    let winners_length = reactive([]);
    // 用于在中奖名单内展示的数据
    let winners_show = reactive([]);
    // 抽奖页面展示的停止的中奖数据
    var replacea_winners = reactive([]);

    //------------------------------------------------------------------------methods----------------------------------------------------------------------------
    //  抽奖函数
    const lottery_starta = () => {
      // 页面展示的数据
      // for (let i = 0; i < clickNum; i++) {
      //   let t = null
      //   t = setTimeout(() => {
      //     console.log(1 * i);
      //   }, 1000 + 500 * i)
      // }
      timera = setInterval(function () {
        Dynamic_winners.length = 0; // 动态数组清空
        for (var i = 0; i < clickaddNum; i++) {
          // 1-600范围的随机数
          var randoma = Math.round(Math.random() * people.value);
          Dynamic_winners.push(randoma);//页面10毫秒蹦跶一次的数组
        }
      }, 10);
      // 实际要用到的数据
      timer = setInterval(function () {
        // 筛选随机数 转化为对象
        var random_Number = {};
        // 1-600范围的随机数
        random_Number.winner = Math.round(Math.random() * people.value);
        // 判断筛选出来的随机数是否在之前中过奖品
        if (!arrayFilter[random_Number.winner - 1].out) {
          clickaddNum--; //页面展示的随机筛选数据随着中奖号码的不断添加而逐渐消失
          // 最后页面圆圈停止之后展示的数据 稍后会清空 是每一轮的中奖名单
          winners_length.push(random_Number.winner); // 通过判断每一轮该变量的length长度 是否停止定时器
          All_winners_virector.push(arrayFilter[random_Number.winner - 1]); // 最后要汇总到这二等奖的所有中奖号码的数组 返回vuex
          // console.log(All_winners_virector);
          winners_show.push(random_Number); // 用于在中奖名单中展示的数据
          replacea_winners.push(random_Number.winner); // 在抽奖页面中 用于替换随机筛选数据的中奖号码
          arrayFilter[random_Number.winner - 1].out = true; // 给中奖号码的out值改为true
          root.$store.commit('LOCALS');
          // console.log(random_Number);
        }
        // 判断每一轮的中奖号码数据长度是否等于10 等于10结束定时器
        if (winners_length.length == clickNum) {
          // 将每一轮的中奖号码放入总的中奖号码数组里边 最后返回到vuex
          // 大哥要接收的数据
          // All_winners_virector.push(Section_winners);
          // 暂停按钮切换内容
          root.$store.commit('SET_IONS',[All_winners_virector,'2']);
          $(".lottery_Timeouta").html("本轮抽奖结束");
          $(".lottery_Timeouta").css('color', '#cccccc')
          // 清空定时器
          clearInterval(timer);
          clearInterval(timera);
          clearTimeout(timers);
          timer = null;
          timera = null;
          timers = null;
          // 页面的动态数组清空 为了接收真正的中奖号码
          Dynamic_winners.length = 0;
          // 每一轮的中奖号码在map循环完之后 清空
          Section_winners = [];
          winners_length.length = 0;
          // 返回按钮启用
          isReturn.value = false;
          // 暂停按钮禁用
          disTimeout.value = true;
          // 随机筛选数据恢复筛选的十个
          clickaddNum = 10;
        }
      }, 1000)
    }
    // 点击抽奖
    const btn_lottery = () => {
      // console.log(clickNumAll);
      // console.log(All_winners_virector.length);
      // 暂停按钮启用
      disTimeout.value = false;
      $(".lottery_Timeouta").html("暂停");
      $(".lottery_Timeouta").css('color', 'white')
      // if ($(".btn_lottery_click").html() == '开始抽奖') {
      if (All_winners_virector.length < clickNumAll) {
        timers = setTimeout(() => {
          lottery_next.value = true;//弹框显示
          $(".lottery_page").animate({
            top: "1.2%",
          });
        }, 500)
        isDisabled.value = true; //开始抽奖按钮禁用
        isReturn.value = true; //返回按钮禁用
        // 调用抽奖函数
        lottery_starta()
      } else {
        //  false可以点击 true不可以点击
        alert("本次抽奖已经结束 请开启下一轮抽奖");
        isDisabled.value = true;
      }
    }
    // 暂停按钮
    const lottery_Timeouta_click = (() => {
      if ($(".lottery_Timeouta").html() == "暂停") {
        $(".lottery_Timeouta").html("继续抽奖")
        // // 清空定时器
        clearInterval(timer);
        clearInterval(timera);
        timer = null;
        timera = null;
      } else if ($(".lottery_Timeouta").html() == "继续抽奖") {
        // btn_lottery()
        // 调用抽奖函数
        lottery_starta()
        $(".lottery_Timeouta").html("暂停")
      }
    })
    // 点击返回
    const lottery_returna_click = (() => {
      isDisabled.value = false;
      lottery_next.value = false;
      // replacea_winners = [];//?????
      replacea_winners.length = 0;
    })
    // 跳转页面 下一项抽奖
    const btn_lottery_next = reactive(() => {
      if (All_winners_virector.length == clickNumAll) {
        let nextPage = root.$router.push({
          path: '/first',
        })
        window.open(nextPage.herf, '_self');
      } else {
        alert("本轮抽奖完毕，才可开启下一轮抽奖哦")
      }
    })
    // 中奖名单显示
    const List_winners = (() => {
      if ($(".btn_lottery_luck").html() == '中奖名单') {
        isDisabled.value = true; // 开始抽奖按钮禁用
        List_ofWinners.value = true; // 中奖名单显示
        $(".btn_lottery_luck").html("点击关闭");
      } else {
        $(".btn_lottery_luck").html("中奖名单");
        isDisabled.value = false; // 开始抽奖按钮启用
        List_ofWinners.value = false; // 中奖名单隐藏
      }
    })
    //------------------------------------------------------------------------methods----------------------------------------------------------------------------

    return {
      // ref
      imgSrc,
      imgFootera,
      imgFooterb,
      isDisabled,
      Dynamic_winners,
      isReturn,
      Num,
      List_ofWinners,
      All_winners_virector,
      winners_show,
      replacea_winners,
      disTimeout,
      // methods
      btn_lottery,
      lottery_returna_click,
      lottery_next,
      btn_lottery_next,
      List_winners,
      lottery_Timeouta_click,
    }
  }
}
</script>
<style lang="scss" scoped>
.second {
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
  // 遮罩层  抽奖弹框
  .lottery_page {
    z-index: 1000;
    background-color: violet;
    width: 90%;
    height: 80%;
    margin-left: 2.5%;
    margin-top: 2%;
    position: absolute;
    border-image-source: url("../../assets/li/show.png");
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
      height: 85%;
      box-sizing: border-box;
      padding: 0 3% 0 1%;
      margin: 0 auto;
      overflow: hidden;
      .frotate_wrap {
        margin-top: 3%;
        margin-left: 4%;
        float: left;
        width: 250px;
        height: 250px;
        position: relative;
        user-select: none;
        .frotate_wrap_s {
          width: 250px;
          height: 250px;
          position: absolute;
          top: 0;
          left: 0;
          img {
            width: 100%;
            height: 100%;
            display: inline-block;
          }
        }
        .frotate_wrap_w {
          width: 250px;
          height: 250px;
          position: absolute;
          top: 0;
          left: 0;
          img {
            width: 100%;
            height: 100%;
            display: inline-block;
            animation: foreverrotate linear infinite;
            animation-duration: 2s;
          }
        }
        .lottery-luckers-img {
          width: 150px;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 11;
          height: 150px;
          p {
            margin-top: 50px;
            margin-left: 50px;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            text-align: center;
            line-height: 150px;
            font-size: 50px;
            color: #fff;
          }
        }
      }
      @keyframes foreverrotate {
        0% {
          transform: rotate(0);
        }
        to {
          transform: rotate(-1turn);
        }
      }
    }
    .page_returna {
      box-sizing: border-box;
      // width: 19%; 19 2 2 19
      width: 42%;
      height: 8%;
      margin: 0 auto;
      text-align: center;
      .lottery_returna {
        width: 45%;
        height: 100%;
        outline: 0;
        border: none;
        float: right;
        // margin-left: 5%;
        background-color: transparent;
        color: white;
        font-size: 22px;
        background: url("../../assets/li/e11.png") no-repeat;
        background-size: 100% 100%;
      }
      .lottery_Timeouta {
        width: 45%;
        height: 100%;
        outline: 0;
        border: none;
        float: left;
        // margin-right: 5%;
        background-color: transparent;
        color: white;
        font-size: 22px;
        background: url("../../assets/li/e11.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  // 遮罩层  中奖名单
  .ListWinners {
    z-index: 1000;
    background-color: violet;
    width: 70%;
    height: 60%;
    margin-left: 15.2%;
    margin-top: 7.4%;
    position: absolute;
    background: url("../../assets/li/320.png") no-repeat;
    background-size: 100% 100%;
    border-radius: 20px;
    .ListWinners-main {
      width: 68%;
      height: 60%;
      margin: 0 auto;
      margin-top: 8%;
      // background-color: pink;
      box-sizing: border-box;
      padding: 4%;
      .spana {
        display: inline-block;
        // line-height: 50px;
        padding-top: 3%;
        height: 20%;
        width: 14%;
        text-align: center;
        font-size: 40px;
        color: orange;
        font-weight: bold;
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
    height: 21%;
    text-align: center;
    background: url("../../assets/li/e1.png") no-repeat;
    background-size: 100% 100%;
    // position: relative;
    .imgFootera {
      display: inline-block;
      margin-top: 4%;
      width: 19%;
      height: 30%;
      background: url("../../assets/li/e12.png") no-repeat;
      background-size: 100% 100%;
      // padding-top: 1.15%;
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
      margin: 4% 3% 0 3%;
      width: 22%;
      height: 40.6%;
      background: url("../../assets/li/e11.png") no-repeat;
      background-size: 100% 100%;
      .btn_lottery_click {
        width: 100%;
        height: 100%;
        border: none;
        text-align: center;
        background-color: transparent;
        outline: 0;
        color: white;
        font-size: 22px;
      }
    }
    .imgFooterc {
      display: inline-block;
      margin-top: 4%;
      width: 19%;
      height: 30%;
      background: url("../../assets/li/e12.png") no-repeat;
      background-size: 100% 100%;
      box-sizing: border-box;
      // padding-top: 1.15%;
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
