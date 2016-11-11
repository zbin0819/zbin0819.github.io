$(function(){
	var swiperSlide = $('.swiper-slide'),
		swiperUl = $('.swiper-wrapper'),
		topAppImg = $('#top-app img'),
		popularImg = $('.popular img'),
		packetsImg = $('.packets img'),
		tableImg = $('.img-table img'),
		classifyImg = $('.img-classify img'),
		firstFloorImg = $('.first-floor img'),
		allClassifyImg = $('.all-classify img'),
		allClassifyTitle = $('.all-classify .img-title'),
		searchTop = $('#search'),
		footerUl = $('footer ul'),
		sFtHtml = '',
	    sUlHtml = '';

	
	//iscroll
	var myScroll = null,
		confirmValue = 1074,
		dValue = 800,
		iIndex = 1,
		flag = true;
	setTimeout(function(){
		myScroll = new IScroll('#main-scroll',{
			hScrollbar: false,
			vScrollbar: false,//隐藏滚动条
			probeType:2
		});
		myScroll.on('scrollEnd',function(){
			// console.log(-this.y);
			if(!flag && -this.y - confirmValue >= guessUl.height() - dValue){
				iIndex ++;
				console.log(iIndex);
				GetData(iIndex);
			}
		});
	},300);
	//搜索吸顶
	$(window).scroll(function(){
		if($(window).scrollTop() >= 100){
			searchTop.css({position:'fixed',top:0,left:0});
		}else{
			searchTop.css({position:'relative'});
		}
	});
  	$.ajax({
  		type:'GET',
  		url:'http://mce.mogucdn.com/jsonp/multiget/3?pids=7356%2C3756%2C24513%2C24522%2C24526',
  		dataType:'JSONP',
  		success:function(data){
  			//console.log(data.data);
  			data.data[3756].list.forEach(function(v,k){
  				sUlHtml += `<div class="swiper-slide"><img src="`+ v.image +`"></div>`
  			});
  			topAppImg.attr('src',data.data[7356].list[0].bg);
  			swiperUl.html(sUlHtml);	
  			popularImg.attr('src',data.data[24513].list[0].image);
  			data.data[24522].list.forEach(function(v,k){
  				packetsImg.eq(k).attr('src',data.data[24522].list[k].image);
  			});
  			data.data[24526].list.forEach(function(v,k){
  				tableImg.eq(k).attr('src',data.data[24526].list[k].image);
  			});
  			data.data[24526].list.forEach(function(v,k){
  				tableImg.eq(k).attr('src',data.data[24526].list[k].image);
  			});
  		},
  	});
  	$.ajax({
  		type:'GET',
  		url:'http://mce.mogucdn.com/jsonp/multiget/3?pids=24532%2C3093%2C4746%2C4604',
  		dataType:'JSONP',
  		success:function(data){
  			// console.log(data);
  			data.data[24532].list.forEach(function(v,k){
  				classifyImg.eq(k).attr('src',data.data[24532].list[k].image);
  			});
  			data.data[3093].list.forEach(function(v,k){
  				firstFloorImg.eq(k).attr('src',data.data[3093].list[k].image);
  			});
  			data.data[4746].list.forEach(function(v,k){
  				allClassifyImg.eq(k).attr('src',data.data[4746].list[k].image);
  				allClassifyTitle.eq(k).html(data.data[4746].list[k].title);
  			});
  			data.data[4604].list.forEach(function(v,k){
  				sFtHtml += `<li><div class="img-wrap"><img src="`+ v.image +`"></div>
					<div class="bottom-title">`+ v.title +`</div></li>`
  			});
  			footerUl.html(sFtHtml);
  		},
  	});
  	var sGuessHtml = '',
  		guessUl = $('.guess-like ul');
  	
  	function GetData(iIndex){
  		$.ajax({
	  		type:'GET',
	  		url:'http://list.mogujie.com/search?cKey=h5-shopping&fcid=&pid=9750&searchTag=&sort=pop',
	  		dataType:'JSONP',
	  		data:{page:iIndex},
	  		success:function(data){
	  			// console.log(data.result.wall.docs);
	  			// console.log(true);
	  			data.result.wall.docs.forEach(function(v,k){
	  				if(v.lefttop_taglist.length === 0){
	  					v.lefttop_taglist[0] = '';
	  				}
	  				/*if(data.result.wall.docs[k].leftbottom_taglist != ''){
	  					console.log(data.result.wall.docs[k].leftbottom_taglist);
	  				}*/
		  			sGuessHtml += `<li>
						<div class="guess-img"><img src="`+ v.img +`"><img class="leftTop" src="`+ v.lefttop_taglist[0] +`"></div>
						<div class="guess-info">
							<div class="info-title">`+ v.title +`</div>
							<div class="info-price"><span class="pl">`+ `￥` + v.price +`</span><span class="pr">`+ v.cfav +`</span></div>
						</div>
					</li>`
		  			
	  			});
	  			guessUl.html(sGuessHtml);
	  			var leftTopImg = $('.guess-img .leftTop');
				for(var i=0; i<leftTopImg.length; i++){
					if(leftTopImg[i].src == 'file:///D:/WWW/HTML5/homework/MGJ/code/index.html'){
						leftTopImg[i].remove();
  					}
				}
				flag = false;
				if(myScroll){
					myScroll.refresh();
				}
	  		},
	  	});
  	}
  	GetData(iIndex);
	//banner
	setTimeout(function(){
		var mySwiper = new Swiper ('.swiper-container', {
		    loop: true,
		    // 如果需要分页器
		    pagination: '.swiper-pagination',
		    autoplay:5000,
	  	});
	  	// console.log(swiperSlide);
	},500)
	
});