// Sort composit

$(document).ready(function() {
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
	$('.word_item').draggable();
	$('.grid_item').droppable({ activeClass: 'active', hoverClass: 'hover', drop: dorpItem });
});


// Drop words


$(document).ready(function() {
	$('.list').change(function() {
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
	$('.grid_item').click(function(event) {
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
	$('.audio_player').click(function() {
		if (this.paused === false) {
			this.pause();
			$(this).css('background-color', 'green');
		}
		else {
			this.play();
			$(this).css('background-color', 'red');
		}
	});
});