window.onload = function(){
	
	//上拉加载数据
  	var oScroll = null;
  	var oPullUp = null;
  	var oDataDiv = null;
  	var flag = 0;
  	var oPageBottom = null;
	setTimeout(function(){
		oPullUp = $('#pull-up');
  		oDataDiv = $('#main');
  		oPageBottom = $('.last');
		oScroll = new iScroll('scroll-wrapper',{
			//传入配置参数

			hScrollbar: false,
			vScrollbar: false,//隐藏滚动条
			onScrollMove:function(){
				// console.log(this.y);
				if(this.y < this.maxScrollY - 10 && !oPullUp.hasClass('active')){
					oPullUp.addClass('active').html('松手加载新的数据！');
				}else if(this.y > this.maxScrollY && oPullUp.hasClass('active')){
					oPullUp.removeClass('active').html('上拉加载！');
				}
			},
			onScrollEnd:function(){
				if(oPullUp.hasClass('active')){
					oPullUp.html('玩命加载中...');
					setTimeout(function(){
						flag ++;
						if(flag < 4){
							pullUpData();
						}else{
							oPullUp.html('数据已经加载完毕！');
							setTimeout(function(){
								oPullUp.css({display:'none'});
								oPageBottom.css({display:'block'});
								oScroll.refresh();
							},800);
						}
					},800);
				}
			},
		});
	},100);
	// 上拉刷新数据
  	var iTime = 0;
  	function pullUpData(){
  		$.ajax({
  			url:'http://localhost/HTML5/homework/ZX/zx.php',
  			dataType:'json',
  			data:{
  				iTime: iTime
  			},
  			success:function(data){
  				// data = data.splice(iTime*4, 4);
  				iTime = iTime ? 0 : 1;
  				data.forEach(function(v,k){
  					oDataDiv.append(`<div class="goods-list">
					<a class="a-img" href="javascript:;"><img src="`+ v.url +`"></a>
					<div class="goods-info">
						<p class="goods-title">`+ v.title +`</p>
						<div class="price-info">
							<span class="cur-price">`+ 10*k +`</span><em class="ori-price">￥2000</em><br><em class="discount">1折</em>
						</div>
						<a class="add-cart" data-id="`+ v.id +`"href="javascript:;"></a>
					</div>
				</div>`);
  				});
  				oScroll.refresh();
  			}
  		});
  	}
	//banner
	var mySwiper = new Swiper ('.swiper-container', {
	    loop: true,
	    // 如果需要分页器
	    pagination: '.swiper-pagination',
	    autoplay:3000,
	    autoplayDisableOnInteraction : false,
  	});

	//购物车
	var flag = true;//优化弹窗提醒
	$('#main')[0].addEventListener("click",function(e){
		if(e.target && e.target.nodeName == "A" && flag){
			flag = false;
			var oTarget = e.target;
			// var iIndex = $(oTarget).index($(oTarget));//没有实现 索引不对
			var dataId = oTarget.getAttribute('data-id');
			var dataTitle = $(oTarget).siblings('.goods-title').text();
			var dataSrc = $(oTarget).parent().siblings('.a-img').children().attr('src');
			var dataPrice = $(oTarget).siblings('.price-info').children('.cur-price').text();
			var btn = true;
			/*console.log(dataPrice);*/
			//判断是否有商品
			if(window.localStorage){
				var goodsArray = [];
				if(localStorage.getItem('goodsInfo')){
					goodsArray = JSON.parse(localStorage.getItem('goodsInfo'));
				}
				for(var i=0; i<goodsArray.length; i++){
					if(goodsArray[i].goodsId === dataId){
						goodsArray[i].goodsNum ++;
						btn = false;
					}
				}
			}
			if(btn){
				var oGoods = {
				goodsId: dataId,
				goodsTitle: dataTitle,
				goodsSrc: dataSrc,
				goodsPrice: dataPrice,
				goodsNum:1
				};
				goodsArray.push(oGoods);
			}

			//弹窗提醒
			var remindDiv = $('#remind');
			remindDiv.fadeIn(500);
			setTimeout(function(){
				remindDiv.fadeOut(500,function(){
					flag = true;
				});
			},1600);	
		localStorage.setItem('goodsInfo',JSON.stringify(goodsArray));
		}
	},false)

}