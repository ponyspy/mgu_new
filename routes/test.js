var Stydy = require('../models/main.js').Stydy;

exports.main = function(req, res) {
	var stydy = new Stydy();

	stydy.setPropertyLocalised('exercises.title', 'Привет', 'ru');

	stydy.save(function(err, stydy) {
		res.send('ok')
	});
}