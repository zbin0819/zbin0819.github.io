$(function(){
	//首页顶部菜单
	var barBtn = $('.bar-btn'),
		headerH = $('header'),
		topBarLi = $('.top-bar li'),
        flag = true;	
	barBtn.click(function(){
		if(flag == true){
			barBtn.css({background:'url(../b5m/img/iconred.png) no-repeat center center'});
			barBtn.css({backgroundSize:'60% 60%'});
			headerH.animate({height:'112px'},300);
			flag = false;
		}else{
			barBtn.css({background:'url(../b5m/img/icon.png) no-repeat center center'})
			barBtn.css({backgroundSize:'60% 60%'});
			headerH.animate({height:'56px'},300);
			flag = true;
		}
	});
	topBarLi.click(function(){
		barBtn.css({background:'url(../b5m/img/icon.png) no-repeat center center'})
		barBtn.css({backgroundSize:'60% 60%'});
		headerH.animate({height:'56px'},300);
		flag = true;
	});
})