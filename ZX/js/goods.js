$(function(){
	var timeD = $('.timer .day');
	var timeH = $('.timer .hour');
	var timeM = $('.timer .minute');
	var timeS = $('.timer .second');
	var footerLi = $('footer li');
	var goodsWrap = $('.goods-wrap');
	var timerDiv = $('.timer');
	// console.log(goodsWrap);

	footerLi.click(function(){
		var iIndex = $(this).index();
		if(iIndex == 0){
			timerDiv.fadeIn('slow');
		}else{
			timerDiv.css({display:'none'});
		}
		goodsWrap.animate({left:'-100%'}).eq(iIndex).animate({left:0});
		footerLi.removeClass('active');
		$(this).addClass('active');
	});
	function timer(){
		var nowTime = new Date();
		var endDate = new Date('2016', '10', '29', '18', '0', '0'); 
		var remainTime = Math.floor(endDate.getTime()) - Math.floor(nowTime.getTime());
		var remainSec = parseInt(remainTime/1000);
		var day=Math.floor(remainSec/(60*60*24)); 
		var hour=Math.floor((remainSec-day*24*60*60)/3600); 
		var minute=Math.floor((remainSec-day*24*60*60-hour*3600)/60); 
		var second=Math.floor(remainSec-day*24*60*60-hour*3600-minute*60);
		timeD.text(day);
		timeH.text(hour);
		timeM.text(minute);
		timeS.text(second);
	}
	setInterval(timer,1000);

	//banner
	var mySwiper = new Swiper ('.swiper-container', {
	    loop: true,
	    // 如果需要分页器
	    //pagination: '.swiper-pagination',
	    autoplay:6000,
	    autoplayDisableOnInteraction : false,
  	});
});