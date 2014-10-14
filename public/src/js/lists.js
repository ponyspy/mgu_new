$(document).ready(function() {
	function remove (event) {
		var id  = $(this).attr('id');

		if (confirm(event.data.description)) {
			$.post(event.data.path, {'id': id}).done(function() {
				location.reload();
			});
		}
	}

	$('.rm_course').on('click', {path:'/auth/courses/remove', description: 'Удалить курс?'}, remove);
	$('.rm_lesson').on('click', {path:'/auth/lessons/remove', description: 'Удалить урок?'}, remove);

});