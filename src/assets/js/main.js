/**
 * Created by Administrator on 2017/6/1.
 * 公共js
 */
var base = (function () {
	var Base = function (options) {
		this.opts = $.extend({}, Base.DEFAULTS,options);
	};

	Base.DEFAULTS = {};
	Base.prototype = {
		init: function () {
			this.ellipsis();
		},
		ellipsis: function () {
			var ellipsis = document.getElementsByClassName("ellipsis");
			for(var i=0; i<ellipsis.length; i++) {
				var ellipsisH = ellipsis[i].offsetHeight;
				var text = ellipsis[i].getElementsByTagName("p");
				if (text[0]) {
					while (text[0].offsetHeight > ellipsisH) {
						var textNew = text[0].innerText.replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "...");
						text[0].innerText = textNew;
					}
				}
			}
		}
	};
	var init = function (option) {
		var base = $("body").data("base");
		if (!base){
			$("body").data('base', (base = new Base(typeof option === 'object' && option)));
			base.init();
		}
		if (typeof option === 'string') base[option]();
	};
	return {
		init: init
	}
})();

$(function () {

  /*if($(".nav-main").length>0){
    $("body").css({'padding-top':'4.77273rem'})
  }*/
	// 首页banner高度
	ibannerH();
	
	//给A标签添加新页面打开
	$(".school-item a").attr("target","_blank");
	$(".exhibition-item a").attr("target","_blank");
	$(".opus-item a").attr("target","_blank");
	$(".member-item a").attr("target","_blank");
	$(".i-cooperationlist a").attr("target","_blank");
	$(".exhibit-list a").attr("target","_blank");
	$(".info-school a").attr("target","_blank");
	//结束
  // ========== 回到顶部 ==========
  $(".buoy-common").on("click",".scrollTop",function () {
    console.log(123);
    $("html,body").stop().animate({scrollTop:"0px"});
  });
  // ========== 回到顶部 end ==========

  // ========== 弹窗 ==========
  // 关闭弹窗
  $("body").on("click", ".layer-close",function () {
    $(".layerbox,.layerbg").remove();
    $("body").removeClass("layersc").css({"margin-right": "0px"});
	  $("#header").css({"padding-right":"0px"});
  });
  // 帐密登录、手机登录切换
  $("body").on("click",".tabul a",function () {
    $(this).addClass("active").siblings("a").removeClass("active");
    $(".tab-wrap form").eq($(this).index()).addClass("active").siblings("form").removeClass("active");
    console.log();
  });
  // 发送验证码60s倒计时
  /*$("body").on("click",".btn-send",function () {
    var _this = $(this);
    if(!$(this).hasClass("btn-sended")){
      $(this).addClass("btn-sended");
      $(this).html("<span>60</span>s后可重新发送");
      var countdown=60;
      setTime($(this));
      function setTime(_this) {
        if(countdown<=0){
          console.log(456);
          _this.removeClass("btn-sended").html("发送验证码");
        }else {
          // var val = ;
          countdown--;
          // console.log(countdown);
          _this.html("<span>"+countdown+"</span>s后可重新发送");
          setTimeout(function() {
            setTime(_this);
          },1000)
        }

      }


    }


  });*/
  // ========== 弹窗 end ==========

  

  // 字数统计
  $(".comment-item,.word-count-item,.reply-item,.comment-list").on('focus keyup input paste','.word-count',function () {
    var count = $(this).data('count');
    var num = $(this).val().length;
    if(count-num>-1){
      $(this).siblings(".text-count").find('.num').html(count-num);
    }
  });
  // ========== 评论回复 ==========
  // 打开二级回复
  /*$(".discuss-num .num").click(function () {
    $(this).closest('.discuss-num').hide();
    $(this).closest('.discuss-num').siblings(".discuss-item-wrap").show();
  });*/
  // ========== 评论回复 end ==========
  // 关闭广告
  $("body").on("click",".advert-close",function () {
    $(this).closest(".advert").hide();
  });
  buoy();



  // ========== 会员中心 ==========
  // 打开编辑个签弹窗
  // 关闭编辑个签弹窗
  $(".icon-close").click(function () {
    $("body").removeClass("layersc").css({"margin-right": "0px"});
    $(".layerbg").remove();
    $(this).closest(".fancybox").hide();
  });

  // ========== 会员中心 end ==========

  // 下拉列表

  // 文件上传
  $(".upload .upload-input-file").change(function () {
    console.log("文件上传");
    if ($(this).parent().html().indexOf("class=\"upload-url\"") != -1) {
      var fileUrl = $(this).val();
      $(this).parent().children(".upload-url").val(fileUrl);
    }
    else {
      var fileUrl = $(this).val();
      var urlArr = fileUrl.split("\\");
      var getName = urlArr[urlArr.length - 1];//截取路径并获取文件的名字
      $(this).parent().children(".upload-tip").text(getName).fadeIn("slow");
      //$(this).parent().children(".upload-btn").val(getName);//按钮上变成文件名称
      timeout = setTimeout(function () {
        $(".upload-tip").fadeOut("slow");
      }, 5000);
    }
  });

  $(".ucomment-btn").click(function () {
    $(this).closest(".ucomment-item").find(".ureply-item").slideToggle();
  });

  // 鼠标经过放大
  $(".scaleW").hover(function () {
    var _w = $(this).width();
    var _scale = _w*1.1;
    var _margin = (_scale-_w)/2;
    $(this).find(".thumbnailbg").animate({'width':_scale,'height':_scale,'margin-top':-_margin,'margin-left':-_margin},100)
  },function () {
    var _w = $(this).width();
    $(this).find(".thumbnailbg").animate({'width':_w,'height':_w,'margin-top':'0px','margin-left':'0px'},50)
  });

  // 选项卡
  $("body").on("click",'.tabs a',function () {
    $(this).closest("li").addClass("active").siblings().removeClass("active")
  });
  $(".tabs").on("click",'.tabs-switch',function () {
    var tabs = $(this).data('switch');
    $(tabs).addClass("active").siblings(".tabs-plane").removeClass("active");
	  base.init('ellipsis');
  });
  // 选项卡

  // 用户详情-升序降序
  $("#memberOpus .tabs").on("click","a",function () {
    /*var item = $(this).closest("li");
    if($(this).closest("li").hasClass("active")){
      item.addClass("desc").siblings().removeClass("desc");
    }*/

  });

  // 作品详情页-右侧资料卡悬浮
  opusIntro();

  // 画展详情页右侧浮动
	galleryInfoRight();



	header();

	base.init();
});
$(window).scroll(function () {
  buoy();


	header();

// 作品详情页-右侧资料卡悬浮
  opusIntro();

// 画展详情页右侧浮动
    galleryInfoRight();


});
$(window).resize(function () {
  buoy();
// 首页banner高度
	ibannerH();

});
// 画展详情页右侧浮动
function galleryInfoRight() {
	if ($(document).scrollTop()>210){
		$(".gallery-info__right").addClass("fixed");
	}else {
		$(".gallery-info__right").removeClass("fixed");
	}
}
function ibannerH() {
// 首页banner高度
	var bh = $(window).height();
	var bw = $(window).width();
	if (bw<768){
		$(".i-banner").height(bh-52-50);
    }else {
		$(".i-banner").height('');
    }
}
function IsPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = ["Android", "iPhone",
		"SymbianOS", "Windows Phone",
		"iPad", "iPod"];
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}

function header() {
	if (IsPC()){
		if($(document).scrollTop()>30){
			$("#header").addClass("fixedH");
		}else {
			$("#header").removeClass("fixedH");
		}
	}
}


// 媒体查询宽度
function medias() {
  if(!$("body").hasClass("layersc")){
    var w1 = $(window).width();
    $("body").addClass("layersc");
    var w2 = $(window).width();
    $("body").removeClass("layersc");
  }
  var dedia = {"width":w2,"scroll":(w2 - w1)};
  return dedia;
}

// 作品详情页-右侧资料卡悬浮
function opusIntro() {
  if($(window).scrollTop()>39){
    $("#info-opus .panel-right").css({
      "top": $(window).scrollTop()-59+40
    })
  }else {
    $("#info-opus .panel-right").css({
      "top": "20px"
    })
  }
}

function sendCode(btn) {
  var _this = $(btn);
  if(!_this.hasClass("btn-sended")){
    _this.addClass("btn-sended");
    _this.html("<span>60</span>s后可重新发送");
    var countdown=60;
    setTime(_this);
    function setTime(_this) {
      if(countdown<=0){
        _this.removeClass("btn-sended").html("发送验证码");
      }else {
        // var val = ;
        countdown--;
        // console.log(countdown);
        _this.html("<span>"+countdown+"</span>s后可重新发送");
        setTimeout(function() {
          setTime(_this);
        },1000)
      }

    }


  }
}


// 浮标、浮标广告
function buoy() {

  var h = $(window).height();
  var w = $(window).width();
  var domH = $(document).height();
  var footH = $("#footer").innerHeight();
  var y = $(document).scrollTop();
  var buoyCommonH = $(".buoy-common").height();
  var buoyAdvH = $(".buoyadv").height();
  var buoyCommonTop = h-buoyCommonH-30;
  var buoyAdvTop = h-buoyCommonH-buoyAdvH-180;
  if($(".buoy-common")){
	  if (y<buoyCommonH+30+290){
		  $(".buoy-common").css({"top":h-y+290});
      }else if(domH-y<=h+footH){
		  $(".buoy-common").css({"top":(domH-y-footH-30-buoyCommonH)});
      }else {
		  $(".buoy-common").css({"top":buoyCommonTop});
      }
  }
  if($(".buoyadv")){
	  if (y<buoyAdvH+buoyCommonH+180+0){
		  $(".buoyadv").css({"top":h-y+0});
	  }else if(domH-y<=h+footH){
		  $(".buoyadv").css({"top":(domH-y-footH-180-buoyCommonH-buoyAdvH)});
	  }else {
		  $(".buoyadv").css({"top":buoyAdvTop});
	  }
  }

}
// 浮标、浮标广告 end
function layer(layer,current) {
  if($("body").hasClass("layersc")){
    if (current){
      getPage(layer);
    }else {
      $(".layerbox").remove();
      getPage(layer);
    }
  }else {
    var w1 = $(window).width();
    $("body").addClass("layersc");
    var w2 = $(window).width();
    $("body").removeClass("layersc");
    $("body").addClass("layersc").css({"margin-right":(w2 - w1) + "px"});
    $("#header").css({"padding-right":(w2 - w1) + "px"});
    getPage(layer);
  }

}
function getPage(page){
  // var url = "/layer/"+page+'.html';
  var url = "/Public/index/"+page+'.html';
  var xhr = null;
  try{
    xhr = new XMLHttpRequest();
  }catch(e){
    xhr = new ActiveXObject( 'Microsoft.XMLHTTP' );
  }

  xhr.onreadystatechange = function (event) {
    if (xhr.readyState ==4){
      if (xhr.status==200){
        if($(".layerbg").length<1){
          $("body").append('<div class="layerbg"></div>');
        }
        $(".layerbox").removeClass("current");
        $("body").append(xhr.responseText);
        $("#"+page).addClass("current");

        if(page==='loginSuccess'||page==='registerSuccess'){
          // 2秒后返回到当前页
          returnCurrentPage("current",2,'');
        }else if(page==='registerSuccess'){
          // 2秒后跳转到首页
          returnCurrentPage("http://ate.91ant.com",2,'');
        }else if(page==='revisePwdSuccess'){
          // 2秒后返打开登录弹窗
          returnCurrentPage("opo",2,'login');
        }
      }else {
        console.log("Request was unsuccessful:" + xhr.status);
      }
    }
  };
  xhr.open("get", url,true);
  xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xhr.send(null);
}
// x秒后跳转
// returnCurrentPage(url:跳转的路径【如果为current刷新页面，如果为opo则弹窗】,time:倒计时时间,page：打开的弹窗窗口id);
function returnCurrentPage(url,time,page) {
  setTime(time);
  function setTime(time) {
    if(time<=0){
      if (url==='current'){
        location.reload(true);
      }else if(url==='opo'){

        if(!$("#"+page).is(":visible()")){
          layer(page,"");
        }
      }else {
        if($('#registerSuccess').is(':visible()')){
          location.href = url;
        }

      }

    }else {
      $(".countdown").find('.count').html(time);
      time--;
      setTimeout(function() {
        setTime(time);
      },1000)
    }
  }
}

// 表单验证
function validation(btn){
  var result = true;
  var validationIput = $(btn).closest(".validation-form").find(".validate-control");
  $.each(validationIput,function(){
    result = vCheck($(this),result);
  });
  console.log(result);
  return result;
};
function vCheck(obj,result){
  var validationVal = $(obj).val();
  var validation = $(obj).data("validation");
  console.log();
  var regstr={
    "notnull":/^\s*$/g,//不能为空
    "email":/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,//邮箱
    "ip":/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g,//IP地址
    "telphone":/^1(3|4|5|7|8)\d{9}$/,//手机号码
    "telphone1":/^[1][0-9]{10}$/,//手机号码
    "phone":/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$|(^(13[0-9]|15[0|3|6|7|8|9]|18[8|9])\d{8}$)/,//电话号码

    "int":/^[-]{0,1}[0-9]{1,15}$/,//整数
    "number":/^[-]{0,1}(\d+)[\.]{0,1}(\d+)$/,//数字，可以带小数
    "username":/^[0-9a-zA-Z\_]{6,15}$/,//用户名		数字、字母、下划线
    // "password":/^[0-9a-zA-Z\_]{6,12}$/,//密码		数字、字母、下划线
    "password":/^[0-9a-zA-Z\_]{8,16}$/,//密码		数字、字母、下划线
    "aaa":/^[0-9a-zA-Z\u4e00-\u9fa5]+$/,//数字、字母、汉字
    "fullname":/^[\u4e00-\u9fa5]{2,6}$/, //2到6个汉字,
    "Code_num":/^[0-9]{4}///验证码
  };
  var str= {
    "username": "用户名",
    "telphone": "手机号码",
    "password": "密码",
    "passwordConfirm": "密码",
    "userAgreement": "用户使用协议",
    "Code_num":"验证码"
  }
  var sttTip = {
    "username": "用户名必须由6-15位数字或英文字母组成",
    "telphone": "手机号码格式不正确",
    "password": "密码由8位数字或英文字母组成",
    "passwordConfirm": "两次密码输入不相同",
    "Code_num":"请填写验证码"
  }
  if(regstr.notnull.test(validationVal)){
    // 空
    $(obj).closest(".form-group").addClass("error");
    if($(obj).siblings(".icon-validate").is(":visible")){
      // $(obj).siblings(".validate-tip").html(str[validation]+"不能为空!");
    }else {
      $(obj).after('<svg class="icon icon-validate" aria-hidden="true"> <use xlink:href="#icon-gantanhao"></use> </svg>')
    }
    if($(obj).siblings(".validate-tip").is(":visible")){
      $(obj).siblings(".validate-tip").html(str[validation]+"不能为空");
    }else {
      $(obj).after('<span class="validate-tip">'+str[validation]+'不能为空</span>')
    }
    result=false;
  }else if(validation!="notnull"){
    if (validation === "userAgreement"){
      if($(obj).is(':checked')){
        $(obj).siblings(".validate-tip").remove();
      }else {
        if($(obj).siblings(".validate-tip").is(":visible")){
          $(obj).siblings(".validate-tip").html(sttTip[validation]);
        }else {
          $(obj).closest(".form-group").append('<span class="validate-tip">'+sttTip[validation]+'</span>')
        }
      }

    }else if (validation === "passwordConfirm"){
      var password = $(".validate-password").val();
      if(validationVal!=password) {
        if($(obj).siblings(".validate-tip").is(":visible")){
          $(obj).siblings(".validate-tip").html(sttTip[validation]);
        }else {
          $(obj).after('<span class="validate-tip">'+sttTip[validation]+'</span>')
        }
        if($(obj).siblings(".icon-validate").is(":visible")){}else {
          $(obj).after('<svg class="icon icon-validate" aria-hidden="true"> <use xlink:href="#icon-gantanhao"></use> </svg>')
        }
        result=false;
      }else {
        $(obj).closest(".form-group").removeClass("error");
        $(obj).siblings(".validate-tip").remove();
        $(obj).siblings(".icon-validate").remove();
      }
    }else if(regstr[validation].test(validationVal)){
      $(obj).closest(".form-group").removeClass("error");
      $(obj).siblings(".validate-tip").remove();
      $(obj).siblings(".icon-validate").remove();
    }else {
      $(obj).closest(".form-group").addClass("error");
      if($(obj).siblings(".validate-tip").is(":visible")){
        $(obj).siblings(".validate-tip").html(sttTip[validation]);
      }else {
        $(obj).after('<span class="validate-tip">'+sttTip[validation]+'</span>')
      }
      if($(obj).siblings(".icon-validate").is(":visible")){}else {
        $(obj).after('<svg class="icon icon-validate" aria-hidden="true"> <use xlink:href="#icon-gantanhao"></use> </svg>')
      }

      result=false;
    }
  }
  return result;
};
// 用户中心-修改密码

// 表单验证 end

// 统计剩余字数
function wordCount(count) {
  console.log(count);
}


// 发布评论成功
function commentSuccess(btn) {
  console.log($(btn).siblings("input").val());
  var wrap = $(btn).closest(".comment-input");
  var comment = $(btn).siblings("input").val();
  $(btn).siblings("input").val('');
  wrap.append("<span class='comment-float omit'>"+comment+"</span>");
  $(".comment-float").show();
  $(".comment-float").delay(4000).fadeOut(1000);


  setTimeout(function () {
    $(".comment-float").remove();
  },5000)

}
function openReply(btn) {
  $(btn).closest('.discuss-num').hide();
  $(btn).closest('.discuss-num').siblings(".discuss-item-wrap").show();
}

// 移动端 打开 关闭 过滤器
function openFilter(btn) {
  var filter = $(btn).closest(".filter");
  filter.find(".filter-scroll").addClass("active");
  filter.find(".backdrop").addClass("active");
}
function closeFilter(btn) {
  var filter = $(btn).closest(".filter");
  filter.find(".filter-scroll").removeClass("active");
  filter.find(".backdrop").removeClass("active");
}

// 打开弹窗背景
function openLayerBg() {
  console.log("打开");
  if(!$("body").hasClass("layersc")){
    var w1 = $(window).width();
    $("body").addClass("layersc");
    var w2 = $(window).width();
    $("body").removeClass("layersc");
    $("body").addClass("layersc").css({"margin-right":(w2 - w1) + "px"});
    $("#header").css({"padding-right":(w2 - w1) + "px"});
  }
  if($(".layerbg").length<1){
    $("body").append('<div class="layerbg"></div>');
  }
}

// 关闭弹窗-删除弹窗
// close:点击关闭的按钮；currentClose：只关闭当前弹窗，背景和其他弹窗都不关闭
function closeLayer(close,currentClose) {
  if(currentClose){
    $(close).closest(".layerbox").hide();
  }else {
    $("body").removeClass("layersc").css({"margin-right": "0px"});
    $("#header").css({"padding-right":"0px"});
    $(".layerbg").remove();
    $(close).closest(".layerbox").hide();
  }
}
// 关闭弹窗-显示弹窗
function openFancy(fancy) {
  openLayerBg();
  $(fancy).show();
}
// 关闭弹窗-隐藏弹窗
function closeFancy(close,currentClose) {
  if(currentClose){
    $(close).closest(".fancybox").hide();
  }else {
    $("body").removeClass("layersc").css({"margin-right": "0px"});
    $("#header").css({"padding-right":"0px"});
    $(".layerbg").remove();
    $(close).closest(".fancybox").hide();
  }
}


// 步骤
function stepNext(btn) {
  var $index = $(btn).closest('.step-plane').index();
  console.log($(btn).closest('.step-plane').index());
  $(".step-list li").eq($index).addClass("ed");
  $(".step-list li").eq($index+1).addClass("active").siblings("li").removeClass("active");
  $(".step-plane").eq($index+1).addClass("active").siblings(".step-plane").removeClass("active");
}


// 展开关闭回复
function replySwitch(btn) {
  var reply = $(btn).closest(".reply-wrap").find(".reply-item");
  if(!reply.is(':visible')){
    $(btn).closest(".reply-wrap").append('<div class="reply-item">' +
      '<div class="textarea-wrap">' +
      '<textarea class="word-count" name="" id="" cols="30" rows="5" maxlength="200" data-count="200"></textarea>' +
      '<span class="text-count">还可以输入 <i class="num">200</i> 个字符</span>' +
      '</div>' +
      '<div class="btn-wrap">' +
      '<span class="text-8b8b8b reply-close" onclick="replyClose(this);">取消</span>' +
      '<a class="btns btn-bebebe">回复</a>' +
      '</div>' +
      '</div>');
  }else {
    reply.remove();
  }
}
function replyClose(btn){
  $(btn).closest(".reply-wrap").find(".reply-item").remove();
}

function like(btn) {
  var _num = parseInt($(btn).find(".num").text());
  if(!$(btn).hasClass("ed")){
    $(btn).find(".num").text(_num+1);
    $(btn).addClass("animation ed");
    setTimeout(function () {
        $(btn).removeClass("animation");
    },1000)
  }
}
//检测系列
function checkPhoneFormat(phone){ 
    if(!(/^1[34578]\d{9}$/.test(phone))){ 
        return false; 
    } 

    return true;
}

function checkEmailFormat(mail) {  
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;  
    if (filter.test(mail)) {  
        return true;   
    } else {  
        return false;  
    }   
}

function alertObj(obj) {  
    var description = "";  
    for (var i in obj) {  
        description += i + " = " + obj[i] + "\n";  
    }  
    alert(description);  
}  
 function check_phone(phone){
        var is_exist = false;

        $.ajax({
            url:"/user/check_phone_handle",
            data:"phone="+phone,
            async: false,
            dataType:'json',
            success:function(data){
                if(data.state == true){
                    is_exist = data.is_exist;
                }else{
                    is_exist = false;
                }
            }
        });

        return is_exist;
    }
function auto_login_check(){

    //alert("auto_login_check");

    $.ajax({
        url:"/user/auto_login_handle",
        async: false,
        dataType:'json',
        success:function(data){
            if(data.state == true){
                window.location.reload();
            }
        }
    });

    return false;
}
//检测结束

//验证码发送
var countdown=60;
	var clear_time;
    function settime(obj) { 
        if (countdown==0) { 
            obj.removeAttribute("disabled");    
            obj.innerHTML="发送验证码"; 
            //obj.html("发送验证码");
            countdown = 60;
			return;
        } else{ 
            obj.setAttribute("disabled", true); 
            obj.innerHTML = "重新发送(" + countdown + ")"; 
            //obj.html("重新发送(" + countdown + ")");
            countdown--; 
        } 
		clear_time=setTimeout(function(){settime(obj)},1000);
    } 
	function send_verify(account, obj, type){

        //console.log(account);
       //console.log("sc:"+account[0].name);
		//window.alert(account[0].name);
        if(account.val() == ""){
            $("#"+account[0].name+"_error").html("请输入手机号码");
            $("#"+account[0].name+"_error").removeClass("hidden");
            account.focus();
            return false;
        }

        if(false == checkPhoneFormat(account.val())){
            $("#"+account[0].name+"_error").html("请输入正确的手机号码");
            $("#"+account[0].name+"_error").removeClass("hidden");
            account.focus();
            return false;
        }

        var is_exist = check_phone(account.val());

        if(type == "register"){

            if(is_exist == true){

                $("#"+account[0].name+"_error").html("手机号码已经存在");
                $("#"+account[0].name+"_error").removeClass("hidden");
                account.focus();
                return false;
            }

        }else if(type == "reset_pwd"){

            if(is_exist == false){

                $("#"+account[0].name+"_error").html("手机号码不存在");
                $("#"+account[0].name+"_error").removeClass("hidden");
                account.focus();
                return false;
            }
        }
        $("#"+account[0].name+"_error").html("");
        $("#"+account[0].name+"_error").addClass("hidden");

        $.ajax({
            url:"/user/send_verify_handle",
            data:{
                account:account.val(),
                type:"mobile" 
            },
            async: false,
            dataType:'json',
            success:function(data){
                if(data.state == true){
						if(clear_time!=""){
							clearTimeout(clear_time);
							countdown=60;
							}
							settime(obj);
                    $("#"+account[0].name+"_error").html("");
                    $("#"+account[0].name+"_error").addClass("hidden");
                }else{
                    $("#"+account[0].name+"_error").html(data.info);
                    $("#"+account[0].name+"_error").removeClass("hidden");
                }
            }
        });
    }
	//验证码发送end

	 function check_user_name(user_name){
        var is_exist = false;

        $.ajax({
            url:"/user/check_user_name",
            data:"user_name="+user_name,
            async: false,
            dataType:'json',
            success:function(data){
                if(data.state == true){
                    is_exist = data.is_exist;
                }else{
                    is_exist = false;
                }
            }
        });

        return is_exist;
    }
	function check_verify(phone,verify){
	 var is_exist = false;
	$.ajax({
            url:"/user/get_verify_user_handle",
            data:{
                phone:phone,
                verify:verify
				},
            async: false,
            dataType:'json',
            success:function(data){
                if(data.state == true){
				 is_exist =  true;
				}else{
				 is_exist =   false;
				}
	}
	});
	 return is_exist;
	}