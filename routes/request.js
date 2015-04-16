exports.index = function(req, res) {
  res.render('request/index.jade');
}

exports.one = function(req, res) {
  res.render('request/step_one.jade');
}

exports.two = function(req, res) {
  res.render('request/step_two.jade');
}