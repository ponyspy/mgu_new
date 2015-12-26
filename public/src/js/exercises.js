// Navigate


$(document).ready(function() {
	$(document).on('click', '.ex_item', function() {
		var hash = $('.content_block').attr('class').split(' ')[1];
		var select = $(this).index();
		var course = $('.lessons_block').attr('class').split(' ')[1];

		$.post('/demo_get_exercise', {course: course, hash: hash, ex_set: 'none', select: ++select}, function(data) {
			$('.exercise_columns_block').empty().append(data);
		});
		$('.ex_item').removeClass('select').eq(--select).addClass('select').css('color', 'green');
	});

	$(document).on('click', '.step_forward', function(event) {
		var hash = $('.content_block').attr('class').split(' ')[1];
		var select = $('.ex_item.select').next().index();
		var course = $('.lessons_block').attr('class').split(' ')[1];

		$.post('/demo_get_exercise', {course: course, hash: hash, ex_set: 'none', select: ++select}, function(data) {
			$('.exercise_columns_block').empty().append(data);
		});
		$('.ex_item').removeClass('select').eq(--select).addClass('select').css('color', 'green');
	});
});


// Sort composit

$(document).ready(function() {
	$(document).on('mouseenter', '.content_block', function() {
		$('.sort_items').sortable({
			deactivate: function(event, ui) {

				var arraysEqual = function(a, b) {
						if (a === b) return true;
						if (a === null || b === null) return false;
						if (a.length != b.length) return false;

						for (var i = 0; i < a.length; ++i) {
								if (a[i] !== b[i]) return false;
						}
						return true;
				};

				var items_position = $('.sort_item').map(function() {
					return +$(this).attr('position');
				});

				var etalon = $('.sort_item').map(function(i) {
					return i+1;
				});


				var result = arraysEqual(items_position, etalon);

				if (result) {
					$('.sort_item').css({'border-color': 'green', 'cursor': 'default'});
					$('.sort_items').sortable('disable');
				}
				else
					$('.sort_item').css('border-color', 'red');
			}
		});
	});
});

// Drag images

function dorpItem (event, ui) {
	var word = +ui.draggable.attr('position');
	var grid = +$(this).attr('position');

	if (word == grid) {
		ui.draggable.css({'background-color': 'green', 'cursor': 'default'}).draggable('disable');
	}
	else {
		ui.draggable.css({'background-color': 'red', 'cursor': 'default'}).draggable('disable');
	}
}

$(document).ready(function() {
	$(document).on('mouseenter', '.content_block', function() {
		$('.word_item').draggable();
		$('.grid_item').droppable({ activeClass: 'active', hoverClass: 'hover', drop: dorpItem });
	});
});


// Drop words


$(document).ready(function() {
	$(document).on('change', '.list', function() {
		var answer = $(this).attr('answer');
		var select = $(this).children('option:selected').val();

		if (answer == select) {
			$(this).attr('disabled', true).css('outline','2px solid green');
		}
		else {
			$(this).attr('disabled', true).css('outline','2px solid red');
		}
	});
});


// Select Grid


$(document).ready(function() {
	$(document).on('click', '.grid_item', function(event) {
		var answer = $(this).attr('answer');

		if (answer) {
			$(this).css('background-color', 'green');
		}
		else {
			$(this).css('background-color', 'red');
		}
	});
});


// Audio


$(document).ready(function() {
	$(document).on('click', '.audio_player', function() {
		var audio = $(this).prev('audio');
		if (audio.prop('paused') === false) {
			audio.trigger('pause');
			// $(this).text('◼︎');
		}
		else {
			audio.trigger('play');
			// $(this).text('▶︎');
		}
	});
});


// Video


$(document).ready(function() {
	$(document).on('click', '.player_play', function(event) {
		var video = $(this).parent('.video_player').prev('video');
		if (video.prop('paused') === false) {
			video.trigger('pause');
		}
		else {
			video.trigger('play');
		}
	});

	$(document).on('click', '.player_stop', function(event) {
		var video = $(this).parent('.video_player').prev('video');
		video.trigger('pause').prop('currentTime', 2);
	});
});


// Questions

$(document).ready(function() {
	$(document).on('click', '.question_item', function(event) {
		$(this).attr('answer') == 'true'
			? $(this).css('color', 'green')
			: $(this).css('color', 'red')
	});
});
