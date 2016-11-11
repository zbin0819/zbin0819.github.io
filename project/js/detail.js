$(function(){
	var descNum = $(".info .desc");
	var ascNum = $(".info .asc");
	var infoNum = $(".info .txt_num");
	var goodsNum = infoNum.val();
	var optionA = $(".option a");
	var comLi = $(".com_li");
	var comSwLi = $(".sw_li");
	var comInfoUL = $(".com_info");
	var comText = $(".com_text dt");
	var comUserName = $(".user_name");
	var comUserDate = $(".user_date");
    var swPage = $(".sw_page a:gt(0):not(.right_btn)");
    /*var leftBtn = $(".sw_page .left_btn");
    var rightBtn = $(".sw_page .right_btn");*/
    var optionFixed = $(".option");
    var spanFixed = $(".fixed_add span");
	//商品数量加减
	descNum.click(function(){
		if(infoNum.val() <= 1){
			descNum.addClass("disabled");
		}else{
			goodsNum --;
			infoNum.val(goodsNum);
		}
	});
	ascNum.click(function(){
		descNum.removeClass("disabled");
		goodsNum ++;
		if(goodsNum > 10){
			goodsNum = 10;
			alert("商品数量超出上限")
		}
		infoNum.val(goodsNum);
	});

	//内容切换
	optionA.click(function(){
        var iIndex = $(this).index();
		optionA.removeClass("curr");
		$(this).addClass("curr");
        if(iIndex == 0){
            $('html,body').animate({
            scrollTop:"940px",
            });
        }
        if(iIndex == 1){
            $('html,body').animate({
            scrollTop:"1250px",
            });
        }
        if(iIndex == 2){
            $('html,body').animate({
            scrollTop:"9905px",
            });
        }
        if(iIndex == 3){
            $('html,body').animate({
            scrollTop:"10850px",
            });
        }
	});
	//评论区切换
	comLi.click(function(){
		comLi.removeClass("active");
		$(this).addClass("active");
	});
	comSwLi.click(function(){
		var iIndex = $(this).index();
		comInfoUL.css({display:"none"}).eq(iIndex - 1).css({display:"block"})
	});
	//获取评论
	$.ajax({
    	url:"https://sclub.jd.com/productpage/p-188078-s-0-t-3-p-1.html?",
    	jsonp: 'callback',
    	dataType: 'jsonp',
    	success: function (data) {
    		for(var i=0; i<5; i++){
    			comText[i].innerHTML = data.comments[i].content;
    			comUserName[i].innerHTML = data.comments[i].nickname;
    			comUserDate[i].innerHTML = data.comments[i].referenceTime;
    		}
    	}
    });
    //页面滚动
    $(window).scroll(function(){
        //console.log($(this).scrollTop());
        var scrollValue = $(window).scrollTop();
        if(scrollValue >= 950){
            optionFixed .addClass("com_fixed");
            spanFixed.css({display:"inline-block"});
        }else{
            optionFixed.removeClass("com_fixed");
            spanFixed.css({display:"none"});
        }
        if(scrollValue >= 940){
            optionA.removeClass("curr");
            optionA.eq(0).addClass("curr");
        }
        if(scrollValue >= 1250){
            optionA.removeClass("curr");
            optionA.eq(1).addClass("curr");
        }
        if(scrollValue >= 9905){
            optionA.removeClass("curr");
            optionA.eq(2).addClass("curr");
        }
        if(scrollValue >= 10850){
            optionA.removeClass("curr");
            optionA.eq(3).addClass("curr");
        }
    });
    swPage.click(function(){
        var btnIndex = $(this).index();
        swPage.removeClass("down");
        $(this).addClass("down");
        $.ajax({
            url:"https://sclub.jd.com/productpage/p-188078-s-0-t-3-p-"+ btnIndex + ".html?",
            jsonp: 'callback',
            dataType: 'jsonp',
            success: function (data) {
                for(var i=0; i<5; i++){
                    comText[i].innerHTML = data.comments[i].content;
                    comUserName[i].innerHTML = data.comments[i].nickname;
                    comUserDate[i].innerHTML = data.comments[i].referenceTime;
                }
            }
        });
        $('html,body').animate({
            scrollTop:"9905px"
        });
    });
});

/*放大镜*/
window.onload = function () {
    var box = getId("box");
    var origin = getId("origin");
    var iImg = byTagName(origin,"img");
    var unList = getId("unList");
    var lis = byTagName(unList,"li");
    var bigger = getId("bigger");
    var bigImg = byTagName(bigger,"img");
    var move = getId("move");
    var moveWidth = parseInt(move.style.width);
    var moveHeight = parseInt(move.style.height);
    var maxX = origin.clientWidth - moveWidth;
    var maxY = origin.clientHeight - moveHeight;
    var k = 0;
    var scale = parseInt(bigger.style.width)/moveWidth; //这个是放大比例
    origin.onmouseenter = function () {
        move.style.display = "block";
        bigImg[k].style.display = "block";
        bigger.style.display = "block";
    };
    origin.onmouseleave = function () {
        move.style.display = "none";
        bigImg[k].style.display = "none";
        bigger.style.display = "none";
    };
    origin.onmousemove = function (evt) {
        var event = evt || window.event;
        var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
        var x = event.clientX  + scrollLeft - move.clientWidth/2 - 53;
        /*鼠标指针是相对于浏览器窗口的位置*/
        var y = event.clientY + scrollTop - move.clientHeight/2 - 224;
        if(x < 0){
            x = 0;
        }
        if(x > maxX){
            x = maxX;
        }
        if(y < 0){
            y = 0;
        }
        if(y > maxY){
            y = maxY;
        }
        setStyle(move,{
            left : x + "px",
            top : y + "px"
        });
        setStyle(bigImg[k],{
            left : -x * scale + "px",
            top : -y * scale + "px"
        });
    };
    for(var i= 0; i < lis.length; i++){
        lis[i].index = i;
        lis[i].onmouseenter = function () {
            for(var j=0; j<lis.length; j++){
                lis[j].className = "";
                iImg[j].style.display = "none";
            }
            lis[this.index].className = "hover";
            iImg[this.index].style.display = "block";
            k = this.index; //将this.index 的值赋给一个全局变量，让上边bigImg使用
        }
    }
    function getId(id){
        return document.getElementById(id);
    }
    function byTagName(obj,sTarget){
            return obj.getElementsByTagName(sTarget);
    }
    function setStyle(obj,oTarget){
        for(var sAttr in oTarget){
            obj.style[sAttr] = oTarget[sAttr];
        }
    }

};
