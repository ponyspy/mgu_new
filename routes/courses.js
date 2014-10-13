var Course = require('../models/main.js').Course;

exports.index = function(req, res) {
  Course.find().exec(function(err, courses) {
    res.render('courses', {courses: courses});
  });
}

exports.course = function(req, res) {
	var id = req.params.id;
	Course.findById(id).exec(function(err, course) {
		res.render('courses/course.jade', {course: course});
	});
}