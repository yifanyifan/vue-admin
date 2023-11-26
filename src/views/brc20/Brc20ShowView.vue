<script>
import { tokenList } from '@/api/userOkxLink'
import * as echarts from 'echarts';

export default {
    data () {
        return {
            param: {
                //代币名称
                token: '',
                page: '1',
                limit: '20'
            },
            tableData: {
                page: "1",
                limit: "20",
                totalPage: "",
                tokenList: [],
            },
        }
    },
    methods: {
        getList(){
            tokenList(this.param).then(res => {
                // 将时间戳转换为年月日时分秒格式
                res.data[0].tokenList.forEach(item => {
                    const date = new Date(Number(item.deployTime));
                    const aa = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
                    item.deployTime = aa;
                });
                this.tableData = res.data[0];
            })
        }
    },
    mounted() {
        this.getList();
    }
}

</script>


<template>
    <div>111111111111
        <el-table :data="this.tableData.tokenList" style="width: 100%">
            <el-table-column prop="token" label="代币名称" />
            <el-table-column prop="deployTime" label="部署时间" />
            <el-table-column prop="inscriptionId" label="铭文的ID" />
            <el-table-column prop="inscriptionNumber" label="铭文编号" />
            <el-table-column prop="totalSupply" label="总供应量" />
            <el-table-column prop="mintAmount" label="已经铸造数量" />
            <el-table-column prop="transactionCount" label="总交易次数" />
            <el-table-column prop="holder" label="持有代币地址数" />
            <el-table-column prop="mintRate" label="mint 比例，以小数展示，例如：0.9543 ；保留小数点后四位" />
        </el-table>
    </div>
</template>

<style lang="scss" scoped>
.header{
    margin-bottom: 16px;
}
</style>