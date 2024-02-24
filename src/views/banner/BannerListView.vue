<script>
import { longShortAccountRatio,supportCoin,loanRatio } from '@/api/user'
import * as echarts from 'echarts';

export default {
    data () {
        return {
            legendData: [],
            series: [],
            data: {},
            data2: [],

            legendDataTwo: [],
            seriesTwo: [],
            dataTwo: {},
            apiCalls: [
                //"SATS","ORDI","STX","AIDOGE","BTC", "AXS","DOT",
                //"ARB","OP","APT","AVAX","AAVE","ATOM","ADA","MATIC","LINK","SUI"
                //"LTC","ETH","FIL","XRP","YFI","YFII","SOL","GRT","IMX",
                //"SAND","SHIB","DOGE","PEPE","EOS","ETC","ETHW","FLOW","GALA"
                //"AR","ANT","PEOPLE","TRX","WAVES","REN","SLP","BAT","BCH",
                //"SUSHI","UNI","MANA","MASK","KSM","LDO","MAGIC","CFX","COMP","CRV",
                "BNB","RON","NEAR","MINA","MKR","WLD","RNDR","DYDX","ENS",

                //波动大在底部
                //"FIL","DOGE","SLP","MASK","RON","APT","MATIC","SUI","ORDI",

            ],
            currentApiCallIndex: 0, // 记录当前轮询的apiCall索引
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
            for(var yy = 0; yy < 5; yy++){
                //发起请求
                const apiCall = { ccy: this.apiCalls[this.currentApiCallIndex], begin: new Date().getTime() - 30 * 24 * 60 * 60 * 1000, end: new Date().getTime(), period: "1H" };
                const response = await longShortAccountRatio(apiCall);
                
                
                this.data2=[];
                this.data2.push(...response.data.map(item => [new Date(parseInt(item[0])).toLocaleString(), item[1]]));
                // 查找是否已存在该币种的 series
                const ccy = apiCall.ccy;
                const existingSeries = this.series.find(series => series.name === ccy);
                //如果已存在，则更新数据；否则，添加新的 series
                if (existingSeries) {
                    existingSeries.data = this.data2;
                } else {
                    this.series.push({
                        name: ccy,
                        type: 'line',
                        showSymbol: false,
                        smooth: true,
                        emphasis: {
                            focus: 'series'
                        },
                        endLabel: {
                            show: true,
                            formatter: '{a}',
                            distance: 5
                        },
                        data: this.data2
                    });
                    this.legendData.push(ccy);
                }
                this.initCharts('main', '合约多空持仓人数比', this.legendData, this.series);

                // 增加索引，循环选择下一个 apiCall
                this.currentApiCallIndex = (this.currentApiCallIndex + 1) % this.apiCalls.length;
            }
        },
        // 启动定时器，在每5秒调用一次changeType方法
        startPolling() {
            this.pollingInterval = setInterval(() => {
                this.changeType();
            }, 10000);
        },
        // 停止定时器
        stopPolling() {
            clearInterval(this.pollingInterval);
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
                    boundaryGap: [0, '2%'],
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
        this.startPolling();
        //this.changeType();
        // this.changeTypeTwo();
        // this.supportCoin();
    },
    beforeDestroy() {
        // 在组件销毁前停止轮询
        this.stopPolling();
    }
}
</script>

<template>
    <div id="main"></div>
    <div id="main2"></div>
</template>

<style lang="scss" scoped>
#main {
    height: 1100px;
    background-color: white;
}
#main2 {
    height: 1000px;
    background-color: white;
}
</style>