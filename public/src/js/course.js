$(document).ready(function() {
	$('.circle').click(function(event) {
		$(this).data('clicked', !$(this).data('clicked'));

		if ($(this).data('clicked')) {
			$('.lesson_navigator_inner').stop().slideDown(300);
			$('.dictionary_block').css('border-top', '1px solid black');
		}
		else {
			$('.lesson_navigator_inner').stop().slideUp(300);
			$('.dictionary_block').css('border-top', 'none');
		}
	});
});