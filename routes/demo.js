var fs = require('fs');
var jade = require('jade');


exports.get_exercise = function(req, res) {
	var post = req.body;

	var html = jade.renderFile('path/to/file.jade', options);

	res.send(html)
}