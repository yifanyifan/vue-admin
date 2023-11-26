<script>
import { inscriptionsList } from '@/api/userOkxLink'
import * as echarts from 'echarts';

export default {
    data () {
        return {
            param: {
                //代币名称
                token: '',
                //inscription ID
                inscriptionId: '',
                //铭文编号
                inscriptionNumber: '',
                //铭文状态：success、fail，默认返回success
                state: '',
                page: '1',
                limit: '20'
            },

            tableData: {
                inscriptionsList: [],
                limit: "20",
                page: "1",
                totalInscription: "",
                totalPage: ""
            },
        }
    },
    methods: {
        getList(){
            inscriptionsList(this.param).then(res => {
                // 将时间戳转换为年月日时分秒格式
                res.data[0].inscriptionsList.forEach(item => {
                    item.time = item.time;
                    const date = new Date(Number(item.time));
                    const aa = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
                    item.time = aa;
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
    <div>
        <el-table :data="this.tableData.inscriptionsList" style="width: 100%">
            <el-table-column prop="inscriptionId" label="铭文的ID" />
            <el-table-column prop="inscriptionNumber" label="铭文编号" />
            <el-table-column prop="location" label="Location，格式为：txid:vout:offset"></el-table-column>
            <el-table-column prop="token" label="代币名称" />
            <el-table-column prop="state" label="铭文状态" />
            <el-table-column prop="msg" label="交易提示" />
            <el-table-column prop="tokenType" label="铭文类型，BRC20" />
            <el-table-column prop="actionType" label="交易类型：deploy、mint、inscribeTransfer、transfer" />
            <el-table-column prop="logoUrl" label="铭文logo" />
            <el-table-column prop="ownerAddress" label="铭文所有者地址" />
            <el-table-column prop="txId" label="最新交易hash" />
            <el-table-column prop="blockHeight" label="最新交易区块高度" />
            <el-table-column prop="contentSize" label="储存信息所占的大小(Bytes)" />
            <el-table-column prop="time" label="创建时间" />
        </el-table>
    </div>
</template>

<style lang="scss" scoped>
.header{
    margin-bottom: 16px;
}
</style>