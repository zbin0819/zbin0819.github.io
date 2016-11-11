$(function(){
	var navList = $(".navList li");
	var navFixed = $("#nav");
	var line = $("#nav .navList span");
	var line_detail = $("#nav_nf .navList span");
	var navLi = $(".navList li:gt(0):not(.lastLi)");
	var navInner = $(".navinner");
	var pointLi = $(".point li");
	var bannerL = $(".bannerL");
	var bannerUl = $(".bannerUl");
	var oIndex = 0;
	var timer = null;
	var day = $(".date .day");
	var hour = $(".date .hour");
	var minute = $(".date .minute");
	var sec = $(".date .sec");
	var switchBtn = $(".pu_title .switch a");
	var newSwidth = $(".new_title .switch a");
	var listShow = $(".product .list");
	var sliderImgL = $(".slider .btnL");
	var sliderImgR = $(".slider .btnR");
	var sliderUl = $(".sliderImg ul");
	var showLi1 = $(".showLi1");
	var showLi2 = $(".showLi2");
	var clotheShow = $(".clotheShow");
	var backTopLi = $(".backTop");
	var timer1 = null;
	var speed = 0;
	/*登录页面js*/
	var enterInp = $(".common input");
	var loginInp = $("#main_login input");
	var inpTxt = $("#main_enter .txt");
	var inpTxtL = $("#main_login .txt");
	var inpPsd = $("#main_enter .psd");
	var inpPsdL1 = $("#main_login .psd1");
	var inpPsdL2 = $("#main_login .psd2");
	var inpVc = $("#main_enter .vc_text");
	var inpVcL = $("#main_login .vc1");
	var txtLi = $("#main_enter .txtLi");
	var psdLi = $("#main_enter .psdLi");
	var txtW = $("#main_enter .txtW");
	var psdW1 = $("#main_enter .psdW1");
	var psdW2 = $("#main_enter .psdW2");

	var codeShow = $(".common .code_show");
	var codeReset = $(".common .code_reset");
	var enter = $("#main_enter .login");
	var logIn = $("#main_login .login");
	var vcWar = $("#main_enter .vc_war");
	var checkBox = $("#main_login .cb");
	var dayValue = 12,
		hourValue = 1,
		minuteValue = 1,
		secValue = 2;
	//console.log(crossDomList);
	//console.log(comText);
	 //console.log($("checkBox[type='checkbox']").is(':checked')); /*判断复选框是否选中*/
	/*inpTxt.val(getCookie('enterNum'));//得到输入的值
	inpTxtL.val(getCookie('loginNum'));
	inpPsd.val(getCookie('enterPsd'));*/
	/*removeCookie("enterPsd")//移除密码 cookie
	removeCookie("enterNum")//移除密码 cookie
	removeCookie("loginNum")//移除密码 cookie*/
	iTimer();//页面加载启动定时器
	navList.mouseenter(function(){
		var iIndex = $(this).index();
		line.animate({left:124 * iIndex},150);
		line_detail.animate({left:124 * iIndex},150);

	});
	navLi.mouseenter(function(){
		var iIndex = $(this).index() - 1;
		navInner.eq(iIndex).css({display:"block"});
	});
	navLi.mouseleave(function(){
		navInner.css({display:"none"});
	});
	pointLi.mouseenter(function(){
		var iIndex = $(this).index();
		oIndex = iIndex;
		pointLi.removeClass("active").eq(iIndex).addClass("active");
		bannerUl.animate({left:iIndex * -955},300);
	});
	function iTimer(){
		timer = setInterval(function(){
			oIndex ++;
			if(oIndex > 5){
				oIndex = 0;
			}
			pointLi.removeClass("active").eq(oIndex).addClass("active");
			bannerUl.animate({left:oIndex * -955},300);
		},3000);
	}
	bannerL.mouseenter(function(){
		clearInterval(timer);
	});
	bannerL.mouseleave(function(){
		iTimer();//启动定时器
	});
	//定时器控制时间
	var timer1 = setInterval(function(){
		secValue --;
		if(secValue < 0){
			minuteValue --;
			secValue = 59;
		}
		if(minuteValue == 0){
			hourValue --;
			minuteValue = 59;
		}
		if(hourValue == 0){
			dayValue --;
			hourValue = 11;
		}
		if(dayValue == 0){
			dayValue = 0;
			clearInterval(timer1);
		}
		sec.html(secValue);
		minute.html(minuteValue);
		hour.html(hourValue);
		day.html(dayValue);
	},1000);

	//switch 切换
	switchBtn.mouseenter(function(){
		var iIndex = $(this).index();
		switchBtn.removeClass("show").eq(iIndex).addClass("show");
		listShow.css({display:"none"}).eq(iIndex).css({display:"block"});
	});
	newSwidth.mouseenter(function(){
		var iIndex = $(this).index();
		newSwidth.removeClass("show").eq(iIndex).addClass("show");
		clotheShow.css({display:"none"}).eq(iIndex).css({display:"block"});
	});
	//slider左右切换
	sliderImgL.click(function(){
		sliderUl.animate({left:0},function(){
			sliderImgL.css({color:"#ddd"});
			sliderImgR.css({color:"#7d7d7d"});
			showLi1.css({display:"block"});
			showLi2.css({display:"none"});
		});
	});
	sliderImgR.click(function(){
		sliderUl.animate({left:-190},function(){
			sliderImgR.css({color:"#ddd"});
			sliderImgL.css({color:"#7d7d7d"});
			showLi1.css({display:"none"});
			showLi2.css({display:"block"});
		});
	});

	//导航吸顶
	$(window).scroll(function(){
		speed = ($(window).scrollTop());
		if($(window).scrollTop() >= 150){
			navFixed.addClass("fixed");
			backTopLi.fadeIn();
		}else{
			navFixed.removeClass("fixed");
			backTopLi.fadeOut();
		}
	});
   //返回顶部
    function backTopFun(){
        speed -= 15;
        ($(window).scrollTop(speed));
        if(($(window).scrollTop()) == 0){
            clearInterval(timer1);
        }
    }
    backTopLi.click(function () {
        timer1 = setInterval(backTopFun,2);
    });

    //登录页面
    //获取和失去焦点
    var regPhone = /^1[34578]\d{9}$/;
    enterInp.focus(function() {
    	$(this).css({background:"#f9f9f9",color:"#000"});
    });
    enterInp.blur(function() {
    	$(this).css({background:"#FFF",color:"#666"});
    });
    //注册页面
    //获取和失去焦点
    loginInp.focus(function(){
    	$(this).css({border:"1px solid #fd9819"});
    	$(this).next().css({display:"block"});

    });
    loginInp.blur(function(){
    	$(this).css({border:"1px solid #CCC"});
    	$(this).next().css({display:"none"});
    });
    //手机号/邮箱
	inpTxt.blur(function(){
		if(! regPhone.test(inpTxt.val())){
			txtW.css({display:"block"});
			txtLi.animate({left:-16},100).animate({left:16},100).animate({left:-8},100).animate({left:0},100,function(){
				txtW.fadeOut(1500);
			})
    	}
    });
    //密码
    inpPsd.blur(function(){
    	if(inpPsd.val() == ""){
    		psdW1.css({display:"block"});
    		psdLi.animate({left:-16},100).animate({left:16},100).animate({left:-8},100).animate({left:0},100,function(){
    			psdW1.fadeOut(1500);
    			});
    	}else if(inpPsd.val().length < 6 || inpPsd.val().length >15){
    		psdW2.css({display:"block"});
    		psdLi.animate({left:-16},100).animate({left:16},100).animate({left:-8},100).animate({left:0},100,function(){
    			psdW2.fadeOut(1500);
    			});
    	}

    });
    //注册页面手机号码判断
 	inpTxtL.blur(function(){phoneNum();});//调用函数
    function phoneNum(){	
    	if(inpTxtL.val() == ""){
    		inpTxtL.next().addClass("error_msg").css({display:"block"});
    		inpTxtL.next().html("手机号码不能为空");
    		setTimeout(removeErr,2000);
    		function removeErr(){
    			inpTxtL.next().removeClass("error_msg").html("完成验证后，您可以用该手机号登录和找回密码").css({display:"none"});
    		}
    	}
    	if(inpTxtL.val() != "" && ! regPhone.test(inpTxtL.val())){
    		inpTxtL.next().addClass("error_msg").css({display:"block"});
    		inpTxtL.next().html("手机号格式有误，请输入正确手机号");
    		setTimeout(removeErr,2000);
    		function removeErr(){
    			inpTxtL.next().removeClass("error_msg").html("完成验证后，您可以用该手机号登录和找回密码").css({display:"none"});
	    	}
	    }
    };
    //注册页面验证码判断
    inpVcL.blur(function(){codeCheck();});
    function codeCheck(){
		if(inpVcL.val() == ""){
			inpVcL.next().addClass("error_msg").css({display:"block"});
    		inpVcL.next().html("图片验证码不能为空");
    		setTimeout(removeErr,2000);
    		function removeErr(){
    			inpVcL.next().removeClass("error_msg").html("输入右边图片文字，验证通过后获取短信验证码").css({display:"none"});
	    	}
		}
	    
    }
    
    //注册页面密码
    inpPsdL1.blur(function(){passWordL1();});
    function passWordL1(){
    	if(inpPsdL1.val() == "" || (inpPsdL1.val().length < 6 || inpPsdL1.val().length >15)){
    		inpPsdL1.next().addClass("error_msg").css({display:"block"});
    		inpPsdL1.next().html("密码不能为空且长度在6-15之间");
    		setTimeout(removeErr,2000);
    		function removeErr(){
    			inpPsdL1.next().removeClass("error_msg").html("6-15位字母，建议字母、数字及下划线两种以上组合").css({display:"none"});
	    		}
	    }
	}
	inpPsdL2.blur(function(){passWordL2();});
	function passWordL2(){
    	if(inpPsdL2.val() != inpPsdL1.val()){
    		inpPsdL2.next().addClass("error_msg").css({display:"block"});
    		inpPsdL2.next().html("两次密码输入不一致");
    		setTimeout(removeErr,2000);
    		function removeErr(){
    			inpPsdL2.next().removeClass("error_msg").html("请再次输入密码").css({display:"none"});
    		}
    	}
	}
    //登录验证码
	fn1();//页面加载随机显示验证码
    function fn1(){
		var array = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F","G","H",
		"I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
		"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
		var str = new String(4);
		str[0] = array[parseInt(Math.random()*62)];
		str[1] = array[parseInt(Math.random()*62)];
		str[2] = array[parseInt(Math.random()*62)];
		str[3] = array[parseInt(Math.random()*62)];
		codeShow.html(str[0] + str[1] + str[2] + str[3]);
	}
	codeReset.click(function(){
		fn1();//点击刷新验证码
	});
	enter.click(function(){
		if(inpVc.val().toLowerCase() != codeShow.text().toLowerCase()){
			fn1();//如果验证码错误刷新验证码
			vcWar.css({display:"block"});
			vcWar.fadeOut(1500);
		}else if(inpVc.val().toLowerCase() == codeShow.text().toLowerCase()){
	    	/*再次判断文本框*/
			if(! regPhone.test(inpTxt.val())){
				txtW.css({display:"block"});
    			txtLi.animate({left:-16},100).animate({left:16},100).animate({left:-8},100).animate({left:0},100,function(){
    				txtW.fadeOut(1500);
    			});
	    	}
			/*再次判断密码框*/
			else if(inpPsd.val() == ""){
    		psdW1.css({display:"block"});
    		psdLi.animate({left:-16},100).animate({left:16},100).animate({left:-8},100).animate({left:0},100,function(){
    			psdW1.fadeOut(1500);
    			});
	    	}else if(inpPsd.val().length < 6 || inpPsd.val().length >15){
	    		psdW2.css({display:"block"});
	    		psdLi.animate({left:-16},100).animate({left:16},100).animate({left:-8},100).animate({left:0},100,function(){
	    			psdW2.fadeOut(1500);
	    			});
	    	}else if(inpTxt.val() == getCookie('loginNum') && inpPsd.val() == getCookie('loginPsd')){
				alert("登录成功");
				location.href = "index.html";
			}else{
				alert("登录失败,用户名或密码错误");
			}
		}
	});

	//注册成功
	logIn.click(function(){
		if(inpVcL.val().toLowerCase() != codeShow.text().toLowerCase()){
			fn1();//如果验证码错误刷新验证码
			codeCheck();
		}else if(inpTxtL.val() == "" || (inpTxtL.val() != "" && ! regPhone.test(inpTxtL.val()))){
			phoneNum();//点击注册调用函数进行判断
		}else if(inpPsdL1.val() == "" || (inpPsdL1.val().length < 6 || inpPsdL1.val().length >15)){
			passWordL1();
		}else if(inpPsdL2.val() != inpPsdL1.val()){
			passWordL2();
		}
		else{
			setCookie('loginNum',inpTxtL.val(),1);
			setCookie('loginPsd',inpPsdL1.val(),1);
			alert("注册成功");
			location.href = "userenter.html";
		}
	});

	//跨域部分
	var searchTxt = $('.search .txt');
	var crossDom = $('#cross_dm');
	var crossDomList = $('#cross_dm ul');
	searchTxt.bind('input', function () {
		$.ajax({
			url:"http://bhb.b5m.com/api/autofill?jsonpCallback=jQuery1910619415833597887_1475135404023&key=" + searchTxt.val() +"&searchSource=korea&_=1475135404032",
			//key: searchTxt.val(),
			dataType: 'jsonp',
			jsonp: 'jsonpCallback',
			success: function (data, sInfo, xhr) {
				//console.log(data[0]);
				var str = "";
				for(var i=0; i<data.length; i++){
					str += '<li>'+ data[i].term + '<span>'+ '约'+ data[i].total_count +'个结果</span></li>';
					//循环写进li标签和对应的对象的属性值
				}
				crossDomList[0].innerHTML = str;
			}
		});
	});
	searchTxt.focus(function () {
		crossDom.css({display:'block'});
	});
	searchTxt.blur(function () {
		crossDom.css({display:'none'});
	});


});
