/**
 * Created by 94216 on 2017/12/7.
 */
$(function () {
	$(".reply-controller__icon").on("click",function () {
		var html = '<div class="reply-controller__main">' +
				'<div class="reply-controller__container">' +
					'<textarea id="replyController" class="word-count" maxlength="200" data-count="200"></textarea>' +
					'<div class="text-count">还可以输入<span class="num">200</span>个字符</div>' +
				'</div>' +
				'<div class="reply-controller__btn">' +
					'<span class="text-8b8b8b reply-controller__close" >取消</span>' +
					'<a class="btns btn-bebebe" href="javascript:">回复</a>' +
				'</div>' +
			'</div>';
		$(".reply-controller__main").remove();
		$(this).closest(".reply-controller").append(html);
	});
	$(".reply-controller").on("click",".reply-controller__close",function () {
		$(".reply-controller__main").remove();
	});




});