var fs = require('fs');
var gm = require('gm').subClass({ imageMagick: true });
var async = require('async');

var mongoose = require('mongoose');
		mongoose.connect('localhost', 'main');

var express = require('express'),
		bodyParser = require('body-parser'),
		multer = require('multer'),
		accepts = require('accepts'),
		cookieParser = require('cookie-parser'),
		session = require('express-session'),
		methodOverride = require('method-override'),
			app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.pretty = true;

app.use(express.static(__dirname + '/public'));
app.use(multer({ dest: __dirname + '/uploads'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());

app.use(session({
	key: 'mgu.sess',
	resave: false,
	saveUninitialized: false,
	secret: 'keyboard cat',
	cookie: {
		path: '/',
		maxAge: 1000 * 60 * 60 // 1 hour
	}
}));


app.use(function(req, res, next) {
	res.locals.session = req.session;
	res.locals.locale = req.cookies.locale || 'ru';
	next();
});


// -------------------
// *** Routes Block ***
// -------------------


var main = require('./routes/main.js');
var courses = require('./routes/courses.js');
var auth = require('./routes/auth.js');
var content = require('./routes/content.js');
var files = require('./routes/files.js');

var admin_courses = require('./routes/admin/courses.js');
var admin_lessons = require('./routes/admin/lessons.js');
var admin_blocks = require('./routes/admin/blocks.js');


// ------------------------
// *** Midleware Block ***
// ------------------------


function checkAuth (req, res, next) {
	req.session.user_id ? next() : res.redirect('/login');
}


// ------------------------
// *** Handlers Block ***
// ------------------------


var deleteFolderRecursive = function(path) {
	if ( fs.existsSync(path) ) {
		fs.readdirSync(path).forEach(function(file, index){
			var curPath = path + '/' + file;
			fs.statSync(curPath).isDirectory()
				? fs.statSync(curPath).isDirectory()
				: fs.unlinkSync(curPath);
		});
		fs.rmdirSync(path);
	}
}


function toMatrix(arr, row) {
	var a = [];
	for (var i = 0; i < row;) {
		a[i] ? a[i].push(arr.shift()) : (a[i] = []);
		i = ++i % row;
		if (!arr.length) return a;
	}
}


// ------------------------
// *** Main Routes Block ***
// ------------------------


// === Main Route
app.route('/').get(main.index);


// === Locale Route
app.route('/lang/:locale').get(main.locale);



// === Courses Route
app.route('/courses').get(courses.index);

// === Course Route
app.route('/courses/:id').get(courses.course);



// ------------------------
// *** Admin Courses Block ***
// ------------------------


// === Admin courses Route
app.route('/auth/courses').get(checkAuth, admin_courses.list);


// === Admin @add courses Route
app.route('/auth/courses/add')
	 .get(checkAuth, admin_courses.add)
	 .post(checkAuth, admin_courses.add_form);


// === Admin @edit courses Route
app.route('/auth/courses/edit/:id')
	 .get(checkAuth, admin_courses.edit)
	 .post(checkAuth, admin_courses.edit_form);


// === Admin @locale courses Route
app.route('/auth/courses/locale/:id')
	 .get(checkAuth, admin_courses.locale)
	 .post(checkAuth, admin_courses.locale_form);


// === Admin @remove courses Route
app.route('/auth/courses/remove')
	 // .post(checkAuth, admin_courses.remove);


// ------------------------
// *** Admin Lessons Block ***
// ------------------------


// === Admin lessons Route
app.route('/auth/lessons')
	 // .get(checkAuth, admin_lessons.list);


// === Admin @add lessons Route
app.route('/auth/lessons/add')
	 // .get(checkAuth, admin_lessons.add)
	 // .post(checkAuth, admin_lessons.add_form);


// === Admin @edit lessons Route
app.route('/auth/lessons/edit/:id')
	 // .get(checkAuth, admin_lessons.edit)
	 // .post(checkAuth, admin_lessons.edit_form);


// === Admin @locale lessons Route
app.route('/auth/lessons/locale/:id')
	 // .get(checkAuth, admin_lessons.locale)
	 // .post(checkAuth, admin_lessons.locale_form);


// === Admin @remove lessons Route
app.route('/auth/lessons/remove')
	 // .post(checkAuth, admin_lessons.remove);


// ------------------------
// *** Admin Blocks Block ***
// ------------------------


// === Admin blocks Route
app.route('/auth/blocks')
	 // .get(checkAuth, admin_blocks.list);


// === Admin @add blocks Route
app.route('/auth/blocks/add')
	 // .get(checkAuth, admin_blocks.add)
	 // .post(checkAuth, admin_blocks.add_form);


// === Admin @edit blocks Route
app.route('/auth/blocks/edit/:id')
	 // .get(checkAuth, admin_blocks.edit)
	 // .post(checkAuth, admin_blocks.edit_form);


// === Admin @locale blocks Route
app.route('/auth/blocks/locale/:id')
	 // .get(checkAuth, admin_blocks.locale)
	 // .post(checkAuth, admin_blocks.locale_form);


// === Admin @remove blocks Route
app.route('/auth/blocks/remove')
	 // .post(checkAuth, admin_blocks.remove);


// ------------------------
// *** Auth Routes Block ***
// ------------------------


// === Auth Route
app.route('/auth').get(checkAuth, auth.main);


// === Login Route
app.route('/login')
	 .get(auth.login)
	 .post(auth.login_form);


// === Logout Route
app.route('/logout').get(auth.logout);


// === Registr Route
app.route('/registr')
	 .get(auth.registr)
	 .post(auth.registr_form);


// ------------------------
// *** Content Routes Block ***
// ------------------------


// === Contacts Route
app.route('/about').get(content.about);


// ------------------------
// *** Files Routes Block ***
// ------------------------


// === Files #sitemap.xml Route
app.route('/sitemap.xml').get(files.sitemap);


// === Files #robots.txt Route
app.route('/robots.txt').get(files.robots);


// ------------------------
// *** Error Handling Block ***
// ------------------------


app.use(function(req, res, next) {
	var accept = accepts(req);
	res.status(404);

	// respond with html page
	if (accept.types('html')) {
		res.render('error', { url: req.url, status: 404 });
		return;
	}

	// respond with json
	if (accept.types('json')) {
			res.send({
			error: {
				status: 'Not found'
			}
		});
		return;
	}

	// default to plain-text
	res.type('txt').send('Not found');
});

app.use(function(err, req, res, next) {
	var status = err.status || 500;

	res.status(status);
	res.render('error', { error: err, status: status });
});


// ------------------------
// *** Connect server Block ***
// ------------------------


app.listen(3000);
console.log('http://127.0.0.1:3000')