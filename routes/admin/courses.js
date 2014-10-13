var Course = require('../../models/main.js').Course;


// ------------------------
// *** Add Course Block ***
// ------------------------


exports.add = function(req, res) {
	res.render('auth/courses/add.jade');
}

exports.add_form = function(req, res) {
	var post = req.body;
	var date_modify = new Date();
	var course = new Course();

	course.visible = post.visible;
	course.langs = post.langs;
	course.title[post.langs.def].value = post.ru.title;
	course.title[post.langs.def].update = date_modify;
	course.description[post.langs.def].value = post.ru.description;
	course.description[post.langs.def].update = date_modify;
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
	var date_modify = new Date();

	Course.findById(id).exec(function(err, course) {

		course.visible = post.visible;
		course.langs = post.langs;
		course.title[post.langs.def].value = post.ru.title;
		course.title[post.langs.def].update = date_modify;
		course.description[post.langs.def].value = post.ru.description;
		course.description[post.langs.def].update = date_modify;

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
			if (course.title[lang].value != post[lang].title) {
				course.title[lang].value = post[lang].title;
				course.title[lang].update = date_modify;
			}
			if (course.description[lang].value != post[lang].description) {
				course.description[lang].value = post[lang].description;
				course.description[lang].update = date_modify;
			}
			callback();
		},function() {
			course.save(function(err, course) {
				res.redirect('back');
			});
		});
	});
}