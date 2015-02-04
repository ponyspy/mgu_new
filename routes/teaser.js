var User = require('../models/main.js').User;

var jade = require('jade');
var email = require('emailjs')
		mailer = email.server.connect({
			user: "mailer@omnilingo.ru",
			password: "cer3000",
			host: "smtp.yandex.ru",
			port: "465",
			ssl: true
});

exports.index = function(req, res) {
	res.render('teaser');
}

exports.email = function(req, res) {
	var post = req.body;

	User.findOne({'email': post.email}).exec(function(err, user) {

		if (!user) {
			var new_user = new User({
				email: post.email
			});

			new_user.save(function(err, new_user) {
				var userMsg = {
					from: 'mailer@omnilingo.ru',
					to: post.email,
					subject: post.lng == 'ru' ? 'Добро дожаловать!' : 'Welcome!',
					attachment: [{
						data: post.lng == 'ru' ? jade.renderFile('./views/teaser/email_ru.jade') : jade.renderFile('./views/teaser/email_en.jade'),
						alternative: true
					}]
				}

				mailer.send(userMsg, function(err) {
					res.send('ok');
				});
			});
		} else {
			res.send('used');
		}
	});
}