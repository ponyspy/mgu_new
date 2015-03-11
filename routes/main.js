exports.index = function(req, res) {
  // res.render('main');
  res.redirect('/courses');
}

exports.locale = function(req, res) {
  res.cookie('locale', req.params.locale);
  res.redirect('back');
}