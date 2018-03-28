var catchObj=function(){
	this.x;
	this.y;//位置坐标
	this.w,
	this.h,
	this.angle;
	this.catchImg=new Image();
	
};
//初始化，确定每一个物体的位置
catchObj.prototype.init=function(w,h){
		this.x=catchWidth*0.5;
		this.y=0;
		this.w=w,
		this.h=h,
		this.angle=0;
		this.catchImg.src=root+"img/game/"+tid+"/mouth.png";
};
catchObj.prototype.draw=function(){
	//lerp x,y,this.x趋向于目标值，即鼠标移动的值
	this.x=lerpDistance(mx,this.x,0.9);
//	this.y=lerpDistance(my,this.y,0.9);
	//delta angle
//	var deltaY=my-this.y;
//	var deltaX=mx-this.x;
//	var beta=Math.atan2(deltaY,deltaX)+Math.PI;
	//lerp angle,让大鱼的角度趋向于鼠标的角度
//	this.angle=lerpAngle(beta,this.angle,0.6);
	
	
	
	ctx1.save();
//	ctx1.translate(this.x,this.y);
//	ctx1.rotate(this.angle);
	ctx1.drawImage(this.catchImg,this.x,this.y,this.w,this.h);
	ctx1.restore();
};