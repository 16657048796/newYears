<template>
    <div id="namelist">
        <div class="list-warp">
            <h1 class="title">获奖名单</h1>
            <ul class="reward">
                <li v-for="(item,index) in list" 
                :key="item.id" 
                :class="item.isactive ? 'active' : '' "
                @click="switchpage(item,index)">
                    {{ item.reward }}
                </li>
            </ul>
            <div class="contents">
                <div  v-show="list[0].isactive">
                    <ul>
                        <li v-for="(word,_index) in reward" :key="'1-'+_index">
                            {{ word.num }}
                        </li>
                    </ul>
                </div>
                <div v-show="list[1].isactive">
                    <ul>
                        <li v-for="(word,_index) in reward_3" :key="'2-'+_index">
                            {{ word.num }}
                        </li>
                    </ul>
                </div>
                <div v-show="list[2].isactive">
                    <ul>
                        <li v-for="(word,_index) in reward_eryi[0][0]" :key="'3-'+_index">
                            {{ word.num }}
                        </li>
                    </ul>
                </div>
                <div v-show="list[3].isactive">
                    <ul>
                        <li v-for="(word,_index) in reward_eryi[1][0]" :key="'4-'+_index">
                            {{ word.num }}
                        </li>
                    </ul>
                </div>
                <div v-show="list[4].isactive">
                    {{ grant }}
                </div>
                <div v-show="list[5].isactive">
                    <ul>
                        <li v-for="(word,_index) in reward_eryi[2][0]" :key="'5-'+ _index">
                            {{ word.num }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref , reactive } from '@vue/composition-api';
export default {
    setup( props , context ){
//------------------------------------------------------------------------data-----------------------------------------------------------------------

        const list = reactive([
            {
                id: 20201227195301,
                reward: '参与奖',
                isactive: true
            },
            {
                id: 20201227195302,
                reward: '三等奖',
                isactive: false
            },
            {
                id: 20201227195303,
                reward: '二等奖',
                isactive: false
            },
            {
                id: 20201227195304,
                reward: '一等奖',
                isactive: false
            },
            {
                id: 20201227195305,
                reward: '特等奖',
                isactive: false
            },
            {
                id: 20201227195306,
                reward: '神秘奖',
                isactive: false
            }
        ])
        const reward = context.root.$store.getters.congratulations;
        const reward_3 = context.root.$store.getters.prize_thr;
        const reward_eryi = context.root.$store.getters.prize_eryi;
        const grant = context.root.$store.getters.grant

//----------------------------------------------------------------------methods----------------------------------------------------------------------

        const switchpage = (item,index) => {
            list.map( item => {
                item.isactive = false;
            } )
            item.isactive = true;
        }

        return {
            //-------------------------data--------------------
            list,
            reward,
            reward_3,
            reward_eryi,
            grant,
            //-------------------------methods--------------------
            switchpage
        }
    }
}
</script>

<style lang="scss" scoped>
#namelist{
    padding-top: 8%;
    .title{
        width: 100%;
        text-align: center;
        font-size: 25px;
    }
    .list-warp{
        margin: 0 auto;
        width: 60%;
        overflow: hidden;
        background-color: #fff;
    }
    .reward{
        display: flex;
        .active{
            background-color: rgb(250, 236, 191);
        }
        li{
            float: left;
            flex: 1;
            text-align: center;
            font-size: 22px;
            border: 1px solid black;
            box-sizing: border-box;
            border-radius: 5px;
        }
    }
    .contents{
        width: 100%;
        height: 400px;
        div{
            li{
                float: left;
                width: 10%;
                text-align: center;
                line-height: 60px;
                line-height: 60px;
                font-size: 18px;
            }
        }
    }
}
    
</style>