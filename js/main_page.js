$(document).ready(function(){
	/*第一部分 头部*/
	var header=$('#header');
	var i=header.find('i');

	i.mousedown(function(){
		// alert("click");
		header.find('header').css("display","none");
		// header.find('.header').css('height','200px;');
	});
	// 位置选择
	var currentSpan='';
	var spans=$('#siteSubmenu').find('span');
	spans.each(function(){
		var m=$(this);
		m.mousedown(function() {
			/* Act on the event */
			var current=$('#siteSubmenu').find('.siteSelect');
			if(current!=m){
				current.removeClass('siteSelect');
				currentSpan=m;
				currentSpan.addClass('siteSelect');
				$('#header_main').find('.site').val(currentSpan.text());
			}

		});
	});
	// 轮播图的实现
	var box=$("#cenwrap").find('ul');
	var picList=$('#cenwrap').find('li');
	var scriptList=$('#subscript').find('span');
	var currIndex=0;//保存当前图片的索引值
	var time=2000;
	var arrowLeft=$("#arrowBc").find("div.arrowLeftBc");
	var arrowRight=$("#arrowBc").find("div.arrowRightBc");
	// 设置定时器，每隔5秒图片进行跳动
	var timer=setInterval(timerFunc,time);
	//对整个盒子进行监听的效果，鼠标移入，停止定时器，移出启动
	box.mouseover(function(event) {
		clearInterval(timer);
	});
	box.mouseout(function(event) {
		timer=setInterval(timerFunc,time);
	});
	// 对下标进行一个监听的效果
	scriptList.each(function() {
		var currScript=$(this);
		currScript.click(function(index,element){
			currIndex=currScript.index();
			sildeTo(currIndex);
		});
	});
	// 对左右箭头设置监听效果
	arrowLeft.click(function(event) {
		if(currIndex==0) currIndex=7;
		else currIndex--;
		sildeTo(currIndex);
	});
	arrowRight.click(function(event) {
		if(currIndex==7) currIndex=0;
		else currIndex++;
		sildeTo(currIndex);
	});
	function timerFunc(){
		if(currIndex==7) currIndex=0;
		else currIndex++;
		sildeTo(currIndex);
	}
	function sildeTo(currIndex){
		currIndex=parseInt(currIndex);
		var nowPic=$('#cenwrap').find("li.focusedIndex");
		var nowScript=$('#subscript').find("span.focusedScript");
		var currPic=picList[currIndex];
		// alert(currPic.nodeName);
		if(nowPic.index()!=currIndex){
			picList.eq(currIndex).addClass('focusedIndex');
			scriptList.eq(currIndex).addClass('focusedScript');
			nowPic.removeClass('focusedIndex');
			nowScript.removeClass('focusedScript');
		}
	}
	// 主区域右侧公告栏的动态设置
	var secList=$("#first_right").find('.cenSec').find('li');
	var len=secList.length;
	secList.each(function(index, el) {
		var m=$(this);
		m.mouseover(function(event) {
			var k=$(this);
			var index=k.index();
			if(index!=2){
				k.siblings('li').children('div').removeClass('secDiv')
			}
			k.siblings('li').children('span').removeClass('secSpan');
			secList.eq(index).find("span").addClass('secSpan');
			secList.eq(index).find("div").addClass('secDiv');
		});
	});
	// 设置话费、机票、电影票、游戏的动态效果
	var customedList=$("#thrMain").find('li');
	var thrMain=$("#thrMain");
	var cenThrSub=$("#cenThrSub");
	var customedSub=$("#cenThrSub").find('li');
	customedList.each(function(index, el) {
		if(index<4){
			var index=index;
			var m=$(this);
			m.mouseover(function(event) {
				thrMain.slideUp(1500);
				cenThrSub.slideDown(1500,function() {});
				setInterval(function(){},1000);
				slideCustomed(index);
				// alert(index);
			});
		}
	});
	customedSub.each(function(index, el) {
		var n=$(this);
		n.mouseover(function(event) {
			slideCustomed(index);
		});
	});
	function slideCustomed(index){
		var currCustomed=$("#cenThrSub").find('.customed');
		var currCustomedSub=$("#cenThrSub").find('.customedSub');
		var nowCustomed=customedSub.eq(index).find("span");
		var nowCustomedSub=customedSub.eq(index).find("div");
		if(currCustomed!=nowCustomed){
			currCustomed.removeClass('customed');
			currCustomedSub.removeClass('customedSub');
			nowCustomed.addClass('customed');
			nowCustomedSub.addClass('customedSub');
		}
	}
	// 对热门城市中的每个城市选项注册监听，按下，input中的val需要改变
	// 对热门,ABCD等选项的选择，设置class
	var hotList=$("#cenThrSub").find('.depart').find('.airTicketCity').find('li');
	var inputChu=$("#cenThrSub").find('.depart').eq(0).find('input');
	var inputDao=$("#cenThrSub").find('.depart').eq(1).find('input');
	// alert(currHotCity);
	hotList.each(function(index, el) {
		var hotCity=$(this).children('span');
		hotCity.click(function(event) {
			/* Act on the event */
				 // alert(index);
			var currHotCity=$("#cenThrSub").find('.airTicketCity').find('li').find('.focusedCity');
			if(hotCity!=currHotCity){
				currHotCity.removeClass('focusedCity');
				currHotCity.next().removeClass('citySub');
				hotCity.addClass('focusedCity');
				hotCity.next().addClass('citySub');
			}
		});
	});
		// 对出发input框进行监听，点击，子菜单进行显示
	inputChu.click(function(event) {
		/* Act on the event */
		// alert("chufa");
		$("#cenThrSub").find('.depart').eq(0).children('div').css('display','block');
		var hotcity=$("#cenThrSub").find('.depart').eq(0).find("ul").find('div').find('span');
		hotcity.each(function(index, el) {
			var cityThis=$(this);
			cityThis.click(function(event) {
				inputChu.val(cityThis.text());
				inputChu.css("color","rgb(53,53,53)");
				$("#cenThrSub").find('.depart').eq(0).children('div').css('display','none');
			});
		});
	});
	inputDao.click(function(event) {
		/* Act on the event */
		$("#cenThrSub").find('.depart').eq(1).children('div').css('display','block');
		var hotcity=$("#cenThrSub").find('.depart').eq(1).find("ul").find('div').find('span');
		hotcity.each(function(index, el) {
			var cityThis=$(this);
			cityThis.click(function(event) {
				inputDao.val(cityThis.text());
				inputDao.css("color","rgb(53,53,53)");
				$("#cenThrSub").find('.depart').eq(1).children('div').css('display','none');
			});
		});
	});
	// 对往返的图标进行监听，点击，两个文本框的内容进行替换
	var re=$("#re");
	re.click(function(event) {
		/* Act on the event */
		var word=inputChu.val();
		// alert(word);
		inputChu.val(inputDao.val());
		inputDao.val(word);
	});
	//如果点击往返，则内容要变
	var reTwice=$("#cenThrSub").find('.fousedAir').find('.airSubFir').find('input').eq(1);
	var dateThr=$("#cenThrSub").find('.airTicketSub').find('.airSubFir').find('.depart').eq(2);
	var len=$("#cenThrSub").find('.airTicketSub').find('.airSubFir').find('.depart').length;
	reTwice.click(function(event) {
		alert(len);
		if(len<=3){
			dateThr.css("width","114px");
			dateThr.after('<div class="depart"><form action=""><input type="text" value="返程"></form></div>');
			dateThr.css({
				"display":"inline-block",
				"margin":"0",
				"vertical-align":"top"
			});
			$("#cenThrSub").find('.airTicketSub').find('.airSubFir').find('.depart').eq(3).css({
				"display": 'inline-block',
				"width": '76px',
				"margin":"0",
				"border-left":"none",
				"padding":"1px 0"
			});
			len=$("#cenThrSub").find('.depart').length;
		}
		
		// dateThr.html('<h1>日期</h1><form action=""><input type="text" value="出发"><input type="text" value="返程"></form>');
		// dateThr.find('input').css("width","35px");
		// dateThr.find('input').eq(0).css("border-right","1px solid rgb(204,204,204)");
	});
	// 对热门城市中的每个城市选项注册监听，按下，input中的val需要改变
	// 对热门,ABCD等选项的选择，设置class
	// var hotList=$("#cenThrSub").find('.depart').find('.airTicketCity').find('li');
	var inputChuTwo=$("#cenThrSub").find('.depart').eq(3).find('input');
	var inputDaoTwo=$("#cenThrSub").find('.depart').eq(4).find('input');
	// alert(currHotCity);
	hotList.each(function(index, el) {
		var hotCity=$(this).children('span');
		hotCity.click(function(event) {
			/* Act on the event */
				 // alert(index);
			var currHotCity=$("#cenThrSub").find('.airTicketCity').find('li').find('.focusedCity');
			if(hotCity!=currHotCity){
				currHotCity.removeClass('focusedCity');
				currHotCity.next().removeClass('citySub');
				hotCity.addClass('focusedCity');
				hotCity.next().addClass('citySub');
			}
		});
	});
		// 对出发input框进行监听，点击，子菜单进行显示
	inputChuTwo.click(function(event) {
		/* Act on the event */
		// alert("chufa");
		$("#cenThrSub").find('.depart').eq(3).children('div').css('display','block');
		var hotcity=$("#cenThrSub").find('.depart').eq(3).find("ul").find('div').find('span');
		hotcity.each(function(index, el) {
			var cityThis=$(this);
			cityThis.click(function(event) {
				inputChuTwo.val(cityThis.text());
				inputChuTwo.css("color","rgb(53,53,53)");
				$("#cenThrSub").find('.depart').eq(3).children('div').css('display','none');
			});
		});
	});
	inputDaoTwo.click(function(event) {
		/* Act on the event */
		$("#cenThrSub").find('.depart').eq(4).children('div').css('display','block');
		var hotcity=$("#cenThrSub").find('.depart').eq(4).find("ul").find('div').find('span');
		hotcity.each(function(index, el) {
			var cityThis=$(this);
			cityThis.click(function(event) {
				inputDaoTwo.val(cityThis.text());
				inputDaoTwo.css("color","rgb(53,53,53)");
				$("#cenThrSub").find('.depart').eq(4).children('div').css('display','none');
			});
		});
	});
	// // 对往返的图标进行监听，点击，两个文本框的内容进行替换
	var reTwo=$("#reTwo");
	reTwo.click(function(event) {
		/* Act on the event */
		var word=inputChuTwo.val();
		// alert(word);
		inputChuTwo.val(inputDaoTwo.val());
		inputDaoTwo.val(word);
	});
	// //如果点击往返，则内容要变
	// var reTwiceOut=$("#cenThrSub").find('.airSubFir').find('input').eq(4);
	// var dateThrOut=$("#cenThrSub").find('.depart').eq(5);
	// var lenOut=$("#cenThrSub").find('.depart').length;

	// reTwiceOut.click(function(event) {
	// 	alert("click");
	// 	if(lenOut<=6){
	// 		alert(lenOut);
	// 		dateThrOut.css("width","95px");
	// 		dateThrOut.after('<div class="depart"><form action=""><input type="text" value="返程"></form></div>');
	// 		dateThrOut.css({
	// 			"display":"inline-block",
	// 			"margin":"0",
	// 			"vertical-align":"top"
	// 		});
	// 		$("#cenThrSub").find('.depart').eq(6).css({
	// 			"display": 'inline-block',
	// 			"width": '60px',
	// 			"margin":"0",
	// 			"border-left":"none",
	// 			"padding":"1px 0"
	// 		});
	// 	}
	// 	// dateThr.html('<h1>日期</h1><form action=""><input type="text" value="出发"><input type="text" value="返程"></form>');
	// 	// dateThr.find('input').css("width","35px");
	// 	// dateThr.find('input').eq(0).css("border-right","1px solid rgb(204,204,204)");
	// });
	// 国际，国内，鼠标滑过进行监听
	var air=$("#cenThrSub").find('.airTicket').children('ul').children('li').children('a');
	// alert(air.length);
	air.each(function(index, el) {
		var airOne=$(this);
			airOne.mouseover(function(event) {
				/* Act on the event */
				// alert(index);
				var airCurr=$("#cenThrSub").find('.airTicket').find('.focusedAir');
				airCurr.removeClass('focusedAir');
				airCurr.next().removeClass('airTicketSub');
				airOne.addClass('focusedAir');
				// if(index<2)
				{
					airOne.next().addClass('airTicketSub');
				}
			});
	});
	// 爱逛最后部分logo点击左键，右键，换一个
	var liList=$("#loveLifeCont .loveLifeThr span");
	liList.each(function(index, el) {
		var m=$(this);
		m.click(function(event) {
			/* Act on the event */
			var n=$(this).siblings('div.loveLife');
			n.removeClass('loveLife').siblings('div').addClass('loveLife');
		});
	});
	tryo();
});

function tryo(){
	$(window).scroll(function(event) {
		/* Act on the event */
		var h=$(this).scrollTop();
		var l=$("#item1").offset().top;
		var menu=$("#navigationGoods .menuNav");
		var item=$(".menu");
		var lenM=item.length;
		var curItem="";
		var b=$("#footer").offset().top;
		// alert(item.length);
		if((h>l-200)&&(b>h+400)) {
			menu.css("display","block");
		}else{
			menu.css("display","none");
		}
		item.each(function(index, el) {
			var $this=$(this);
			var itemTop=$this.offset().top;
			if(itemTop<h+200){
				curItem="#"+$this.attr('id');
			}else{
				return false;
			}
		});
		var thisOne=menu.find('[href='+curItem+']');
		// alert(thisOne.nodeValue);
		thisOne.parent("li").css('background-color', 'rgb(215,11,28)');
		thisOne.parent("li").siblings('li').css('background-color', 'rgb(145,136,136)');

	});
	countDown();
}
function countDown(){
	var h=$("#leftHour");
	var m=$("#leftMin");
	var s=$("#leftSec");
	var hour=2;
	var min=0;
	var sec=0;
	var timer=setInterval(function(){
		if(sec==0){
			if(min==0){
				if(hour==0){
					clearInterval(timer);
				}else{
					min=59;
					hour--;
				}
			}else{
				sec=59;
				min--;
			}
		}else{
			sec--;
		}
		h.val(hour);
		m.val(min);
		s.val(sec);
	},1000);
}






