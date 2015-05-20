var User = require('../../models/main.js').User;

exports.index = function(req, res) {

  User.find().exec(function(err, users) {
    res.render('auth/users', {users: users});
  });
}

exports.user = function(req, res) {
	var id = req.params.id;

  User.findById(id).exec(function(err, user) {
    res.render('auth/users/user.jade', {user: user});
  });
}

exports.user_form = function(req, res) {
	var id = req.params.id;

  User.findById(id).exec(function(err, user) {
  	user.status = req.body.status;
  	user.save(function(err, user) {
  		res.render('auth/users/user.jade', {user: user});
  	});
  });
}