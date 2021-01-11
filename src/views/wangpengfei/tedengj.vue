<template>
  <div class="tedeng">
    <button class="btn" @click="btn">进入下一个奖项</button>
    <div class="prizet_wrap" :style="prizet_bg">
      <div class="prizet" :style="prizet">
        <div class="prizet_top_font prizet_top_font_top">生业绩达标年终</div>
        <div class="prizet_top_font prizet_top_font_bottom" @click="a">
          开始
        </div>
      </div>
      <div class="prizet_center">
        <ul class="flip-container">
          <li class="flipper">
            <div class="front" @click="overturn_btn">
              <img class="front_img" src="@/assets/main/san5.png" />
              <div class="overturn">
                <div class="overturn_photo">
                  <img :src="overturn_photo_man" alt="" />
                </div>
                <div class="overturn_text">{{overturn_photo_name}}</div>
              </div>
            </div>
            <div class="back">
              <img class="front_img" src="@/assets/main/san5.png" />
              <div class="overturn">
                <div class="overturn_photo">
                  <img src="@/assets/head_photo_man/1.jpg" alt="" />
                </div>
                <div class="overturn_text">{{ grant }}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, onMounted } from "@vue/composition-api";
import $ from "jquery";
export default {
  setup(props, context) {
    //-------------------------------------------------------------------------data------------------------------------------------------------------------------
    const prizet_bg = reactive({
      background: "url(" + require("@/assets/main/san3.png") + ")",
    });
    const prizet = reactive({
      background: "url(" + require("@/assets/main/san4.png") + ")",
    });
    const prizet_center = reactive({
      background: "url(" + require("@/assets/main/san5.png") + ")",
    });
    const grant = context.root.$store.getters.grant
    const overturn_photo = reactive({
      photo: [
        {
          img: require("@/assets/head_photo_man/10.jpg"),
          name: "刘一",
        },
        {
          img: require("@/assets/head_photo_man/1.jpg"),
          name: "陈二",
        },
        {
          img: require("@/assets/head_photo_man/2.jpg"),
          name: "张三",
        },
        {
          img: require("@/assets/head_photo_man/3.jpg"),
          name: "李四",
        },
        {
          img: require("@/assets/head_photo_man/4.jpg"),
          name: "王五",
        },
        {
          img: require("@/assets/head_photo_man/5.jpg"),
          name: "赵六",
        },
        {
          img: require("@/assets/head_photo_man/6.jpg"),
          name: "孙七",
        },
        {
          img: require("@/assets/head_photo_man/7.jpg"),
          name: "周八",
        },
        {
          img: require("@/assets/head_photo_man/8.jpg"),
          name: "吴九",
        },
        {
          img: require("@/assets/head_photo_man/9.jpg"),
          name: "郑十",
        },
      ],
    });
    const overturn_photo_man = ref(require("@/assets/head_photo_man/10.jpg"));
    const overturn_photo_name=ref("助学金");
    var timer=null;
    function a() {
        clearInterval(timer)
        var num=0;
      timer=setInterval(function () {
          num++
        var random = Math.floor(Math.random() * overturn_photo.photo.length);
        overturn_photo_man.value = overturn_photo.photo[random].img;
        overturn_photo_name.value = overturn_photo.photo[random].name;
        console.log(1)
        if(num>=40){
            $(".back").css({
                transform: "rotateY(0deg)",
                "z-index": 2,
            });
            $(".front").css({
                transform: "rotateY(180deg)",
                "z-index": 1,
            });
            clearInterval(timer)
        }
      }, 100);
    }
    //------------------------------------------------------------------------methods----------------------------------------------------------------------------
    const btn = reactive(() => {
      let nextPage = context.root.$router.push({
        path: "/mysterious",
      });
      window.open(nextPage.herf, "_self");
    });
    const overturn_btn = (_) => {
      $(".back").css({
        transform: "rotateY(0deg)",
        "z-index": 2,
      });
      $(".front").css({
        transform: "rotateY(180deg)",
        "z-index": 1,
      });
    };
    return {
      /////////////////////////////////////////////data///////////////////////////////////////
      prizet_bg,
      prizet,
      prizet_center,
      overturn_photo_man,overturn_photo_name,
      grant,
      ///////////////////////////////////////////methods//////////////////////////////////////
      btn,
      overturn_btn,
      a,
    };
  },
};
</script>
<style lang="scss" scoped>
.tedeng {
  .btn {
    width: 160px;
    height: 40px;
    line-height: 40px;
    position: absolute;
    z-index: 999;
    font-size: 20px;
    background-color: transparent;
    border: none;
    outline: none;
    bottom: 3%;
    color: #fff;
    right: 12%;
  }
  .prizet_wrap {
    position: fixed;
    top: 0%;
    left: 0%;
    // width: 0;
    // height: 0;
    width: 100vw;
    height: 100vh;
    background-size: 100% 100%;
    z-index: 1;
    .prizet {
      position: fixed;
      top: 0%;
      left: 0%;
      // width: 0;
      // height: 0;
      width: 100vw;
      height: 100vh;
      background-size: 100% 100%;
      .prizet_top_font {
        position: absolute;
        left: 50%;
        margin-left: -200px;
        width: 400px;
        height: 90px;
        text-align: center;
        line-height: 90px;
        font-size: 40px;
        color: #fff;
        font-weight: 600;
      }
      .prizet_top_font_top {
        top: 0;
      }
      .prizet_top_font_bottom {
        bottom: 2vh;
      }
    }
    .prizet_center {
      // width: 350px;
      width: 350px;
      height: 460px;
      position: fixed;
      top: 50%;
      left: 50%;
      margin-left: -175px;
      margin-top: -230px;
      // border: 1px solid #2a1a5a;

      .flipper {
        transition: transform 0.6s ease-out;
        transition: transform 0.5s ease-in-out;
        transform-style: preserve-3d;
        display: block;
        position: relative;
        box-sizing: border-box;
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
        .overturn {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          .overturn_photo {
            width: 200px;
            height: 200px;
            margin: 30px auto;
            img {
              width: 200px;
              height: 200px;
            }
          }
          .overturn_text {
            font-size: 40px;
            color: #fff;
            font-weight: 500;
            width: 100%;
            height: 40px;
            text-align: center;
            margin-top: 90px;
          }
        }
      }

      .front .front_img,
      .back .front_img {
        width: 350px;
        height: 100%;
        overflow: hidden;
      }

      .front {
        z-index: 2;
        transform: rotateY(0deg);
        border: 1px solid #000;
      }

      .back {
        z-index: 1;
        transform: rotateY(-180deg);
        border: 1px solid #fff;
      }
    }
  }
}

// .flip-container:hover .back {
//     transform: rotateY(0deg);
//     z-index: 2;
// }

// .flip-container:hover .front {
//     transform: rotateY(180deg);
//     z-index: 1
// }
</style>
