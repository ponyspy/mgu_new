var Course = require('../../models/main.js').Course;
var async = require('async');

// ------------------------
// *** Add Course Block ***
// ------------------------


exports.add = function(req, res) {
	res.render('auth/courses/add.jade');
}

exports.add_form = function(req, res) {
	var post = req.body;
	var course = new Course();

  course.title = [{
  	lg: post.langs.def,
  	value: post.ru.title
  }];
  course.description = [{
  	lg: post.langs.def,
  	value: post.ru.description
  }];

	course.visible = post.visible;
	course.langs = post.langs;
	course.authors.push(req.session.user_id);

	course.save(function(err, course) {
		res.redirect('back');
	});
}


// ------------------------
// *** List Courses Block ***
// ------------------------


exports.list = function(req, res) {
	Course.find().exec(function(err, courses) {
		res.render('auth/courses', {courses: courses});
	});
}


// ------------------------
// *** Edit Courses Block ***
// ------------------------


exports.edit = function(req, res) {
	var id = req.params.id;

	Course.findById(id).exec(function(err, course) {
		res.render('auth/courses/edit.jade', {course: course});
	});
}

exports.edit_form = function(req, res) {
	var id = req.params.id;
	var post = req.body;

	Course.findById(id).exec(function(err, course) {

		course.visible = post.visible;
		course.langs = post.langs;

		course.i18n.title.set(post.ru.title, post.langs.def);
		course.i18n.description.set(post.ru.description, post.langs.def);

		course.save(function(err, course) {
			res.redirect('back');
		});
	});
}


// ------------------------
// *** Locale Course Block ***
// ------------------------


exports.locale = function(req, res) {
	var id = req.params.id;

	Course.findById(id).exec(function(err, course) {
		res.render('auth/courses/locale.jade', {course: course});
	});
}

exports.locale_form = function(req, res) {
	var id = req.params.id;
	var post = req.body;
	var date_modify = new Date();

	Course.findById(id).exec(function(err, course) {
		async.forEach(course.langs.languages, function(lang, callback) {
			if (course.i18n.title.get(lang) != post[lang].title) {
				course.i18n.title.set(lang, post[lang].title)
			}
			if (course.i18n.description.get(lang) != post[lang].description) {
				course.i18n.description.set(lang, post[lang].description)
			}
			callback();
		},function() {
			course.save(function(err, course) {
				res.redirect('back');
			});
		});
	});
}