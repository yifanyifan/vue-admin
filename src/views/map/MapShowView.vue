<script>
export default {
    data() {
        return {
            map: null
        }
    },
    methods: {
        search() {
            // console.log(event.target.value);
            // var local = new BMapGL.LocalSearch(this.map, {
            //     renderOptions:{ map: this.map }
            // });
            // local.search(event.target.value);
            var options = {
                onSearchComplete: function(results){
                    // 判断状态是否正确
                    if (local.getStatus() == BMAP_STATUS_SUCCESS){
                        var s = [];
                        for (var i = 0; i < results.getCurrentNumPois(); i ++){
                            s.push(results.getPoi(i).title + ", " + results.getPoi(i).address);
                        }
                        document.getElementById("r-result").innerHTML = s.join("<br/>");
                    }
                }
            };
            var local = new BMapGL.LocalSearch(this.map, options);
            local.search(event.target.value);
        }
    },
    mounted() {
        this.map = new BMapGL.Map("container");
        var point = new BMapGL.Point(116.404, 39.915);
        // 设置地图显示位置和缩放比例
        this.map.centerAndZoom(point, 15); 
        // 开启滚轮缩放
        this.map.enableScrollWheelZoom(true);

        this.map.setHeading(0);   //设置地图旋转角度
        this.map.setTilt(0);       //设置地图的倾斜角度

        // 1.标准地图：BMAP_NORMAL_MAP
        // 2.地球模式：BMAP_EARTH_MAP
        // 3.普通卫星地图：BMAP_SATELLITE_MAP 
        this.map.setMapType(BMAP_NORMAL_MAP);      // 设置地图类型为地球模式
        // console.log(window);

        var scaleCtrl = new BMapGL.ScaleControl({
            anchor: BMAP_ANCHOR_TOP_RIGHT 
        });  // 添加比例尺控件
        this.map.addControl(scaleCtrl);
        var zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
        this.map.addControl(zoomCtrl);
        var cityCtrl = new BMapGL.CityListControl();  // 添加城市列表控件
        this.map.addControl(cityCtrl);
        //移除控件
        //map.removeControl(new BMapGL.ScaleControl(opts));
        // 更改为自定义的地图样式（在百度控制台上配置的）
        // map.setMapStyleV2({     
        //     styleId: 'b7a44286bc3103f5539b576b15fab8d3'
        // });
         
        //标记点
        // var marker = new BMapGL.Marker(point);        // 创建标注   
        // this.map.addOverlay(marker);                     // 将标注添加到地图中
        //折线图
        // var polyline = new BMapGL.Polyline([
        //     new BMapGL.Point(116.399, 39.910),
        //     new BMapGL.Point(116.405, 39.920),
        //     new BMapGL.Point(116.425, 39.900),
        //     new BMapGL.Point(116.525, 40.000)
        // ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});
        // this.map.addOverlay(polyline);
        // 将地图位置调整到当前位置（根据浏览器，可以改为IP定位!!!）
        var geolocation = new BMapGL.Geolocation();
        const _this = this;
        geolocation.getCurrentPosition(function(r){
            // console.log(r);
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                var mk = new BMapGL.Marker(r.point);
                _this.map.addOverlay(mk);
                _this.map.panTo(r.point);
                // console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
            }
            else {
                alert('failed' + this.getStatus());
            }        
        });
    },
}
</script>


<template>
    <h3>
        地图搜索: <input type="text" @keyup.enter="search"/>
    </h3>
    <div id="container"></div> 
    <section id="r-result"></section>
</template>


<style>
#container {
    height: 600px;
}
</style>