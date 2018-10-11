function getDaimg() {
    (function () {
        var xiao = document.querySelector('.xiao');
        var shou = document.querySelector('.shou');
        var xiaop = document.querySelector('.xiaopci');
        var da = document.querySelector('.da');
        var dap = document.querySelector('.dapci');
        xiao.onmouseover =  function () {
            shou.style.display = 'block';
            da.style.display = 'block';
        };
        xiao.onmouseout=function(){ //鼠标移出时隐藏.shou 和.da
            shou.style.display='none';
            da.style.display='none';
        };
        xiao.onmousemove = function (e) {
            var x = e.clientX-xiao.offsetLeft-shou.offsetWidth/2;
            var y = e.clientY-xiao.offsetTop-shou.offsetHeight/2;
            if(x<0){
                x=0;
            };
            if(x>xiao.offsetWidth-shou.offsetWidth){
                x=xiao.offsetWidth-shou.offsetWidth;
            };
            if(y<0){
                y=0;
            };
            if(y>xiao.offsetHeight-shou.offsetHeight){
                y=xiao.offsetHeight-shou.offsetHeight;
            };
            shou.style.left=x+'px';
            shou.style.top=y+'px';
            var X=x/(xiao.offsetWidth-shou.offsetWidth);
            var Y=y/(xiao.offsetHeight-shou.offsetHeight);
            dap.style.left=-X*(dap.offsetWidth-da.offsetWidth)+'px';
            dap.style.top=-Y*(dap.offsetHeight-da.offsetHeight)+'px';
        }
    })();
    return;
}