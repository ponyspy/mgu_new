var Course = require('../../models/main.js').Course;
var Lesson = require('../../models/main.js').Lesson;


// ------------------------
// *** List Lessons Block ***
// ------------------------


exports.list = function(req, res) {
	var id = req.params.id;

	Course.findById(id).populate('lessons').exec(function(err, course) {
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
		var lesson = new Lesson();
		course.lessons.push(lesson._id);

	  lesson.title = [{
	  	lg: 'ru',
	  	value: post.ru.title
	  }];
	  lesson.description = [{
	  	lg: 'ru',
	  	value: post.ru.description
	  }];

	  course.save(function(err, course) {
			lesson.save(function(err, lesson) {
				res.redirect('back');
			});
	  });
	});
}


// ------------------------
// *** Edit Lessons Block ***
// ------------------------


exports.edit = function(req, res) {
	var id = req.params.id;
	var lesson_id = req.params.l_id;

	Lesson.findById(lesson_id).exec(function(err, lesson) {
		res.render('auth/lessons/edit.jade', {lesson: lesson});
	});
}

exports.edit_form = function(req, res) {
	var id = req.params.id;
	var lesson_id = req.params.l_id;
	var post = req.body;

	Lesson.findById(lesson_id).exec(function(err, lesson) {
		lesson.i18n.title.set(post.ru.title, 'ru');
		lesson.i18n.description.set(post.ru.description, 'ru');

		lesson.save(function(err, lesson) {
			res.redirect('back');
		});
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