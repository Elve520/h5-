/**
 * 
 * @authors Your Name (you@wangdan)
 * @date    2018-01-29 11:37:14
 * @version $Id$
 */

var car=$('#canvas-img');

var TempScore;
var ballObj=function () {
	this.pic=[];
	this.w=[];
	this.h=[];
	this.x=[];
	this.y=[];
	this.spa=[];//速度
	this.alive=[];
	this.score=0;
	this.imgScore=[];
	this.image=[];
};
ballObj.prototype.num=7;
ballObj.prototype.init=function(w,h){
	this.image=imgList;
	for(var i=0;i<this.num;i++){
		var num=Math.abs(Math.floor(getNumberInNormalDistribution(3,1))%(this.image.length));
		this.w[i]=w;
		this.h[i]=h;
		this.x[i]=getRandom(0,canvasW-100);
		this.y[i]=-2*Math.random()*50;
		this.spa[i]=Math.random()*0.01+0.05;
		this.pic[i]=new Image();
		this.pic[i].src=this.image[num].imgUrl;
		this.imgScore[i]=this.image[num].imgSroce;
		this.alive[i]=false;//物体是否出现在屏幕中
	}
	
};
ballObj.prototype.draw=function(){
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			this.y[i]+=this.spa[i]*10;
			ctx.drawImage(this.pic[i],this.x[i],this.y[i],this.w[i],this.h[i]);
			if(this.y[i]>canvasH){
				this.alive[i]=false;
			}
		}
	}
	
};

ballObj.prototype.showBorn=function(i){
	var num=Math.floor(Math.random()*(this.image.length));
	this.x[i]=getRandom(0,canvasW-100);
	this.y[i]=-5*Math.random()*100;
	this.pic[i].src=this.image[num].imgUrl;
	this.imgScore[i]=this.image[num].imgSroce;
	this.alive[i]=true;
	if(balls.score>100){
		balls.spa[i]=Math.random()*0.15+0.5;
	}
	if(balls.score>200){
		balls.spa[i]=Math.random()*0.2+0.5;
	}
	if(balls.score>400){
		balls.spa[i]=Math.random()*0.3+0.5;
	}else{
		balls.spa[i]=Math.random()*0.1+0.5;
	}
};

ballObj.prototype.Collision=function(){//检测碰撞
	var carX=car.offset().left;

	var carY=car.offset().top;

	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			
			if(this.y[i]>carY-this.h[i]&&this.x[i]>carX-this.w[i]+10&&this.x[i]<carX+carW-10){
				this.alive[i]=false;
				if(this.imgScore[i]<0){
					$('.score-add').addClass('red');
					$('.score-add').html(this.imgScore[i]);
				}else{
					$('.score-add').removeClass('red');
					$('.score-add').html('+'+this.imgScore[i]);
				}
				$('.score-add').show();
				TempScore=this.score+this.imgScore[i];
				if(TempScore<0){
					this.score=0;
				}else{
					this.score=TempScore;
				}
				var timerhide=setTimeout(function(){
					$('.score-add').hide();
					clearTimeout(timerhide);
				},100);

			}
		}
	}
};




function BasketMonitor(){
	var num=0;
	for(var i=0;i<balls.num;i++){
		if(balls.alive[i]) num++;
	}
	if(num<6){
		//让果实出现
		sendBasket ();
		return;
	}
}
function sendBasket () {
	for(var i=0;i<balls.num;i++){
		if(!balls.alive[i]){
			balls.showBorn(i);
			return;
		}
	}
}
