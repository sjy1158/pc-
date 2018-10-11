var vue = new Vue({
    el:'#app',
    data:{
        params:{
            shopId:''
        },
        params2:{
            shopId:''
        },
        index:0,
        shopInfo:{},
        shopProducts:[]
    },
    methods:{
        tabListisshow:function (tabindex) {
            this.index = tabindex;
        }
    },
    created:function(){
        var location = decodeURI(document.URL);
        this.params.shopId = location.split("?")[1].split("=")[1];
        this.params2.shopId = location.split("?")[1].split("=")[1];
        this.shopInfo = getList('shopPage/getShopInformation',this.params,false);
        this.shopInfo.startTime = new Date(this.shopInfo.startTime).getHours()+'：'+new Date(this.shopInfo.startTime).getMinutes()+new Date(this.shopInfo.startTime).getSeconds();
        this.shopInfo.stopTime = new Date(this.shopInfo.stopTime).getHours()+'：'+new Date(this.shopInfo.stopTime).getMinutes()+new Date(this.shopInfo.stopTime).getSeconds();
        this.shopProducts = getList('shopPage/getShopProduct',this.params2,false).list;
        // console.log(JSON.stringify(this.shopInfo));
    },
    mounted:function () {
        getDaimg();
    }
})