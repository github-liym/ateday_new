/**
 * Created by 94216 on 2017/8/25.
 */

// document.addEventListener("DOMContentLoaded",function () {
// 	onResize();
// 	addEventListener("resize", onResize, false);
//
// },false);


$(function () {
	onResize();


	$(window).resize(function () {
		onResize();
		navMenu();
	});

	$(".index_m").fullpage({
		anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7'],
		// sectionsColor: ['#4A6FB1'],
		scrollOverflow: true,
		verticalCentered: false,
	})
	$(".index-m-navbar").on("click",".prev",function () {
		$(".index_m").fullpage.moveSectionUp();
	});
	$(".index-m-navbar").on("click",".next",function () {
		$(".index_m").fullpage.moveSectionDown();
	});

	$(".partner-list__m").on("click",".partner-more",function () {
		console.log("ddddd");
		$(this).closest(".partner-list__m").addClass("show");
		$(this).remove();
	});



	navMenu();
	$(".nav-main-fixed").on("click",function () {
		var _this = $(this);
		if (!_this.hasClass("moved")&&!_this.hasClass("moving")){
			if (_this.hasClass("open")) {
				_this.addClass("moved").removeClass("open");
				_this.width("");
				_this.height("");
				setTimeout(function () {
					console.log("ddd");
					_this.removeClass("moved")
				},500);
			}else {
				_this.addClass("moving").addClass("open");
				navMenu();
				setTimeout(function () {
					console.log("ddd");
					_this.removeClass("moving")
				},500);
			}
		}
	});
	$(".nav-main").on("click",".nav-icon",function () {
		var _this = $(this).closest(".nav-main");
		if (!_this.hasClass("moved")&&!_this.hasClass("moving")){
			if (_this.hasClass("open")) {
				_this.addClass("moved").removeClass("open");
				_this.width("");
				_this.height("");
				setTimeout(function () {
					console.log("ddd");
					_this.removeClass("moved")
				},500);
			}else {
				_this.addClass("moving").addClass("open");
				navMenu();
				setTimeout(function () {
					console.log("ddd");
					_this.removeClass("moving")
				},500);
			}
		}
	});
});


function onResize(){
	var width = $("body").width();
	var maxWidth = 720;
	var scale = width/maxWidth;
	var htmlFont = 22;
	if (width>=maxWidth){
		$("html").css({"font-size": "22px"});
	}else {
		$("html").css({"font-size":scale*htmlFont});
	}
	$("body").removeClass("rem-ready");

};

function navMenu() {
	var navMenuW = $("body").width()*0.88;
	// var navMenuH = "41.36364rem";
	// $(".nav-menu,.nav-main-fixed.open").width(navMenuW);
	// $(".nav-menu,.nav-main-fixed.open").height(navMenuH);
	$(".nav-main-fixed .nav-menu,.nav-main-fixed.open").css({"width":navMenuW,"max-height": $("body").height()*0.976});
}


