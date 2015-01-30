var mongooseLocale = require('mongoose-locale');
var mongooseTrackable = require('mongoose-trackable');
var deepPopulate = require('mongoose-deep-populate');
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
		title: { type: String, locale: true },
		description: { type: String, locale: true },
		visible: Boolean,
		authors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
		langs: {
			languages: [String],
			def: String
		},
		date: {type: Date, default: Date.now}
});

lessonSchema = new Schema({
		title: { type: String, locale: true },
		description: { type: String, locale: true },
		vocabulary: [String],
		visible: Boolean,
		blocks: [{ type: Schema.Types.ObjectId, ref: 'Block' }],
		meta: {
			ex_counter: Number
		},
		date: {type: Date, default: Date.now}
});

var blockSchema = new Schema({
		title: { type: String, locale: true },
		description: { type: String, locale: true },
		study: [{ type: Schema.Types.ObjectId, ref: 'Stydy' }],
		test: {
			title: { type: String, locale: true },
			exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]
		},
		date: {type: Date, default: Date.now}
});

var studySchema = new Schema({
		title: { type: String, locale: true },
		statistic: Boolean,
		exercises: [{
			title: { type: String, locale: true },
			_exercise: { type: Schema.Types.ObjectId, ref: 'Exercise' }
		}],
		content: [{
			title: { type: String, locale: true },
			_content: { type: Schema.Types.ObjectId, ref: 'Content' }
		}],
		date: {type: Date, default: Date.now}
});

var contentSchema = new Schema({
		title: { type: String, locale: true },
		body: { type: String, locale: true },
		date: {type: Date, default: Date.now}
});

var exerciseSchema = new Schema({
		task: String,
		blocks: [{
			meta: {
				row: Number,
				col: Number
			},
			type: {type: String, default: 'Base'},
			answer: Schema.Types.Mixed,
			text: String,
			strings: [String],
			images: [String],
			audios: [String],
			video: {
				path: String,
				subs: [String]
			}
		}],
		date: {type: Date, default: Date.now},
});


// ------------------------
// *** Plugins Block ***
// ------------------------


courseSchema.plugin(mongooseLocale);
blockSchema.plugin(mongooseLocale);
studySchema.plugin(mongooseLocale);
contentSchema.plugin(mongooseLocale);
lessonSchema.plugin(mongooseLocale);
lessonSchema.plugin(deepPopulate);


// ------------------------
// *** Exports Block ***
// ------------------------


module.exports.User = mongoose.model('User', userSchema);
module.exports.Course = mongoose.model('Course', courseSchema);
module.exports.Lesson = mongoose.model('Lesson', lessonSchema);
module.exports.Block = mongoose.model('Block', blockSchema);
module.exports.Stydy = mongoose.model('Study', studySchema);
module.exports.Content = mongoose.model('Content', contentSchema);
module.exports.Exercise = mongoose.model('Exercise', exerciseSchema);