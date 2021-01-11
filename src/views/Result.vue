<template>
    <div class="result">
        这是result页面
        <button class="btn" @click="btn">测试用按钮</button>
    </div>
</template>

<script>
import { ref , reactive } from '@vue/composition-api';
export default {
    setup( props , context ){
//-------------------------------------------------------------------------data------------------------------------------------------------------------------
        
//------------------------------------------------------------------------methods----------------------------------------------------------------------------
        const btn = reactive( () => {
            let nextPage = context.root.$router.push({
                path: '/namelist',
            })
            window.open( nextPage.herf, '_self' );
        } )
        return {
            /////////////////////////////////////////////data///////////////////////////////////////

            ///////////////////////////////////////////methods//////////////////////////////////////
            btn
        }
    }
}
</script>
<style lang="scss" scoped>
    .result{
        .btn{
            width: 80px;
            height: 40px;
            line-height: 40px;
        }
    }
</style>
