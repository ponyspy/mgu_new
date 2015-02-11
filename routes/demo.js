var fs = require('fs');
var jade = require('jade');
var path = require('path');

var appDir = path.dirname(require.main.filename);


exports.get_exercise = function(req, res) {
	var post = req.body;

	var html = jade.renderFile(appDir + '/views/exercises/'+ post.exercise.type +'.jade');
	res.send(html)
}