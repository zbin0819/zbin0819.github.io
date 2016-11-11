$(function(){
	var footerLi = $('#footer li');
	var allClassify = $('#all-cf');
	var cfWrapper = $('#cf-wraper');
	// console.log(cfWraper);
	footerLi.click(function(){
		var iIndex = $(this).index();
		footerLi.removeClass('active').eq(iIndex).addClass('active');
	});
	
	function updateNavPosition(){
		$('#swiper-container2 .active-nav').removeClass('active-nav')
		var activeNav = $('#swiper-container2 .swiper-slide').eq(mySwiper3.activeIndex).addClass('active-nav');
		if (!activeNav.hasClass('swiper-slide-visible')) {
			if (activeNav.index()>mySwiper2.activeIndex) {
				var thumbsPerNav = Math.floor(mySwiper2.width/activeNav.width())-1
				mySwiper2.slideTo(activeNav.index()-thumbsPerNav);
			}
			else {
				mySwiper2.slideTo(activeNav.index());
			}	
		}
	}
	
	//改变名称
	var classifyName = ['外套','女童','女上衣','男上衣','衬衫','夹克','卫衣','西装','T恤','女装','大衣','礼服'];
	var navActive = $('#swiper-container2 .swiper-slide');
	var classifyInfo = $('.classify-info');
	navActive.click(function(){
		var iIndex = navActive.index($(this));
		classifyInfo.text(classifyName[iIndex]);
	});
	
	//获取商品接口
	var dataValue = 1;
	var dataFlag = 0;
	var dataIndex = 0;
	var swiperSlide = $('#swiper-container2 .swiper-slide');
	swiperSlide.tap(function(){
		dataIndex = $(this).index() + 1;
		dataFlag = $(this).index();
		if(dataIndex >= 6){
			dataIndex = 6;
		}
		GetData(dataIndex,dataFlag);
	});
	function GetData(dataValue,dataFlag){
		var goodsUl = $('#goods-show ul');
//		var iTime = 0;
		/*console.log(dataFlag);
		console.log(dataValue);*/
		var sUlHtml = '';
		$.ajax({
			type: "get",
			url: "http://datainfo.duapp.com/shopdata/getGoods.php",
			dataType: "jsonp",
			async: true,//是否异步
			//data:{linenumber:5},//数据显示的条数
			data:{classID:dataValue},
			success: function(data){
				/*for(var i=0; i<goodsUl.length; i++){
					var sUlHtml = '';
					if(i % 2 === 0){
						iTime = 0;
						ForData();
					}else{
						iTime = 1;
						ForData();
					}
				}*/
				/*function ForData(){*/
					//var tmpData = data.slice(iTime*5, (iTime+1)*5);//分隔数组 道理一样
					//iTime = iTime ? 0 : 1;
					data.forEach(function(v,k){
						sUlHtml += `<li>
				        			<div class="img-wrap">
				        				<img src="`+ v.goodsListImg +`"/>
				        			</div>
				        			<div class="goods-title">`+ v.goodsName+`</div> 
				        			<div class="goods-price">
				        				<span class="now-price">`+ v.price+`</span> 
				        				<span class="ori-price">￥999</span>
				        			</div>
				        		</li>`
					});
					goodsUl[dataFlag].innerHTML = sUlHtml;
				//}
			}
		});
	}
	GetData(dataValue,dataFlag);
	
	//swiper 源码
	var mySwiper2 = new Swiper('#swiper-container2',{
	watchSlidesProgress : true,
	watchSlidesVisibility : true,
	slidesPerView : 6,
	onTap: function(){
		mySwiper3.slideTo( mySwiper2.clickedIndex);
		}
	});
	var mySwiper3 = new Swiper('#swiper-container3',{
		onSlidePrevEnd:function(){
			dataIndex --;
			dataFlag --;
			/*console.log(dataIndex);
			console.log(dataFlag);*/
			if(dataIndex <= 0){
				dataIndex = 0;
			}
			if(dataFlag <= 0){
				dataFlag = 0;
			}
			GetData(dataIndex + 1,dataFlag);
		},
		onSlideNextEnd:function(){
			dataIndex ++;
			dataFlag ++;
			if(dataIndex >= 5){
				dataIndex = 5;
			}
			if(dataFlag >= 11){
				dataFlag = 11;
			}
			GetData(dataIndex + 1,dataFlag);
		},
		onSlideChangeStart: function(){
			updateNavPosition();
		}
	});
	
	var myScroll = null;
	setTimeout(function(){
		myScroll = new iScroll('scroll-wrapper',{
			//传入配置参数
			hScrollbar: false,
			vScrollbar: false,//隐藏滚动条
		});
	},200)
});