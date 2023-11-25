<script>
import { longShortAccountRatio,supportCoin,loanRatio } from '@/api/user'
import * as echarts from 'echarts';

export default {
    data () {
        return {
            legendData: [],
            series: [],
            data: {},

            legendDataTwo: [],
            seriesTwo: [],
            dataTwo: {},
            apiCalls: [
                { ccy: "BTC", begin: 1698768000000, end: new Date().getTime() },
                { ccy: "ETH", begin: 1698768000000, end: new Date().getTime() },
                { ccy: "RNDR", begin: 1698768000000, end: new Date().getTime() },
                { ccy: "ARB", begin: 1698768000000, end: new Date().getTime() },
                { ccy: "AGIX", begin: 1698768000000, end: new Date().getTime() },
                // { ccy: "ORDI", begin: 1698768000000, end: new Date().getTime() },
                // { ccy: "BLUR", begin: 1698768000000, end: new Date().getTime() },
                // { ccy: "YFII", begin: 1698768000000, end: new Date().getTime() },
            ]
        }
    },
    methods: {
        //获取所有支持币种
        supportCoin(){
            supportCoin().then(res => {
                console.log(res);
            })
        },
        //合约多空持仓人数比
        async changeType(){
            const responses = await Promise.all(this.apiCalls.map(apiCall => longShortAccountRatio(apiCall)));

            responses.forEach((res, index) => {
                const ccy = this.apiCalls[index].ccy;
                (this.data[ccy] ??= []).push(...res.data.map(item => [new Date(parseInt(item[0])).toLocaleString(), item[1]]));

                if (!this.series.find(series => series.name === ccy)) {
                    this.series.push({
                        name: ccy,
                        type: 'line',
                        showSymbol: false,
                        data: this.data[ccy]
                    });
                    this.legendData.push(ccy);
                }
            });

            this.initCharts('main','合约多空持仓人数比', this.legendData, this.series);
        },

        //杠杆多空比
        async changeTypeTwo(){
            const responses = await Promise.all(this.apiCalls.map(apiCall => loanRatio(apiCall)));

            responses.forEach((res, index) => {
                const ccy = this.apiCalls[index].ccy;
                (this.dataTwo[ccy] ??= []).push(...res.data.map(item => [new Date(parseInt(item[0])).toLocaleString(), item[1]]));

                if (!this.seriesTwo.find(series => series.name === ccy)) {
                    this.seriesTwo.push({
                        name: ccy,
                        type: 'line',
                        showSymbol: false,
                        data: this.dataTwo[ccy]
                    });
                    this.legendDataTwo.push(ccy);
                }
            });

            this.initCharts('main2','杠杆多空比 ', this.legendDataTwo, this.seriesTwo);
        },

        //初始化图表
        initCharts(id, title, legendData, series){
            let chart = echarts.init(document.getElementById(id));
            chart.setOption({
                title: {
                    text: title
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    //type: value数值轴、category类目轴、time时间轴、log对数轴
                    type: 'time',
                    splitLine: {
                        //是否现实分隔线
                        show: true
                    }
                },
                yAxis: {
                    type: 'value',
                    //留白策略
                    boundaryGap: [0, '10%'],
                    splitLine: {
                        show: true
                    },
                    scale: true,
                },
                legend: {
                    data: legendData
                },
                series: series,
                tooltip: {
                    //坐标轴触发
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
            });
        }
    },
    mounted() {
        //合约多空持仓人数比 
        this.changeType();
        this.changeTypeTwo();
        // this.supportCoin();
    }
}
</script>

<template>
    <div id="main"></div>
    <div id="main2"></div>
</template>

<style lang="scss" scoped>
#main {
    height: 600px;
    background-color: white;
}
#main2 {
    height: 600px;
    background-color: white;
}
</style>