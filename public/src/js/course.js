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


	$('.set_item.exercise').click(function(event) {
		var type = $(this).attr('class').split(' ')[2];

		$.post('/demo_get_exercise', {type: type}).done(function(data) {
			$('.content_block').empty().append(data);
		});
	});
});