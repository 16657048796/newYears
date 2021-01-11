<template>
  <div class="about">
    <div class="main_background">
        <img src="@/assets/bg/bg2.png" alt="">
    </div>
    <div>
        <!-- <button @click="han">aa</button> -->
    </div>
    <router-view></router-view>
    
    <div class="amount">
      <p>当前未中奖人数:</p>
      <p>{{ oktotal }} / {{ total }}</p>
    </div>
  </div>
</template>

<script>
import { reactive , computed } from '@vue/composition-api'
import $ from 'jquery'  
export default{
    setup(props,context ){
        const bianpai=reactive({
            background: "url(" + require("@/assets/main/bo.png") + ") "
        })
        setTimeout(function(){
            $(".bianpai").css({
                "top":"-50vh"
            })
            $(".main_background").css({
                left: "0",
            });
        },1)
        setTimeout(function(){
            $(".bianpai").css({
                "top":"7vh",
                "transition":"all 1s linear "
            })
        },3780)
        setTimeout(function(){
            $(".bianpai").css({
                "height":"150px",
                "lineHeight":"150px"
            })
            $(".amount").css({  
                display: "block",
            });
        },4780)
        // const b=[]
        // for(var i=0 ; i<600; i++){
        //     b.push(i)
        // }
        // console.log(b)
        // const sum=[]
        // function han(){
        //     var num=0
        //     const a=[]
        //     var timer=setInterval(function(){
        //             num++
        //             const a1=Math.round(Math.random()*b.length)
        //             console.log(a1)
        //             if(b.indexOf(a1) == 0){
        //                 b.splice(a1,1)
        //                 a.push(a1)
        //             }else{
        //                 a.push(a1)
        //                 console.log(b)
        //             }
        //             if(num==10){
        //                 clearInterval(timer)
        //                 sum.push(a)
        //                 console.log(sum)
        //             }
        //     },1000)

        // }
        
        const total = computed(() => {
            return context.root.$store.getters.total;
        });
        const oktotal = computed(() => {
            let sum = 0;
            context.root.$store.getters.total_list.map((item) => {
                if (!item.out) {
                sum++;
                }
                sum;
            });
            return sum;
        });
        return {
            oktotal,total,
            bianpai,
            
        }
    }
}

</script>
<style lang="scss" scoped>
.about {
  .main_background{
      left: 100vw;
      transition: left 3s linear;
    z-index: -1;
  }
  .bianpai{
      width: 750px;
      height:10px;
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
  .amount {
    display: block;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    position: fixed;
    bottom: 0;
    right: 0;
    color: #fff;
    padding: 0px 30px;
    border-radius: 50px;
    background: rgba($color: #000000, $alpha: 0.5);
    p {
      display: inline-block;
    }
    p:last-of-type {
      color: #f90;
    }
  }
}
</style>
