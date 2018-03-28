/**
 * 
 * @authors Your Name (you@wangdan)
 * @date    2018-01-29 11:34:02
 * @version $Id$
 */

var canvasImage=$('.canvasImage');//接物体元素的父级
var canvasCatch=$('#canvas-car');//移动的接物体元素
var canvas=document.getElementById('canvas');//绘制掉落物体的canvas画布
var ctx=canvas.getContext('2d');//设置canvas画布的宽高
canvas.width=$(window).width();
canvas.height=$(window).height();
var canvasW=canvas.width;
var canvasH=canvas.height;




var carW='';
var carH='';
var lastTime,deltaTime,deltaTimeflag;
var balls;
canvasImage.css({//设置接物体元素的父级的大小，base是用来适配的百分比，以iphone6的大小为手稿
	"width":canvasW,
	"height":128*base+'px'
});
canvasCatch.css({//设置接物体元素的大小
	"width":128*base+'px',
	"height":128*base+'px'
});
carW=128*base;//后面用来控制移动不要超过外边框
carH=128*base;
//掉落物体的图片和得分列表
var imgList=[];

//可移动的最大距离
var distance=(canvasW-carW)/2;
   var imgList=[
		{
		    imgUrl:'img/ball.png',
		    imgSroce:4
		  },
		  {
		    imgUrl:'img/ball.png',
		    imgSroce:3
		  },
		  {
		    imgUrl:'img/ball.png',
		    imgSroce:2
		  },
		  {
		    imgUrl:'img/ball.png',
		    imgSroce:1
		  },
		  {
		    imgUrl:'img/ball.png',
		    imgSroce:1
		  },
		  {
		    imgUrl:'img/boom.png',
		    imgSroce:-5
		 }
   ];

balls=new ballObj();
   
function game(){
	
	init();
	lastTime=Date.now();
	deltaTime=0;
	gameloop();
}

function init() {
	balls.init(80*base,80*base);
}

function gameloop() {
	
	if(begin){
		ctx.clearRect(0,0,canvasW,canvasH);
		var now=Date.now();
		deltaTimeflag=now-lastTime;
		deltaTime =  deltaTimeflag<20? deltaTimeflag:20;
		lastTime=now;
		BasketMonitor();
		balls.draw();
		balls.Collision();
		requestAnimationFrame(gameloop);
	}else{
		ctx.clearRect(0,0,canvasW,canvasH);
	}
	$('.score').empty().text(balls.score);
	
	
}



