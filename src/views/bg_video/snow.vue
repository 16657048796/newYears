<template>
  <div>
    <div class="snow kaiguan"></div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
    props:{
        snow_style_data:Array
    },
setup(props){
        //console.log(props.snow_style_data)
    setTimeout(function () {
        var minSize = 10;    //雪花大小初始值
        var maxSize = 30;   //雪花大小增长值
        var dhight = $(window).height(); //页面的高度雪花
        var dw =$(window).width(); //页面的宽度                                        //❉  ❤  ❀
        var snow_data=props.snow_style_data
        var snow_style=1
        // var flak = ;//设置要插入的标签
       var  timer=setInterval(function(){
            snow_style=Math.round(Math.random()*snow_data.length)
            var sizeflak = minSize+Math.random()*maxSize;//雪花的大小x 
            var startLeft = Math.random()*dw;           //雪花的左边定位
            var startopcity = 0.8+Math.random()*0.3;    //雪花透明度
            var endpositionTop= dhight-100;             //雪花距底部消失的距离
            var endLeft= Math.random()*dw;              //雪花左边的定位
            var durationfull = 5000+Math.random()*5000; //执行时间的随机
            $("<div class='xh'></div>").css({position:"fixed","top":"0px"}).html(snow_data[snow_style]).clone().appendTo($(".snow")).css({     //将标签深复制插入到也买那种的 snow 
                "font-size":sizeflak,                   //设置标签里的雪花大小
                "left":startLeft,                       //设置标签里的雪花大小
                "opacity":startopcity,                  //设置标签里的雪花透明度
                "color":"#f3f3f3",                          //设置标签里的雪花颜色
                "z-index":"9999",
            }).stop().animate({                                //用动画走
                "top":endpositionTop,                   //设置标签里的雪花的终点值
                "left":endLeft,                         //不断的改变left值从而实现雪花变化的效果
                "apacity":0.1                           //透明度慢慢的变淡
                },durationfull,function(){              //动画执行的时间
                $(this).remove()                       //动画执行完清除这个标签
            });
        },150); 
    },1)

}

}
</script>

<style>
    .snow{
        user-select: none;
    }
</style>