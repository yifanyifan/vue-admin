

<script>
    import CryptoJS from "crypto-js"
    // import { okx } from '@/api/user'

    export default {
        data () {
            return {
                aa: 1
            }
        },
        methods: {
            test() {
            }
        },
        //生命同期函数
        mounted() {
            //获取管理员列表
            this.test()
        },
    }
</script>

<template>
    <div>
        商品列表{{ aa }}
    </div>
</template>