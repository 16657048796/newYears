<template>
    <div class="about">
        <div>当前参与人数: {{ oktotal }} / {{ total }}</div>
        <button @dblclick="setnewdata">双击修改默认值</button>
        <button @click="submit" :disabled="isdisabled">提交</button>
        <table class="table-warp">
            <tr>
                <th notit>奖项</th>
                <th notit>名称</th>
                <th notit>抽奖次数</th>
                <th notit>每次轮数</th>
                <th notit>每轮奖品数量</th>
                <th notit>奖品总数</th>
            </tr>
            <tr v-for="(items, index) in from" :key="index">
                <td notit>
                    {{ items.title }}
                </td>
                <td>
                    <input
                        type="text"
                        v-model="items.content.name"
                        :disabled="isdisabled"
                    />
                </td>
                <td>
                    <input
                        type="text"
                        v-model="items.content.count"
                        :disabled="isdisabled"
                    />
                </td>
                <td>
                    <input
                        type="text"
                        v-model="items.content.rounds"
                        :disabled="isdisabled"
                    />
                </td>
                <td>
                    <input
                        type="text"
                        v-model="items.content.item"
                        :disabled="isdisabled"
                    />
                </td>
                <td>
                    <input
                        type="text"
                        v-model="items.content.number"
                        :disabled="isdisabled"
                    />
                </td>
            </tr>
        </table>
        <div class="about_wrap">
            <input
                type="text"
                class="about_ipt"
                v-model="Total"
                @keyup.enter="btn"
                placeholder="请输入当前会场人数"
            /><button class="about_btn" @click="ok">确定</button>
            <button class="btn_start" @click="btn">开启年会活动</button>
            <input type="text" v-model="gx" @blur="grant" class="grant" placeholder="特等奖人名">
        </div>

        <p class="ping">屏幕使用1920像素体验会更好</p>
    </div>
</template>

<script>
import { ref, reactive, computed, watch } from "@vue/composition-api";
import axios from 'axios'
export default {
    setup(props, context) {
        //-------------------------------------------------------------------------data------------------------------------------------------------------------------
        const Total = ref(null);
        const isdisabled = ref(true);
        const gx = ref('')
        const grant = ( () => {
            let reg = /\S/
            if( reg.test(gx.value) ){
                context.root.$store.commit('SET_GRANT', gx.value);
            }else{
                alert('不能为空');
            }
        } )
        //------------------------------------------------------------------------methods----------------------------------------------------------------------------
        const ok = reactive(() => {
            let total;
            if (Total.value) {
                total = Number(Total.value);
                if (!isNaN(total) && total.toString().length <= 3) {
                    context.root.$store.commit("SET_TOTAL", total);
                } else {
                    alert("请正确填入1-999之间的数值");
                }
            } else {
                alert("请输入当前会场人数");
            }
        });
        const setnewdata = reactive(() => {
            isdisabled.value = !isdisabled.value;
        });
        const submit = reactive(() => {
            isdisabled.value = true;
            context.root.$store.commit("LOCALS");
        });
        const btn = reactive(() => {
            let total;
            if (Total.value) {
                total = Number(Total.value);
                if ( gx.value && !isNaN(total) && total.toString().length <= 3) {
                    context.root.$store.commit("SET_TOTAL", total);
                    let nextPage = context.root.$router.push({
                        path: "/begin",
                    });
                    window.open(nextPage.herf, "_self");
                } else {
                    alert("没有输入人数或无特等奖");
                }
            } else {
                alert("没有输入人数或无特等奖");
            }
        });
        //------------------------------------------------------------------------computed----------------------------------------------------------------------------
        const total = computed(() => {
            return context.root.$store.getters.total;
        });
        const from = computed(() => {
            return context.root.$store.getters.prize;
        });
        const oktotal = computed(() => {
            let sum = 0;
            if (context.root.$store.getters.total_list) {
                context.root.$store.getters.total_list.map((item) => {
                    if (!item.out) {
                        sum++;
                    }
                });
            }
            return sum;
        });

        return {
            /////////////////////////////////////////////data///////////////////////////////////////
            Total,
            total,
            oktotal,
            from,
            grant,
            gx,
            ///////////////////////////////////////////methods//////////////////////////////////////
            btn,
            setnewdata,
            isdisabled,
            submit,
            ok,
        };
    },
};
</script>
<style lang="scss" scoped>
.about {
    background-color: #f18d8d;
    height: 100%;
    text-align: center;
    font-size: 16px;
    .btn {
        // width: 80px;
        padding: 0px 10px;
        height: 40px;
        line-height: 40px;
    }
    .table-warp {
        margin: 0 auto;
        border: 3px solid #000;
        border-collapse: collapse;
        user-select: none;
        td,
        th {
            border: 1.5px solid #000;
            text-align: center;
            width: 200px;
            height: 40px;
            line-height: 40px;
        }
        td input {
            border: none;
            outline: none;
            text-align: center;
            width: 200px;
            height: 40px;
            line-height: 40px;
        }
    }
    .ping {
        font-size: 24px;
        width: 400px;
        margin-left: -200px;
        position: fixed;
        bottom: 100px;
        left: 50%;
    }
    .about_wrap {
        width: 1207px;
        height: 50px;
        margin: 0 auto;
        margin-top: 30px;
        padding-left: 100px;
        .about_ipt {
            float: left;
            width: 300px;
            height: 50px;
            font-size: 24px;
            box-sizing: border-box;
            padding-left: 20px;
        }
        .about_btn {
            float: left;
            width: 100px;
            height: 50px;
            line-height: 50px;
            font-size: 24px;
            border-radius: 10px;
            border: 1px solid #000;
            outline: none;
            margin-left: 30px;
        }
        .btn_start {
            float: right;
            padding: 0 14px;
            font-size: 24px;
            line-height: 50px;
            height: 50px;
            border-radius: 10px;
            margin-right: 300px;
            border: 1px solid #000;
            outline: none;
        }
        .grant{
            width: 200px;
            height: 40px;
            font-size: 18px;
            padding-left: 20px;
            box-sizing: border-box;
        }
    }
}
</style>
