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
		var exercise = $(this).attr('class').split(' ')[2];

		exercise = exercise.split('_');

		exercise = {
			lesson: exercise[0],
			block: exercise[1],
			set: exercise[2],
			type: exercise[3]
		}

		$.post('/demo_get_exercise', {exercise: exercise}).done(function(data) {
			$('.content_block').empty().append(data);
			$('.lesson_navigator_inner').stop().slideUp(300);
			$('.dictionary_block').css('border-top', 'none');
			$(this).data('clicked', false);
		});
	});
});