var Lesson = require('../../models/main.js').Lesson;


// ------------------------
// *** Add Lesson Block ***
// ------------------------


exports.add = function(req, res) {
	res.render('auth/lessons/add.jade');
}

exports.add_form = function(req, res) {
	var post = req.body;
	var date_modify = new Date();
	var lesson = new Lesson();

	lesson.langs = post.langs;
	lesson.title[post.langs.def].value = post.ru.title;
	lesson.title[post.langs.def].update = date_modify;
	lesson.description[post.langs.def].value = post.ru.description;
	lesson.description[post.langs.def].update = date_modify;

	lesson.save(function(err, lesson) {
		res.redirect('back');
	});
}