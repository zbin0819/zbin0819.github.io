$(function(){
	setTimeout(function(){
		oScroll = new iScroll('scroll-wrapper',{
			//传入配置参数

			hScrollbar: false,
			vScrollbar: false,//隐藏滚动条
		});
	});
	//购物车显示
	var goodsArray = [];
	var sUlHtml = '';
	var goodsUl = $('#main-cart ul');
	if(localStorage.getItem('goodsInfo') && localStorage.getItem('goodsInfo') != '[]'){
		goodsArray = JSON.parse(localStorage.getItem('goodsInfo'));
		for(var i=0; i<goodsArray.length; i++){
			sUlHtml += `<li>
					<a href="javascript:;"><img src="`+ goodsArray[i].goodsSrc +`"></a>
					<div class="goods-info">
						<p class="title">`+ goodsArray[i].goodsTitle +`</p>
						<span class="delete iconfont">&#xe68d;</span>
						<span class="unit">单价：<em class="single-price">`+ goodsArray[i].goodsPrice +`</em></span>
						<span class="size">L</span>
						<p class="num">
							数量:
							<a class="sub" href="javascript:;">-</a>
							<input class="num-input" type="text" value="`+ goodsArray[i].goodsNum +`" name="">
							<a class="add" href="javascript:;">+</a>
						</p>
					</div>
				</li>`
		}
		goodsUl.html(sUlHtml);
	}else {
		goodsUl.html("亲，您的购物车为空！！");
		goodsUl.css({paddingTop:'16px',textAlign:'center',fontSize:'18px',color:'#666'});
	}

	//删除商品
	var deleteCart = $('.delete');
	deleteCart.click(function(){
		var iIndex = $('.delete').index($(this));
		$(this).parents('li').remove();
		goodsArray.splice(iIndex,1);
		localStorage.setItem('goodsInfo',JSON.stringify(goodsArray));
		if(localStorage.getItem('goodsInfo') === '[]'){
			goodsUl.html("亲，您的购物车为空！！");//改变ul的内容
			goodsUl.css({paddingTop:'16px',textAlign:'center',fontSize:'18px',color:'#666'});
		}
		CalculateNum();//计算商品数量
		CalculatePrice()//计算商品总价格
		warningDiv.html("商品已从购物车删除");
		warningDiv.fadeIn(500);
		setTimeout(function(){
			warningDiv.fadeOut(500);
		},1600);

	});
	//商品数量
	var numInp = null;
	var showNum = null;
	function CalculateNum (){
		var sumNumber = 0;
		numInp = $('.num-input');
		showNum = $('#search .num');
		for(var i=0; i<numInp.length; i++){
			sumNumber += Number(numInp[i].value);//得到总的商品数量
		}
		showNum.html(sumNumber);
	}
	CalculateNum();
	
	//商品的总价格
	var singlePrice = null;
	var totalNum = null;
	function CalculatePrice(){
		var singlePrice = $('.single-price');
		var totalNum = $('#search .mon');
		var sumPrice = 0;
		for(var i=0; i<singlePrice.length; i++){
			sumPrice += Number(singlePrice[i].innerHTML * numInp[i].value)
		}
		totalNum.html(sumPrice);
	}
	CalculatePrice();

	//加减商品
	var subNum = $('.sub');
	var addNum = $('.add');
	var warningDiv = $('#warning');
	subNum.click(function(){
		var iIndex = $('.sub').index($(this));
		var  numValue = $(this).next().val();
		if( numValue <= 1){
			$(this).next().val(1);
			warningDiv.html("至少选择一件商品");
			warningDiv.fadeIn(500);
			setTimeout(function(){
				warningDiv.fadeOut(500);
			},1600);
		}else{
			numValue --;
			$(this).next().val(numValue);
			goodsArray[iIndex].goodsNum --;
			localStorage.setItem('goodsInfo',JSON.stringify(goodsArray));
			CalculateNum();
			CalculatePrice();
		}
	});
	addNum.click(function(){
		var  numValue = $(this).prev().val();
		var iIndex = $('.add').index($(this));
		if( numValue >= 10){
			$(this).prev().val(10);
			warningDiv.html("库存有限，请联系客服购买");
			warningDiv.fadeIn(500);
			setTimeout(function(){
				warningDiv.fadeOut(500);
			},1600);
		}else{
			numValue ++;
			$(this).prev().val(numValue);
			goodsArray[iIndex].goodsNum ++;
			localStorage.setItem('goodsInfo',JSON.stringify(goodsArray));
			CalculateNum();
			CalculatePrice();
		}
	});
});