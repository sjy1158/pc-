var vue = new Vue({
    el:'#app',
    data:{
        params:{
            id:''
        },
        dianshangShop:{},
        index:0
    },
    methods:{
        tabListisshow:function (tabindex) {
            this.index = tabindex;
        },
        open() {
            this.$alert('请扫码下载APP使用此功能', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
            });
        }
    },
    created:function(){
        var location = decodeURI(document.URL);
        this.params.id = location.split("?")[1].split("=")[1];
        this.dianshangShop = getList('powerPurchaser/getpro',this.params,false).product;
    },
    mounted:function () {
        // $('img.lazy').lazyload();
    }
})