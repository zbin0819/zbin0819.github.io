$(function(){
	var spread = $(".title_bar a");
	var showGoods = $(".goods_list");
	var titleBarA = $(".title_bar a");
	var addCartBtn = $(".goods_info em");
	var listWrap = $(".list_wrap");
	var flag = true;
	//var accountBtn = $(".cart_foot a");
	spread.click(function(){
		if(flag){
			showGoods.slideDown();
			flag = false;
			titleBarA.text("收起");
		}else if(!flag){
			showGoods.slideUp();
			flag = true;
			titleBarA.text("展开");
		}
	});

	addCartBtn.click(function () {
		var sGoodsSrc = $(this).parent().siblings('img').attr('src');
		var sGoodsTitle = $(this).siblings('h4').text();
		var iGoodsPrice = $(this).siblings('.price').text();
		var iGoodsId = $(this).attr('data-id');
		var btn = true;
		var sGoods = $.cookie('goodsInfo');
		if(sGoods === undefined){
			var goodsArray =[];
		}else{
			var goodsArray = JSON.parse(sGoods);
		}
		for(var i =0; i < goodsArray.length; i++) {
			if(goodsArray[i].goodsId == iGoodsId){
				goodsArray[i].goodsNum++;
				btn = false;
			}
		}
		if(btn){
			var oGoods = {
				goodsId:iGoodsId,
				goodsSrc:sGoodsSrc,
				goodsTitle:sGoodsTitle,
				goodsPrice:iGoodsPrice,
				goodsNum:1
			};
			goodsArray.push(oGoods);
		}
		$.cookie('goodsInfo',JSON.stringify(goodsArray),{expires:7,path:'/'});
	});
	var sGoods = $.cookie('goodsInfo');
	var goodsArray = JSON.parse(sGoods);
	var goodsAmount = [];

	var sUlHtml = "";
	for(var i=0; i<goodsArray.length; i++){
		goodsAmount[i] = goodsArray[i].goodsPrice * goodsArray[i].goodsNum;
		sUlHtml += '<ul class="info_list overHidden">'
				+'<li class="cart_check"><a href="javascript:;"><input class="select" type="checkbox" name="check"></a></li>'
				+ '<li class="cart_pic"><img src="'+ goodsArray[i].goodsSrc +'"></li>'
				+ '<li class="cart_name"><a href="javascript:;">'+ goodsArray[i].goodsTitle +'</a></li>'
				+ '<li class="cart_pos">化妆品净含量:' + 10 * (i+1) +'g;颜色分类:草莓花蕾膏</li>'
				+ '<li class="cart_price">' + goodsArray[i].goodsPrice +'</li>'
				+ '<li class="cart_qua"><a href="javascript:;"><span class="subtract">-</span><input class="goods_num" type="text" value=" '+ goodsArray[i].goodsNum + '" name=""><span class="plus">+</span></a></li>'
				+ '<li class="cart_amount"><span>'+ goodsAmount[i] +'</span></li>'
				+ '<li class="cart_det"><a href="javascript:;">删除</a></li>'
				+ '</ul>';
	}
	listWrap.html(sUlHtml);
	$(".cart_det").click(function () {
		var iIndex = $(".cart_det").index($(this));
		var listWrapH = $('.list_wrap').height();//获取最外层div的高度
		console.log(listWrapH);
		var sumM = 0;
		var sumN = 0;
		$(this).parent().remove();
		goodsArray.splice(iIndex,1);
		goodsAmount.splice(iIndex,1);
		for(var i=0; i<goodsAmount.length; i++){
			sumM += goodsAmount[i];
			sumN += goodsArray[i].goodsNum;
		}
		$('.total_money').text(sumM);
		$('.total_num').text(sumN);
		if(listWrapH == 94){
			infoH4.css({display:"block"});
		}else{
			infoH4.css({display:"none"});
		}
		$.cookie('goodsInfo',JSON.stringify(goodsArray),{expires:7,path:'/'});

	});
	var addNum = $(".plus");
	var subNum = $(".subtract");
	//var totalNum = $('.goods_num');
	//var totalMoney = $('.cart_amount').children();
	var listWrapH = $('.list_wrap').height();//获取最外层div的高度
	var infoH4 = $('.cart_info h4');
	var amountValue = $('.cart_amount span');//购物车里所有的小计
	if(listWrapH == 0){
		infoH4.css({display:"block"});
	}else{
		infoH4.css({display:"none"});
	}
	addNum.click(function () {   //商品数量加
		var iIndex = addNum.index($(this));
		var goodsNum = $(this).siblings('.goods_num').val(); //获取文本框的值
		if(goodsNum >= 10){
			goodsNum = 10;
			alert("库存不足！！！");
		}else{
			goodsNum++;
			$(this).siblings('.goods_num').val(goodsNum); //将值写进文本框
			goodsArray[iIndex].goodsNum++; //数组中的值需要改变
			amountValue.eq(iIndex).text(goodsArray[iIndex].goodsPrice * goodsArray[iIndex].goodsNum);//计算总的价钱
			$.cookie('goodsInfo',JSON.stringify(goodsArray),{expires:7,path:'/'});
		}
	});
	subNum.click(function () {   //商品数量减
		var iIndex = subNum.index($(this));
		var goodsNum = $(this).siblings('.goods_num').val();
		if(goodsNum <= 1){
			goodsNum = 1;
			alert("至少选择一件商品！！！");
		}else{
			goodsNum--;
			$(this).siblings('.goods_num').val(goodsNum);
			goodsArray[iIndex].goodsNum--;
			amountValue.eq(iIndex).text(goodsArray[iIndex].goodsPrice * goodsArray[iIndex].goodsNum);
			$.cookie('goodsInfo',JSON.stringify(goodsArray),{expires:7,path:'/'});
		}
	});
	//全选按钮
	//var flag1 = true;
	var allSelect = $('.all_select');
	var select = $('.select');
	var selectMon = $('.cart_amount span');
	var selectNum = $('.cart_qua .goods_num');
	allSelect.click(function () {
		if($(this).data('btn')!=true){
			allSelect.data('btn',true);
			select.prop('checked','true');
			allSelect.prop('checked','true');
		}else{
			allSelect.data('btn',false);
			select.removeAttr('checked','true');
			allSelect.removeAttr('checked','true');
		}
		for(var i=0; i < select.length; i++){
			if(select.eq(i).data('btn')!=true){
				select.eq(i).data('btn',true);
			}else{
				select.eq(i).data('btn',false);
			}
		}
		var allMoney = 0;
		var allNum = 0;
		for(var i=0; i<selectMon.length; i++){//对所有的合计价格进行遍历
			if(select.eq(i).data('btn')) { //对选中的商品进行遍历,如果btn为false就不进行遍历
				allMoney += parseInt(selectMon[i].innerHTML);//让每个合计的价格进行相加
				allNum += parseInt(selectNum.eq(i).val());
			}
		}
		$('.total_num').text(allNum);
		$('.total_money').text(allMoney);
		/*if($(this).attr('checked',true) && flag1 == true){
			$('input[name="check"]').prop('checked',true);
			var sumNum = 0;
			var sumMon = 0;
			for(var i=0; i<totalNum.length; i++){
				sumNum += parseInt(totalNum[i].value); //获得产品的总数量
				sumMon += parseInt(totalMoney[i].innerHTML); //获得产品的总价格
			}
			$('.total_num').text(sumNum);
			$('.total_money').text(sumMon);
			flag1 = false;
		}else if(flag1 == false){
			$('input[name="check"]').prop('checked',false);
			flag1 = true;
			$('.total_num').text(0);
			$('.total_money').text(0);
		}*/
	});
	//单选按钮
	$('.select').click(function () {
		if($(this).data('btn')!=true){
			$(this).data('btn', true);   //按钮被选中
			 /*if($(this).attr('checked') == true){
				allSelect.removeAttr("checked","true");
			}*/
			/*for(var i=0; i<$('.select').length; i++){ 不正确
				if(!$('.select').eq(i).attr('checked') == false){
					console.log(1);
					$('.all_select').prop("checked", true);
				}
			}*/
		}else{
			$(this).data('btn', false);
			/*if($(this).attr('checked') == false){
				allSelect.attr("checked","true");
			}*/
		}
		if($('.select').filter(':checked').length === $('.select').length) {
			//根据选中的长度和总的长度进行匹配
			$('.all_select').prop('checked', true);
		} else {
			$('.all_select').prop('checked', false);
		}
		var allMoney = 0;
		var allNum = 0;
		for(var i=0; i<selectMon.length; i++){//对所有的合计价格进行遍历
			if($('.select').eq(i).data('btn')) { //对选中的商品进行遍历
				allMoney += parseInt(selectMon[i].innerHTML);//让每个合计的价格进行相加
				allNum += parseInt(selectNum.eq(i).val());
			}
		}
		$('.total_num').text(allNum);
		$('.total_money').text(allMoney);
	});

});