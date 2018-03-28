	var time;//时长，单位：毫秒
	var timeCounter;//计时器
	var begin; //是否进行中
	var imgList;//图片组
	var eggTypeList;//蛋类别组
	var score;//得分
	var mul=$(window).width()/320;
	var startTime,endTime;
	var eggObj = function(){
		this.num;//蛋的总数
		this.defaultWidth;//蛋的宽度
		this.left = [];
		this.width = [];
		this.top = [];
		this.pic = [];	
		this.type = [];
		this.eggNum_0;
		this.eggNum_1;
	};
	var  interval = 100,count = 0;//用于修正倒计时
	
	$(function(){
		'use strict';

		time = 15*1000;//毫秒单位，持续时间
		begin = false;
		imgList = ['bq01.png','bq02.png'];
		eggTypeList = [];
		score = 0;

		var egg = new eggObj();
		egg.num = 6;//数量
		egg.defaultWidth = 80*mul;
		egg.eggNum_0 = 0;
		egg.eggNum_1 = 0;
		egg.init();

		$('.score').text(score);
		$('.countdown').text((time/1000).toFixed(2));
		//游戏开始
		$('body').on('click','.js-go-btn',function(){
			$('.go-start').hide();
				begin = true;
				countdown();//倒计时
				addClickFunc(egg);//添加点击事件
		});
	});
	
	eggObj.prototype.init = function(){//初始化
		if(eggTypeList.length>0){

//			移除最后一个元素，相应数量减一
			if(eggTypeList[eggTypeList.length-1] ===0){
				this.eggNum_0 -= 1;
			}else{
				this.eggNum_1 -= 1;
			}
			eggTypeList.pop();

			var r = Math.random();
			if(r<0.5){
				if(eggTypeList[0]==0&&eggTypeList[1]==0&&eggTypeList[2]==0&&eggTypeList[3]==0){
					eggTypeList.unshift(1);
					this.eggNum_1 += 1;
				}else{
					eggTypeList.unshift(0);
					this.eggNum_0 += 1;
				}
			}else{
				if(eggTypeList[0]==1&&eggTypeList[1]==1&&eggTypeList[2]==1&&eggTypeList[3]==1){
					eggTypeList.unshift(0);
					this.eggNum_0 += 1;
				}else{
					eggTypeList.unshift(1);
					this.eggNum_1 += 1;
				}
			}
		}else{
			for(var m = 0; m < this.num; m++){
				var r = Math.random();
				if(r < 0.5){
					if(m >= 4&&eggTypeList[m-1]==0&&eggTypeList[m-2]==0&&eggTypeList[m-3]==0&&eggTypeList[m-4]==0){
						eggTypeList.push(1);
						this.eggNum_1 += 1;
					}else{
						eggTypeList.push(0);
						this.eggNum_0 += 1;
					}
				}else{
					if(m >= 4&&eggTypeList[m-1]==1&&eggTypeList[m-2]==1&&eggTypeList[m-3]==1&&eggTypeList[m-4]==1){
						eggTypeList.push(0);
						this.eggNum_0 += 1;

					}else{
						eggTypeList.push(1);
						this.eggNum_1 += 1;
					}
				}
			}
		}

		for(var i = 0; i < this.num; i++){
			this.type = eggTypeList;
			this.pic[i] = $('<img src="img/'+imgList[eggTypeList[i]]+'" alt="">');
			this.width[i] = this.defaultWidth + i*5;
			this.left[i] = $('.game-box').width()*0.2-i*4;
			this.top[i] = i*50*mul;
			this.draw(i);
		}
	};
	
	//绘制蛋组
	eggObj.prototype.draw = function(i){
		this.pic[i].css('left',this.left[i]).css('top',this.top[i]).css('width',this.width[i]).appendTo('.game-box');
	};

	//蛋正确点击消失，加分（单个分和总分），新加一个蛋；蛋错误点击，游戏结束
	function addClickFunc(egg){
		$('.btn-list a').each(function(index){
			this.ontouchstart = function(){
			// this.click = function(){
				if(begin){
					if(index === egg.type[egg.num-1]){
						var mark=$('#scoreper').text();
						score += parseInt(mark);
						$('.score').text(score);
						$('.score-add').show();
						eggTypeList = egg.type;
						egg.init();//重画蛋组
						var timerhide=setTimeout(function(){
							$('.score-add').hide();
							clearTimeout(timerhide);
						},100);
					}else{
						endTime=new Date().getTime();
						$('.score-add').remove();
						clearTimeout(timeCounter);
						$('.countdown').text('00.00');
						begin = false;
						alert('游戏结束');
					}
				}
			};
		});
	}

	
	//倒计时,倒计时结束，游戏结束
	function countdown(){
		if(begin){
			//倒计时
	       startTime = new Date().getTime();
			if( time > 0){
	       	   timeCounter = setTimeout(countDownStart,interval);                  
			}
		}
	}
	function countDownStart(){
	       count++;
	       var offset = new Date().getTime() - (startTime + count * interval);
	       var nextTime = interval - offset;
	       var daytohour = 0; 
	       if (nextTime < 0) { nextTime = 0; };
	       time -= interval;
	       
	       if(time <= 0){
	    	   $('.countdown').text('00.00');
	       }else{
	    	   $('.countdown').text((time/1000).toFixed(2));
	       }
	       
	       if(time < 0){
	    	    endTime=new Date().getTime();
	    	    $('.score-add').remove();
	            clearTimeout(timeCounter);
				begin = false;
				alert('游戏结束');
	       }else{
	            timeCounter = setTimeout(countDownStart,nextTime);
	       }
	 }
window.addEventListener('touchstart', function(){ passive: false; });

