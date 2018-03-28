var  clientWidth = document.documentElement.clientWidth;

var base = clientWidth*2/750;//屏幕适配参数

var clientWidth=$(window).width();
	clientHeight=$(window).height();
// 获取区间随机数
function getRandom(min,max){
    //x上限，y下限
    var x = max;
    var y = min;
    if(x<y){
        x=min;
        y=max;
    }
    var rand = parseInt(Math.random() * (x - y) + y);
    return rand;
}

 (function() {
     var lastTime = 0;
     var vendors = ['ms', 'moz', 'webkit', 'o'];
     for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
     }
     
     if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
       var currTime = new Date().getTime();
       var timeToCall = Math.max(0, 16 - (currTime - lastTime));
       var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
        timeToCall);
       lastTime = currTime + timeToCall;
       return id;
      };
     
     if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
       clearTimeout(id);
      };
}());

 // 正态分布
 function getNumberInNormalDistribution(mean,std_dev){
    return mean+(randomNormalDistribution()*std_dev);
}

function randomNormalDistribution(){
    var u=0.0, v=0.0, w=0.0, c=0.0;
    do{
        //获得两个（-1,1）的独立随机变量
        u=Math.random()*2-1.0;
        v=Math.random()*2-1.0;
        w=u*u+v*v;
    }while(w==0.0||w>=1.0)
    //这里就是 Box-Muller转换
    c=Math.sqrt((-2*Math.log(w))/w);
    //返回2个标准正态分布的随机数，封装进一个数组返回
    //当然，因为这个函数运行较快，也可以扔掉一个
    //return [u*c,v*c];
    return u*c;
}