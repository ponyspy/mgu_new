$(document).ready(function() {
	$('.circles').on({
		mouseenter: function() {
			$('.lesson_blocks_item').slideDown(300);
		},
		mouseleave: function() {
			$('.lesson_blocks_item').slideUp(300);
		}
	});
});