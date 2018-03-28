
var catchImg=document.getElementById('canvas-img');

    drag(catchImg);
    
    function drag(element){  
        
      var startX=0,
          ticking=false,
          raf,
          doc=document;
           
         element.addEventListener("touchstart",function(e){
	         var e=e||window.event,
	         touchs = e.touches[0];
	         e.preventDefault();       //低端安卓 touch事件 有的导致touchend事件时效  必须开始 就加   e.preventDefault()，text a ipnut textarea 几个 等标签除外   ，另外自定义移动端touchstart touchend组合的 hover事件，建议不加这个，不然页面无法滚动touchmove 开始 就加  不然抖动一下，才能touchmove， 然后才正常 尤其早些的 三星   系列自带浏览器
	         startX=touchs.pageX-(element.lefts||0);
	         
	         doc.addEventListener("touchmove",update,false);
	         doc.addEventListener("touchend",end,false);
                          
       },false);
             
       
       var update=function (e) {
    	   
             var e=e||window.event;
              if (e.touches.length > 1 || e.scale && e.scale !== 1) return;
               e.preventDefault();
              
              if(!ticking) {
            	  var touchs = e.changedTouches[0];
                   element.lefts=touchs.pageX - startX;
                  raf=requestAnimationFrame(draw);

               }
             
                ticking = true;
          };
       
        var draw= function  (){       
            ticking = false;
            var nowLeft=element.lefts;    //滑动的距离             touchmove时候，如果加阻力，可能有细小的抖动；我想应该是移动端 部分支持0.5px的缘故； parseInt的转化有点牵强；
            if(nowLeft>distance){
            	
            	nowLeft = distance;
            	
            }
            
            if(nowLeft<-distance){
            	
            	nowLeft = -distance;
            }
            
            element.style.webkitTransform=element.style.transform = "translate3D(" + nowLeft + "px,0px,0px)";
        };
         
         
        var end=function(){
           var endLeft= element.lefts;    //滑动的距离    
           
           doc.removeEventListener("touchmove",update,false);
           doc.removeEventListener("touchend",end,false);
                        
           };
               
   };