
<script>
import * as XLSX from 'xlsx';

export default {
    data () {
        return {
            tableData: []
        }
    },
    methods: {
        importClick(){
            //选择文件事件的点击事件
            this.$refs.inp.click();
        },
        importChange (event) {
            //选中文件后的回调函数
            // console.log(event.target.files[0]);
            // 1. 获取到我们选中的文件
            const file = event.target.files[0];
            // 创建文件的加载器
            const reader = new FileReader;
            // 将文件加载为数据流
            reader.readAsBinaryString(file);
            reader.onload = () => {
                // console.log(reader.result)
                // 将我们的数据流转为 js 对象
                const boxx = XLSX.read(reader.result, { type: 'binary' });
                // 将 工作表1 中的数据提出来
                let res = boxx.Sheets['Sheet1'];
                // 将 工作表1 中的内容转换成 json
                res = XLSX.utils.sheet_to_json(res);

                // console.log(res);

                this.tableData = res;
            }
        }
    }
}
</script>

<template>
    <div>
        <el-button type="success" @click="importClick">选择文件</el-button>
        <input ref="inp" hidden type="file" @change="importChange"/>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号" />
            <el-table-column label="图片">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-image :src="scope.row.img1"/>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="category" label="分类"/>
            <el-table-column prop="proname" label="名称"/>
        </el-table>
    </div>
</template>