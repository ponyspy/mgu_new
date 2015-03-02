var Stydy = require('../models/main.js').Stydy;

exports.main = function(req, res) {
	var stydy = new Stydy();

	stydy.setPropertyLocalised('exercises.title', 'Привет', 'ru');

	stydy.save(function(err, stydy) {
		res.send('ok')
	});
}

exports.exercise = function(req, res) {
	res.render('exercises/l1/b1/exs1.jade')
}