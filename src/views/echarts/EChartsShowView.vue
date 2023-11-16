
<script>
// 导入所有对象，并给这些对象合并在一起，然后起个名字叫 echarts
import * as echarts from 'echarts';

export default {
    data () {
        return {
            myChart: null
        }
    },
    methods: {
        changeType (type, x, y) {
            this.myChart.setOption({
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                toolbox: {
                    feature: {
                        saveAsImage: {

                        }
                    }
                },
                xAxis: {
                    data: x || ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: type || 'pie',
                        data: y || [5, 20, 36, 10, 10, 20]
                    }
                ]
            });
        }
    },
    //生命周期函数
    mounted() {
        // 基于准备好的dom，初始化echarts实例
        this.myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        this.changeType('pie')
    }
}
</script>

<template>
    <div>
        <el-button @click="changeType('line')">折线图</el-button>
        <el-button @click="changeType('bar')" type="primary">柱状图</el-button>
        <el-button @click="changeType('pie')" type="success">饼图</el-button>
        <el-button @click="changeType('scatter')" type="info">散点图</el-button>

        <el-button @click="changeType('line', ['冰箱','彩电','洗衣机','空调','VCD','DVD'], ['1000', '150', '5888','3500','50','550'])" type="warning">电器销量</el-button>
        <el-button @click="changeType('pie', ['草莓','榴莲','柠檬','橙子','苹果','圣女果'], ['100','80','200','500','99','666'])" type="danger">水果销量</el-button>
    </div>
    <div id="main"></div>
</template>

<style lang="scss" scoped>
#main {
    height: 600px;
    background-color: white;
}
    
</style>