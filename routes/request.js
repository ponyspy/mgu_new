exports.index = function(req, res) {
  res.render('request/index_en.jade');
}

exports.one = function(req, res) {
  res.render('request/step_one_en.jade');
}

exports.two = function(req, res) {
  res.render('request/step_two_en.jade');
}