<template>

  <div class="mysterious"  :style="bianpai" >
    <div class="context">
    <div class="header-img"><img src="../../assets/wpfing/header.png" alt="" style>
    <p class="font">神秘大奖</p>
    </div>
      <div class="subject">
        <div class="subject_left">
           <img src="../../assets/wpfing/reda.gif" alt="">
        </div>
          <div class="subject_right">
            <p class="six ">666</p>
            <p class="eatn ">888</p>
             <div class="red_baoone">
                  <p class="active"><img src="../../assets/wpfing/1.png" alt=""></p>
                  <p class="p">000</p>
             </div>
             <div class="red_baotwo">
                  <p class="active"><img src="../../assets/wpfing/1.png" alt=""></p> 
                  <p class="ptwo" >000</p>
             </div>
        </div>
    </div>

      <div class="footer-img">
           <img src="../../assets/wpfing/footer.png" alt="">
           <button @click="begin" class="begin">点击抽奖</button> 
           <button class="btn" @click="btn">查看获奖表</button>
      </div>
      <!--遮罩层-->
       <div class="mark"  v-show='close'>
         <span class="ce_img1"><img src="../../assets/wpfing/ce.jpg" alt=""></span>
              <p class="ptwo" >000</p>
              <div class="slot" @click="toggle">X</div>
               <p class="p">000</p>
               <span class="contest_img"><img src="../../assets/wpfing/OIP0HNNARGX.jpg" alt=""></span>
               <p class="six ">666</p>
               <p class="eatn ">888</p>
               <p  class="title">获奖名单</p>
          <span class="ce_img2"><img src="../../assets/wpfing/ce.jpg" alt=""></span>   
       </div>
       <div class="marka" v-if="close">
      </div>
   </div>
     
     
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, set } from "@vue/composition-api";
import $ from 'jquery'
export default {
  setup(props, { root, refs }) {
    //-------------------------------------------------------------------------data------------------------------------------------------------------------------
    // const list = reactive([]);//数据
    const bianpai = reactive({
      background: "url(" + require("../../assets/wpfing/bg2.png") + ")",
    });
    const close=ref(false)
    const random_list = reactive([]);//随机数
    const random_list_two = reactive([])
    const peopleAll = root.$store.getters.total-1;//抽奖人数量
    const list = root.$store.getters.total_list;
    const number = root.$store.getters.prize[4].content.item;//抽奖个数
    const timers=ref(null);
    const timer=ref(null);
    const onenumber=reactive([])//最后返回的数据
    const timersa=ref(null)
    //------------------------------------------------------------------------methods----------------------------------------------------------------------------
    //跳转
        const btn = reactive(() => {
         
          let nextPage = root.$router.push({
            path: '/namelist',
          });
            window.open(nextPage.herf, "_self");  
        })
      const  toggle = ()=>{
        close.value=false
        clearInterval(timersa.value);
        timersa.value= null;
      }
        const begin = reactive(() => {
           if($('.begin').html()=='点击抽奖'){
              timers.value=setInterval(()=>{
                  var randm = Math.round(Math.random()*peopleAll);
                  var randmtow = Math.round(Math.random()*peopleAll);
                   $('.p').html(randm)
                   $('.ptwo').html(randmtow)
                   
                    if(!list[randm-1].out){
                      list[randm-1].out=true;
                      random_list.push(list[randm-1])
                      root.$store.commit('LOCALS');
                    }
                      if(!list[randmtow-1].out){
                      list[randmtow-1].out=true;
                      random_list_two.push(list[randmtow-1])
                      root.$store.commit('LOCALS');
                    }
                    onenumber.push(random_list)
                    onenumber.push(random_list_two);
                    root.$store.commit('SET_IONS',[ [ onenumber[0][1]],[onenumber[1][0] ] , '0' ] )
                   if(random_list.length >= 1){
                     clearInterval(timers.value);
                     timers.value= null;  
                       $('.begin').disabled=false
                   }
              },2000)
              //console.log( onenumber)
              //数字跳动
              timer.value=setInterval(()=>{
              var random_list=Math.round(Math.random()*peopleAll)
               var random_list_two=Math.round(Math.random()*peopleAll)
                $('.begin').html('抽奖中').disabled=true
                $('.p').html(random_list)
                $('.ptwo').html(random_list_two)
                 if(timers.value == null){
                    clearInterval(timer.value);
                    timer.value=null;
                    $('.p').html(onenumber[0][0].num)
                    $('.ptwo').html(onenumber[1][0].num)  
                     $('.begin').html('抽奖完毕').disabled=true
                    timers.value=setTimeout(()=>{
                    close.value=true
                         $(".mark").animate({
                            top:"78%",
                            
                          });
                    } ,1000)
                 }
              },10)
            
           }
        });
    return{
      btn,
      begin,
      list, 
      timers,
      random_list,
      peopleAll,
      timer,
      onenumber,
      random_list_two,
      bianpai,
      close,
      toggle
    };
  },
};
</script>


<style lang="scss" scoped>
.mysterious { 
  .marka{
    position: absolute; 
    top:0;
    left:0;
    width:100%;
    height:105%;
    background-color:black;
    z-index:50;
    opacity:0.8;
  }
  overflow: hidden;
     .mark{
       position: absolute;  
       top:50%;
       left:50%;
       margin-top:-30%;
       margin-left:-40%;
       width:80%;
       height:75%;
       background-color:rgba(59,0,0,0.9);
       border:7px solid #DD9732;
       border-radius:3%;
       box-shadow:4px 7px 7px 7px #DD9732; 
       box-shadow:-8px -8px 5px #DD9732;   
       z-index:100; 
       .ce_img1{
         position: absolute;
         top:0;
         left:0px;
         img{
             width:65%;
             height:65%;
         }
       }
       .ce_img2{
         position: absolute;
         top:0;
         right:0;
         img{
             width:250px;;
             height:665px;
         }
       }
       .contest_img{
          position: absolute;  
          top:0;
          left:15%;
          img{
            width:1100px;
            height:670px;
          }
       }
       .p{
          position: absolute;  
          top:17%;
          left:25%;
          height:400px;
          width:300px;
          background-color:red;
          z-index:100;
          line-height:400px;
          text-align: center;
          color: #FEF4A0;
          font-size:100px;
          border-radius:3%;
          border:5px solid  #DD9732;
          box-shadow:-4px -4px 3px #DD9732; 
           
       }
       .ptwo{
           position: absolute;  
          top:17%;
          left:55%;
          height:400px;
          width:300px;
          background-color:red;
          z-index:100;
          line-height:400px;
          text-align: center;
          color:#FEF4A0;
          font-size:100px;
          border-radius:3%;
          border:5px solid  #DD9732;
           box-shadow:-4px -4px 3px #DD9732; 
       }
       .slot{
          width:50px;
          height:50px;
          border:5px solid #DD9732;
           background-color:#C3121C;
          position: absolute;  
          top:-4%;
          left:98%;
          z-index:1000;
          border-radius: 50%;
          text-align: center;
          line-height: 50px;
          font-size:30px;
          color: #FEF4A0;
          font-weight: bold;

       }
       .six{
         position: absolute;
         top:18%;
         left:30.2%;
         width:150px;
         height:50px;
         background-color:#FF0000;
         z-index:10000; 
         text-align:center;
         line-height:50px;
         color:#FEF4A0;
         font-size:40px;
         border:3px solid  #DD9732;
         border-radius: 3%;
         border-top:none;
         box-shadow:2px 2px 2px #DD9732; 
         font-weight:bold;  
       }
       .eatn{
         position: absolute;
         top:18%;
         left:60.2%;
         width:150px;
         height:50px;
         background-color:#FF0000;
         z-index:10000; 
         text-align:center;
         line-height:50px;
         color:#FEF4A0;
         font-size:40px;
         border:3px solid  #DD9732;
         border-radius: 3%;
         border-top:none;
         box-shadow:2px 2px 2px #DD9732; 
         font-weight:bold; 
       }
       .title{
        position: relative;
         top:0;
         left:50%;
         margin-left:-160px;
         width:320px;
         height:80px;
         background-color:#FF0000;
         z-index:1000;
         box-shadow:2px 2px 2px #DD9732; 
         border:3px solid  #DD9732;
         border-radius:3%;
         border-top:none;
         font-weight: bold;
         font-size:50px;
         color:#FEF4A0;
         text-align: center;
         line-height:80px;
       }
     }
    width:100%;
    height:100%;
  .context{
    position: absolute;
    top:4%;
    left:0;
    width:100%;
    height:95vh;
    .header-img{
      position: relative;
      img{
        width:92%;
        height:90%;
      }
      .font{
      position: absolute;
      top:20%;
      left:44%;
      font-size:3.5em;
      color:#DD9732;
      letter-spacing:30px;
    }
         text-align:center;
    }
    .footer-img{
      position: relative;
       text-align:center;
       img{
        width:92%;  
        height:90%
      }
      .begin{
        position: absolute;
        top:15%;
        left:40%;
        width:20%;
        height:70%;
         background-color:#FF3333;
         font-size:40px;
         letter-spacing:30px;
         border:none;
         outline:none;
         color:#DD9732;
      }
       .btn {
             position: absolute;
             top:15%;
             left:73%;
             width:20%;
             height:70%;
             font-size:40px;
             letter-spacing:30px;
             border:none;
             outline:none;
             color:#DD9732;
             background-color:#FF3333;
          }

    }
    .subject{
      height:70%;
      width:100%;
      position: relative;
      .subject_left{
        height:90%;
        width:20%;
        border:5px solid #FFC45C;
        border-radius:5%;
        position:absolute ;
        background-color:rgba(255,51,51,0.5);
        top:10%;
        left:5%;
        img{
          height:90%;
          width:100%;
        }
      }
      .subject_right{
        height:80%;
        width:65%;
        border-radius:8%; 
        border:5px solid #FFC45C;
        position:absolute;
        top:10%;
        left:30%;
        background-color:rgba(255,51,51,0.5);
        .eatn{
           font-size:50px;
           position: absolute;
           top:5%;
           left:66%;
           color:#FFC45C;
        }
        .six{
           float:right;
           font-size:50px;
           position: absolute;
           top:5%;
           left:25%;
           color:#FFC45C;
        }
      }
    }
  }
}
.red_baoone{
  width:250px;
  height:300px;
  border:5px solid #FFC45C;
  position: absolute;
  border-radius:25px;
  top:100px;
  left:18%;
   .p{
     position: absolute;
     top:20%;
     left:28%;
     font-size:60px;
     color:white;
   }
   .active{
     img{
         width:250px;
         height:300px;
     }
    position: absolute;
    top:0;
    left:0;
   }

}
.red_baotwo{
  width:250px;
  height:300px;
  border:5px solid #FFC45C;
  position: absolute;
 border-radius:25px;
  top:100px;
  left:60%;
  .ptwo{
     position: absolute;
     top:20%;
     left:28%;
     font-size:60px;
     color:white;
   }
    .active{
     img{
         width:250px;
         height:300px;
     }
    position: absolute;
    top:0;
    left:0;
   }
}
</style>
  