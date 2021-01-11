import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        total: localStorage.getItem("set-total") ? JSON.parse(localStorage.getItem("set-total")) : null,//总人数
        total_list: localStorage.getItem("set-total-list") ? JSON.parse(localStorage.getItem("set-total-list")) : null,//总人数数据
        prize: localStorage.getItem("set-prize") ? JSON.parse(localStorage.getItem("set-prize")) : [
            {
                title: '参与奖',
                content: {
                    name: '牛年纪念公仔属你最牛',
                    number: 80,//奖品数
                    count: 4,//抽奖次数
                    rounds: 8,//每次轮数
                    item: 10////每轮几个奖品
                },
            },
            {
                title: '三等奖',
                content: {
                    name: '颈椎按摩仪-奥克斯颈椎按摩仪',
                    number: 50,//奖品数
                    count: 3,//抽奖次数
                    rounds: 3,//每次轮数
                    item: [
                        20,20,10
                    ]//每轮几个奖品
                },
            },
            {
                title: '二等奖',
                content: {
                    name: '康佳12L电烤箱',
                    number: 20,//奖品数
                    count: 2,//抽奖次数
                    rounds: 1,//每次轮数
                    item: 10//每轮几个奖品
                },
            },
            {
                title: '一等奖',
                content: {
                    name: '小米电视-32寸1GB+4GB人工智能',
                    number: 3,//奖品数
                    count: 1,//抽奖次数
                    rounds: 1,//每次轮数
                    item: 3//每轮几个奖品
                },
            },
            {
                title: '神秘奖',
                content: {
                    name: '两个红包666&888',
                    number: 2,//奖品数
                    count: 1,//抽奖次数
                    rounds: 1,//每次轮数
                    item: 2//每轮几个奖品
                },
            },
            {
                title: '特等奖',
                content: {
                    name: '5000元奖学金',
                    number: 1,//奖品数
                    count: 1,//抽奖次数
                    rounds: 1,//每次轮数
                    item: 1//每轮几个奖品
                },
            },
        ],
        congratulations: localStorage.getItem("set-meet") ? JSON.parse(localStorage.getItem("set-meet")) : [],   //参与奖最后人数
        prize_thr: localStorage.getItem("set-thr") ? JSON.parse(localStorage.getItem("set-thr")) : [],   //三等奖最后人数
        prize_eryi: localStorage.getItem("set-eryi") ? JSON.parse(localStorage.getItem("set-eryi")) : [],
        grant: localStorage.getItem("set-grant") ? JSON.parse(localStorage.getItem("set-grant")) : ''
    },
    getters: {
        total: ( state ) => {
            return state.total;
        },
        prize: ( state ) => state.prize,
        total_list: ( state ) => state.total_list,
        congratulations: state => state.congratulations,
        prize_thr: state =>  state.prize_thr,
        prize_eryi: state => state.prize_eryi,
        grant: state => state.grant
    },
    mutations: {
        SET_TOTAL( state , payload ){
            let serial = [];
            for(let i=1; i <= payload; i++){
                let noun;
                if (i.toString().length < 2){
                    noun = '00' + i
                } else if (i.toString().length < 3){
                    noun = '0' + i
                } else {
                    noun = '' + i
                }
                serial.push({
                    num: noun,
                    out: false
                })
            }
            state.total = payload;
            state.total_list = serial;
            localStorage.setItem("set-total", JSON.stringify(state.total));
            localStorage.setItem("set-total-list", JSON.stringify(state.total_list));
            localStorage.setItem("set-prize", JSON.stringify(state.prize));
        },

        SET_MEET(state,payload){
            state.congratulations = payload
            localStorage.setItem("set-meet", JSON.stringify(state.congratulations));
        },

        SET_THR( state , payload ){
            state.prize_thr = payload 
            localStorage.setItem("set-thr", JSON.stringify(state.prize_thr) );
        },

        SET_IONS( state , payload ){
            if (payload[1] === '2' ){
                state.prize_eryi[0] = payload
            } else if (payload[1] === '1' ){
                state.prize_eryi[1] = payload
            } else if (payload[1] === '0'){
                state.prize_eryi[2] = payload
            }
            localStorage.setItem("set-eryi", JSON.stringify(state.prize_eryi));
        },

        SET_GRANT( state , payload ){
            state.grant = payload;
            localStorage.setItem("set-grant", JSON.stringify(state.grant));
        },

        LOCALS(state) {
            localStorage.setItem("set-total", JSON.stringify(state.total));
            localStorage.setItem("set-total-list", JSON.stringify(state.total_list));
            localStorage.setItem("set-prize", JSON.stringify(state.prize));
        }
    },
    actions: {

    },
    modules: {

    }
});
