$(document).ready(function() {
	$('.circle').click(function(event) {
		$(this).data('clicked', !$(this).data('clicked'));

		if ($(this).data('clicked')) {
			$('.lesson_blocks_item').stop().slideDown(300);
			$('.dictionary_block').css('border-top', '1px solid black');
		}
		else {
			$('.lesson_blocks_item').stop().slideUp(300);
			$('.dictionary_block').css('border-top', 'none');
		}
	});
});