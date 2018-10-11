function getLat(){
    window.onload = function () {
        var map = new AMap.Map('container',{
           resizeEnable:true
        });
        map.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 10000,
                // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                buttonOffset: new AMap.Pixel(10, 20),
                //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                zoomToAccuracy: true,
                //  定位按钮的排放位置,  RB表示右下
                buttonPosition: 'RB'
            })
            geolocation.getCurrentPosition()
            AMap.event.addListener(geolocation, 'complete', onComplete);
            AMap.event.addListener(geolocation, 'error', onError);

            function onComplete (data) {
                var getLongitude = data.position.getLng();
                var getLatitude = data.position.getLat();
                var location = data.formattedAddress;
                document.querySelector('.current-city').innerText=location;
                document.getElementById('lattext').innerText=getLatitude;
                document.getElementById('longtext').innerText=getLongitude;
                // alert(getLongitude+'---'+getLatitude+'我的天') //弹出获得的经纬度
                // data是具体的定位信息
            }
            function onError (data) {
                return '全部'
                // 定位出错
            }
        })
    };
}