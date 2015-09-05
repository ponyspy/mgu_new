var fs = require('fs');
var jade = require('jade');
var path = require('path');

var appDir = path.dirname(require.main.filename);


exports.get_lesson = function(req, res) {
	var post = req.body;

	var html = jade.renderFile(appDir + '/views/lessons/' + post.course + '/lesson' + post.lesson + '.jade');
	res.send(html)
}


exports.get_exercise = function(req, res) {
	var hash = req.body.hash;
	var select = req.body.select;
	var ex_set = req.body.ex_set == 'none' ? false : true;
	var exercise = hash.split('_');
	var course = req.body.course;

	var meta = {
		lesson: exercise[0],
		block: exercise[1],
		set: exercise[2],
		type: exercise[3]
	}

	var path = meta.lesson + '/' + meta.block + '/' + meta.set;

	var html = jade.renderFile(appDir + '/views/exercises/' + req.body.course + '/' + path + '.jade', {course: course, ex_path: path, ex_set: ex_set, select: select});
	res.send(html);
}

exports.get_grammar = function(req, res) {
	var hash = req.body.hash;
	var grammar = hash.split('_');
	var course = req.body.course;

	var meta = {
		lesson: grammar[0],
		block: grammar[1],
		set: grammar[2],
		type: grammar[3]
	}

	var path = meta.lesson + '/' + meta.block + '/' + meta.set;

	var html = jade.renderFile(appDir + '/views/text/' + course + '/grammar/' + path + '.jade', {course: course});
	res.send(html);
}