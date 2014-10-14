var Course = require('../../models/main.js').Course;


// ------------------------
// *** List Lessons Block ***
// ------------------------


exports.list = function(req, res) {
	var id = req.params.id;

	Course.findById(id).exec(function(err, course) {
		res.render('auth/lessons', {course: course});
	});
}


// ------------------------
// *** Add Lessons Block ***
// ------------------------


exports.add = function(req, res) {
	var id = req.params.id;

	Course.findById(id).exec(function(err, course) {
		res.render('auth/lessons/add.jade', {course: course});
	});
}

exports.add_form = function(req, res) {
	var post = req.body;
	var id = req.params.id;

	Course.findById(id).exec(function(err, course) {
		var lesson = {};
		lesson.title = post.ru.title;
		lesson.description = post.ru.description;
		course.lessons.push(lesson);

		course.save(function(err, lesson) {
			res.redirect('back');
		});
	});
}


// ------------------------
// *** Edit Lessons Block ***
// ------------------------


exports.edit = function(req, res) {
	var id = req.params.id;
	var lesson_id = req.params.l_id;

	Course.findById(id).exec(function(err, course) {
		var lesson = course.lessons.id(lesson_id);
		res.render('auth/lessons/edit.jade', {lesson: lesson});
	});
}



// ------------------------
// *** Remove Lessons Block ***
// ------------------------


exports.remove = function(req, res) {
	var id = req.body.id;

	Course.findOne({'lessons._id': id}).exec(function(err, course) {
		course.lessons.id(id).remove();
		course.save(function(err, course) {
			res.redirect('back');
		});
	});
}