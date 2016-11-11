$(function(){
	setTimeout(function(){
		oScroll = new iScroll('scroll-wrapper',{
			//传入配置参数

			hScrollbar: false,
			vScrollbar: false,//隐藏滚动条
		});
	});

	//订单页显示
	var accountArr = [];
	var sUlHtml = '';
	var accountList = $('section ul');
	if(localStorage.getItem('goodsInfo') && localStorage.getItem('goodsInfo') != '[]'){
		accountArr = JSON.parse(localStorage.getItem('goodsInfo'));
		accountArr.forEach(function(v,k){
			sUlHtml += `<li>
						<div class="img-wrap">
							<img src="`+ v.goodsSrc +`">
						</div>
						<div class="acc-info">
							<p class="acc-title">`+ v.goodsTitle +`</p>
							<span>单价 : <em class="acc-price">`+ v.goodsPrice +`</em></span>
							<div class="num-box">
								数量 : <em class="acc-num">`+ v.goodsNum +`</em>
								<a class="acc-btn" href="javascript:;">取消订单</a>
							</div>
						</div>
						<div id="warning-wrap">
							<div id="acc-warning">
								<p>确认删除订单</p>
								<a class="ensure" href="javascript:;">确定</a>
								<a class="cancel" href="javascript:;">取消</a>
							</div>
						</div>
					</li>`
		});
		accountList.html(sUlHtml);
	}
	//提示信息
	var accBtn = $('.acc-btn');
	var cancelBtn = $('.cancel');
	var ensureBtn = $('.ensure');
	var iIndex = 0;
	accBtn.click(function(){
		iIndex = accBtn.index($(this));
		$(this).parents('.acc-info').next().fadeIn(500);
	});
	cancelBtn.click(function(){
		cancelBtn.eq(iIndex).parent().parent().fadeOut(500);
	});
	ensureBtn.click(function(){
		ensureBtn.eq(iIndex).parent().parent().fadeOut(150);
		ensureBtn.eq(iIndex).parents('li').remove();
		accountArr.splice(iIndex,1);
		localStorage.setItem('goodsInfo',JSON.stringify(accountArr));
	});
})