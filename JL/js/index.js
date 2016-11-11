$(function(){
	//主结构
	var rotateWrap = $('.rotate-wrap'),
		imgRotate = $('.circle-img img'),
		musicBtn = $('.music-btn'),
		audioBtn = $('#audio'),
		switchPage = $('.switch-page'),
		activeLine = $('.bottom-text span'),
		lineActive = $('.personal-info .line');
	// console.log(activeLine);
	setTimeout(function(){				//设置头像延时旋转
		imgRotate.addClass('img-rotate');
		activeLine.addClass('line-active');
	},2000);
	var mySwiper = new Swiper ('.swiper-container', {
	    direction: 'vertical',
	    // loop: true,
	    // 如果需要分页器
	    pagination: '.swiper-pagination',
	    paginationType : 'progress',
	    // 如果需要滚动条
	    // scrollbar: '.swiper-scrollbar',
	    onInit:function(swiper){
	    	swiperAnimateCache(swiper); //隐藏动画元素 
	    	swiperAnimate(swiper); 		//初始化完成开始动画
	    },
	    onSlideChangeEnd:function(swiper){
	    	rotateWrap.removeClass('wrap-active');
	    	rotateWrap.css({display:'none'});
	    	imgRotate.removeClass('img-rotate');
	    	activeLine.removeClass('line-active');
	    	activeLine.css({display:'none'});
	    	lineActive.removeClass('line-active');
	    	if(swiper.activeIndex == 0){
	    		setTimeout(function(){	//页面切换后设置头像延时旋转
	    			imgRotate.addClass('img-rotate');
	    			activeLine.addClass('line-active');
	    		},2000);
	    		rotateWrap.addClass('wrap-active');
	    		rotateWrap.css({display:'block'});
	    		activeLine.css({display:'block'});
	    	}
	    	if(swiper.activeIndex == 5){
	    		switchPage.css({display:'none'});
	    	}else{
	    		switchPage.css({display:'block'});
	    	}
	    	if(swiper.activeIndex == 1){
	    		lineActive.addClass('line-active');
	    	}
	    	swiperAnimate(swiper); 		//每个slide切换结束时也运行当前slide动画
	    },
  	});
  	//音乐按钮
  	musicBtn.click(function(){
  		if($(this).data('btn') != true){
  			$(this).data('btn',true);
  			$(this).removeClass('rotate-music');
  			audioBtn[0].pause();
  		}else{
  			$(this).data('btn',false);
  			$(this).addClass('rotate-music');
  			audioBtn[0].play();
  		}
  	});  
});