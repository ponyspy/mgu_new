$(document).ready(function() {
	$('.block_item_exercises').each(function(index, el) {
		$(this).children('.category_exercises_block:first').show();
	});

	$('.category_item').click(function(event) {
		var current = $(this).index();
		$(this).closest('.block_item').children('.block_item_exercises').children('.category_exercises_block').hide().eq(current).show();
		// $('.category_exercises_block').hide().eq(current).show();
	});
});