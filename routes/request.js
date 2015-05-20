var path = require('path');
var nodemailer = require('nodemailer');
var jade = require('jade');

var __appdir = path.dirname(require.main.filename);

transporter = nodemailer.createTransport({
	auth: {
		user: 'mailer@omnilingo.ru',
		pass: 'cer3000',
	},
	host: 'smtp.yandex.ru',
	port: '465',
	secure: true
});

exports.index = function(req, res) {
  res.render('request/index_en.jade');
}

exports.free = function(req, res) {
  res.render('request/free_request_en.jade');
}

exports.free_form = function(req, res) {
	var params = {
		user: req.session.user_id,
		level: req.body.level,
		time: req.body.time
	}

	var opts = {
		from: 'Робот omnilingo <mailer@omnilingo.ru>',
		to: 'desade4me@gmail.com',
		subject: 'Регистрация на бесплатное занятие',
		html: jade.renderFile(__appdir + '/views/mail/free.jade', {params: params})
	}

	transporter.sendMail(opts, function(err, info) {
		res.redirect('back');
	});
}

exports.course = function(req, res) {
  res.render('request/course_request_en.jade');
}


exports.course_form = function(req, res) {

	var params = {
		user: req.session.user_id,
		type: req.body.type
	}

	var opts = {
		from: 'Робот omnilingo <mailer@omnilingo.ru>',
		to: 'desade4me@gmail.com',
		subject: 'Регистрация на курс Время говорить по-русски',
		html: jade.renderFile(__appdir + '/views/mail/course.jade', {params: params}),
		attachments: [
			{
				filename: 'contract.' + req.files.contract.extension,
				path: req.files.contract.path
			},
			{
				filename: 'invoice.' + req.files.invoice.extension,
				path: req.files.invoice.path
			},
			{
				filename: 'application.' + req.files.application.extension,
				path: req.files.application.path
			},
		]
	}

	transporter.sendMail(opts, function(err, info) {
		res.redirect('back');
	});
}