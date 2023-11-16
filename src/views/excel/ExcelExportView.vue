<script>

import { proList } from '@/api/pro'
// 1. 导入
import ExportJsonExcel from 'js-export-excel'

export default {
    data () {
        return {
            tableData: []
        }
    },
    mounted() {
        proList().then(res => {
            this.tableData = res.data
        })
    },
    methods: {
        exportClick() {
            // 2. 创建导出对象
            //文件配置
            let option = {}
            //导出文件的名称
            option.fileName = 'proList'
            //需要导出的内容
            option.datas = [
                {
                    // 需要导出的数据
                    sheetData: this.tableData,
                    // 工作表1
                    sheetName: "sheet",
                    sheetFilter: ["brand", "category", "desc", "proname", "img1", "originprice"],
                    sheetHeader: ["品牌", "分类", "描述", "商品名称", "图片地址", "产品价格"],
                    columnWidths: [5, 5, 10, 20, 30, 5], // 导出后的宽度
                }
            ];
            //3. 实现具体导出
            let toExcel = new ExportJsonExcel(option);
            toExcel.saveExcel();
        }
    },
}
</script>

<template>
    <div>
        <!-- 
            文件导出分两种方法
            第一种：直接一个 a 标签即可
            <a href="https://...jquer.js" download="">Download</a>
            第二种：自己将数据处理后然后本地保存
            
        -->
        <el-button @click="exportClick">文件导出</el-button>

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