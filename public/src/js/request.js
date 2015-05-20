$(document).ready(function() {
	$('form').on('submit', function() {
		var type = $('.type').is(':checked');
		var files = true;
		$('.files').each(function() {
			if ($(this).val() == '') {
				files = false;
			}
		});

		if (type && files) {
			$('form').submit();
		} else {
			return false;
		}

	});
});