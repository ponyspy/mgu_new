var mongooseLocale = require('mongoose-locale');
var mongoose = require('mongoose'),
			Schema = mongoose.Schema;

var userSchema = new Schema({
		login: String,
		password: String,
		email: String,
		status: {type: String, default: 'User'},
		date: {type: Date, default: Date.now},
});

var courseSchema = new Schema({
		title: {
			type: String,
			locale: true
		},
		description: {
			type: String,
			locale: true
		},
		lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
		visible: Boolean,
		authors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		langs: {
			languages: [String],
			def: String
		},
		date: {type: Date, default: Date.now},
});

var lessonSchema = new Schema({
		title: String,
		description: String,
		blocks: [{ type: Schema.Types.ObjectId, ref: 'Block' }],
		date: {type: Date, default: Date.now},
});

var blockSchema = new Schema({
		title: String,
		vocabulary: [String],
		statistic: Boolean,
		categorys: {
			content: {
				title: String,
				content: [{
					title: String,
					body: String
				}]
			},
			test: {
				title: String,
				exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]
			},
			study: [{
				title: String,
				description: String,
				exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
			}]
		},
		date: {type: Date, default: Date.now},
});

var exerciseSchema = new Schema({
		type: {type: String, default: 'Base'},
		task: String,
		answer: Schema.Types.Mixed,
		text: String,
		strings: [String],
		image: String,
		audio: [String],
		video: {
			path: String,
			subs: [String]
		},
		exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
		date: {type: Date, default: Date.now},
});


// ------------------------
// *** Plugins Block ***
// ------------------------


courseSchema.plugin(mongooseLocale);


// ------------------------
// *** Exports Block ***
// ------------------------


module.exports.User = mongoose.model('User', userSchema);
module.exports.Course = mongoose.model('Course', courseSchema);
module.exports.Lesson = mongoose.model('Lesson', lessonSchema);
module.exports.Block = mongoose.model('Block', blockSchema);
module.exports.Exercise = mongoose.model('Exercise', exerciseSchema);