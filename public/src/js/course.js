$(document).ready(function() {

	$(window)
	.on('load',function(){
		$(this).trigger('hashchange');
	})
	.on('hashchange',function(){
		 var hash = location.hash.slice(1);
		$('.circle').eq(hash - 1).trigger('click')
	});

	$('.circle').click(function(event) {
		$(this).data('clicked', !$(this).data('clicked'));

		if ($(this).data('clicked')) {
			var lesson = $(this).index();
			var course = $(this).parent('.circles').attr('class').split(' ')[1]
			$.post('/demo_get_lesson', {course: course, lesson: ++lesson}).done(function(lesson) {
				$('.lesson_navigator_inner').empty().append(lesson).promise().done(function() {
					$('.lesson_navigator_inner').stop().slideDown(300);
					$('.lesson_navigator_inner').css('border-bottom', '1px solid black');
				});
			});
		}
		else {
			$('.lesson_navigator_inner').stop().slideUp(300);
			$('.lesson_navigator_inner').css('border-bottom', 'none');
		}
	});


	$(document).on('click', '.set_item.exercise', function(event) {
		var hash = $(this).attr('class').split(' ')[2];

		$.post('/demo_get_exercise', {hash: hash, select: 1}).done(function(data) {
			$('.content_block').empty().append(data).attr('class', 'content_block').addClass(hash);
			$('.ex_item').eq(0).addClass('select');
			$('.lesson_navigator_inner').stop().slideUp(300);
			$('.dictionary_block').css('border-top', 'none');
			$('.circle').data('clicked', false);
		});
	});

	$(document).on('click', '.set_item.content', function(event) {
		var hash = $(this).attr('class').split(' ')[2];

		$.post('/demo_get_grammar', {hash: hash, select: 1}).done(function(data) {
			$('.content_block').empty().append(data).attr('class', 'content_block').addClass(hash);
			$('.ex_item').eq(0).addClass('select');
			$('.lesson_navigator_inner').stop().slideUp(300);
			$('.dictionary_block').css('border-top', 'none');
			$('.circle').data('clicked', false);
		});
	});

});