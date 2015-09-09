var Course = require('../models/main.js').Course;

exports.index = function(req, res) {
  res.render('courses');
}

exports.speak_russian = function(req, res) {
	res.render('courses/speak_russian.jade');
}

exports.phonetic = function(req, res) {
	res.render('courses/phonetic.jade');
}

exports.gram = function(req, res) {
	res.render('courses/gram.jade');
}

exports.listening = function(req, res) {
	res.render('courses/listening.jade');
}

exports.reading = function(req, res) {
	res.render('courses/reading.jade');
}