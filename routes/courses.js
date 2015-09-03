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