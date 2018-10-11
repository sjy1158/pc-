var isloacl = true;
var config;
var dataType;
if(!isloacl){
    config = '',
        dataType = 'jsonp'
}else{
    config = 'http://api.kuayet.com:8080/crossindustry/',
        dataType = 'json'
}

function getList(url,params,async) {
    var arrlist = [];
    $.ajax({
        type:'get'||'post',
        url:config + url,
        data:params,
        dataType:dataType,
        async:async,
        success:function (data) {
            if(data.code==200){
                arrlist = data.data;
            }else{
                alert(data.msg);
                return;
            }
        },
        error:function (jqXHR) {
            alert('发生错误:'+jqXHR.status);
        }
    })
    return arrlist
}
