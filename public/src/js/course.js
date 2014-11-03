$(document).ready(function() {
	$('.circle').on({
		mouseenter: function(event) {
			$('.lesson_blocks_item').stop().slideDown(300);
			$('.dictionary_block').css('border-top', '1px solid black');
		},
		mouseleave: function(event) {
				$('.lesson_blocks_item').stop().slideUp(300);
				$('.dictionary_block').css('border-top', 'none');
		},
		click: function() {
			$(this).off();
		}
	});
});