Vue.use(VueLazyload,{
    preLoad: 1.3,
    error: 'img/error.png',
    loading: 'http://www.sucaijishi.com/uploadfile/2013/0527/20130527034916454.gif',
    attempt: 1,
    listenEvents: [ 'scroll' ]
})
// vue列表渲染
var vue = new Vue({
    el:'#app',
    data:{
        // 定位
        params:{
            userId:'',
            productName:'',
            latitude:'',
            longitude:'',
            pageNum:1,
            num:6,
            mark:0
        },
        location:'定位中.....',
        // 定位ending
        params2:{
            pageNum:1,
            num:8,
            source:'淘宝',
            bigTypeName:'',
            productType:0,
            productName:'',
        },
        hotList:[],
        imgList:[],
        tabList:[],
        // 商家
        shopListheaer:[],
        allnearshopList:[],
        alldiconList:[],
        allbuyList:[],
        // 电商购
        taobaoList:[],
        jindongList:[],
        pingduoList:[],
        index:0,//商家下表
        indexTab:0,//电商购下表
        sum:'',
        sum2:'',
        sum3:'',
        sum4:'',
        sum5:'',
        sum6:'',
        title:''
    },
    methods:{
        // 搜suo
        searchShop(){
            this.params2.productName = this.params.productName;
            if(this.params.mark==0){
                this.allnearshopList = getList('shopPage/nearbyShops',this.params,false).list;
                this.sum = getList('shopPage/nearbyShops',this.params,false).sum;
                this.getallShop()
            }
            if(this.params.mark==1){
                this.alldiconList = getList('shopPage/nearbyShops',this.params,false).list;
                this.sum2 = getList('shopPage/nearbyShops',this.params,false).sum;
                this.getallShop()
            }
            if(this.params.mark==2){
                this.allbuyList = getList('shopPage/nearbyShops',this.params,false).list;
                this.sum3 = getList('shopPage/nearbyShops',this.params,false).sum;
                this.getallShop()
            }
        },
        getallShop(){
            if(this.indexTab==0){
                this.taobaoList = getList('powerPurchaser/getProductListByType',this.params2,false).list;
                this.sum4 = getList('powerPurchaser/getProductListByType',this.params2,false).sum;
            }else if(this.indexTab==1){
                this.jindongList = getList('powerPurchaser/getProductListByType',this.params2,false).list;
                this.sum5 = getList('powerPurchaser/getProductListByType',this.params2,false).sum;
            }else if(this.indexTab==2){
                this.pingduoList = getList('powerPurchaser/getProductListByType',this.params2,false).list;
                this.sum6 = getList('powerPurchaser/getProductListByType',this.params2,false).sum;
            }
        },
        getallShop2(){
            if(this.params.mark==0){
                this.allnearshopList = getList('shopPage/nearbyShops',this.params,false).list;
                this.sum = getList('shopPage/nearbyShops',this.params,false).sum;
            }
            if(this.params.mark==1){
                this.alldiconList = getList('shopPage/nearbyShops',this.params,false).list;
                this.sum2 = getList('shopPage/nearbyShops',this.params,false).sum;
            }
            if(this.params.mark==2){
                this.allbuyList = getList('shopPage/nearbyShops',this.params,false).list;
                this.sum3 = getList('shopPage/nearbyShops',this.params,false).sum;
            }
        },
        open:function(index,id,name){
            this.title = name;
            $('.category-nav-detail-wrapper').css({"display":"block"});
            this.showShoplist(index)
            var params = {shopTypeId:id};
            this.shopListheaer = getList('shopPage/getShopTypeListByShopType',params,false).list;
        },
        outStyle:function(index,id,name){
            $('.category-nav-detail-wrapper').css({"display":"none"})
        },
        outstyle:function(){

        },
        showShoplist:function (index) {
            $('.category-nav-detail').eq(index).addClass('active2');
            $('.category-nav-detail').eq(index).siblings('.category-nav-detail').removeClass('active2')
        },
        // 轮播
        showBanner:function(dom,dom2,index){
            $(dom).eq(index).css({'opacity':'1'});
            $(dom).eq(index).siblings(dom).css({'opacity':'0.3'});
            $(dom2).eq(index).fadeIn();
            $(dom2).eq(index).siblings(dom2).fadeOut();
        },
        // 商家
        sliderMove(index){
            this.index = index;
            this.params.mark = index;
            this.params.pageNum=1;
            this.getallShop2()
        },
        addpage(){
            this.params.pageNum+=1;
            if(this.params.mark==0){
                this.allnearshopList = getList('shopPage/nearbyShops',this.params,false).list;
            }
            if(this.params.mark==1){
                this.alldiconList = getList('shopPage/nearbyShops',this.params,false).list;
            }
            if(this.params.mark==2){
                this.allbuyList = getList('shopPage/nearbyShops',this.params,false).list;
            }
        },
        cutPage(){
            this.params.pageNum=this.params.pageNum-1;
            this.getallShop2()
        },
        // 商家ending
        //电商购
        sliderMovedianshang(index,name){
            this.indexTab = index;
            this.params2.source = name;
            this.params2.pageNum=1;
            if(index==0){
                this.taobaoList = getList('powerPurchaser/getProductListByType',this.params2,false).list;
                this.sum4 = getList('powerPurchaser/getProductListByType',this.params2,false).sum;
            }
            if(index==1){
                this.jindongList = getList('powerPurchaser/getProductListByType',this.params2,false).list;
                this.sum5 = getList('powerPurchaser/getProductListByType',this.params2,false).sum;
            }
            if(index==2){
                this.pingduoList = getList('powerPurchaser/getProductListByType',this.params2,false).list;
                this.sum6 = getList('powerPurchaser/getProductListByType',this.params2,false).sum;
            }
        },
        addpage2(){
            this.params2.pageNum+=1;
            this.getallShop()
        },
        cutPage2(){
            this.params2.pageNum=this.params2.pageNum-1;
            this.getallShop()
        },
        // 电商购ending
        // 定位
        getLocation(){
            var _this = this;
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
                        _this.location = data.formattedAddress;
                        _this.params.latitude = getLatitude;
                        _this.params.longitude = getLongitude;
                        _this.allnearshopList = getList('shopPage/nearbyShops',_this.params,false).list;
                        _this.sum = getList('shopPage/nearbyShops',_this.params,false).sum;

                        // alert(getLongitude+'---'+getLatitude+'我的天') //弹出获得的经纬度
                        // data是具体的定位信息
                    }
                    function onError (data) {
                        _this.location = '定位失败';
                        _this.params.latitude = '';
                        _this.params.longitude = '';
                        _this.allnearshopList = getList('shopPage/nearbyShops',_this.params,false).list;
                        _this.sum = getList('shopPage/nearbyShops',_this.params,false).sum;
                        // 定位出错
                    }
                })
            };
        }
    },
    watch:{
        params:{
            handler:function (val,oldval) {
                if(this.$refs.productname.value == ''||this.$refs.productname.value.length == 0){
                    this.params.productName = this.$refs.productname.value;
                    this.params.mark = 0;
                    this.params.pageNum = 1;
                    this.params2.productName = this.$refs.productname.value;
                    this.params2.source = '淘宝';
                    this.params2.pageNum = 1;
                    this.allnearshopList = getList('shopPage/nearbyShops',this.params,false).list;
                    this.sum = getList('shopPage/nearbyShops',this.params,false).sum;
                    this.taobaoList = getList('powerPurchaser/getProductListByType',this.params2,false).list;
                    this.sum4 = getList('powerPurchaser/getProductListByType',this.params2,false).sum;
                }
            },
            deep:true
        }
    },
    created:function(){
        this.hotList = getList('shopPage/getHotWord','',false).list;
        this.imgList = getList('shopPage/getShopAdvertiseImage','',false).list;
        this.tabList = getList('shopPage/getShopTypeByLevel?level=1','',false).list;
        this.taobaoList = getList('powerPurchaser/getProductListByType',this.params2,false).list;
        this.sum4 = getList('powerPurchaser/getProductListByType',this.params2,false).sum;
    },
    mounted:function () {
        var self = this;
        this.getLocation();
        self.index = 0;

        $('.category-nav-detail-wrapper').hover(function () {
            $(this).css({"display":"block"})
        },function () {
            $(this).css({"display":"none"})
        });
    }
})