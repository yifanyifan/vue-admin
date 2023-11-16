

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
                let timestamp = "2023-11-14T21:32:57.715Z";
                let method = "GET";
                let path = "/api/v5/rubik/stat/trading-data/support-coin";
                let secretKey = "3eb826c1-0689-4c18-8a2b-cb38fbbc9ca7";
                let PASSPHRASE = "Yifan575884."
                // console.log("ddddddddddddddddddddd");
                let sign=CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(timestamp + method +path, secretKey));
                // console.log(sign);

                // okx().then(res => {
                //     console.log(res);
                // })
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