var Request = require('../../models/main.js').Request;

exports.list = function(req, res) {
	Request.find().exec(function(err, requests) {
		res.render('auth/requests', {requests: requests});
	});
}

exports.request = function(req, res) {
	var id = req.params.id;

	Request.findById(id).populate('user').exec(function(err, request) {
		res.render('auth/requests/request.jade', {request: request});
	});
}