var fs = require('fs');
var jade = require('jade');
var path = require('path');

var appDir = path.dirname(require.main.filename);


exports.get_lesson = function(req, res) {
	var post = req.body;

	var html = jade.renderFile(appDir + '/views/lessons/' + 'lesson' + post.lesson + '.jade');
	res.send(html)
}


exports.get_exercise = function(req, res) {
	var ex = req.body.exercise;
	// var html = jade.renderFile(appDir + '/views/exercises/'+ post.exercise.type +'.jade');
	var html = jade.renderFile(appDir + '/views/exercises/'+ ex.lesson + '/' + ex.block + '/' + ex.set + '.jade');
	res.send(html)
}