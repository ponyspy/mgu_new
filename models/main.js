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
		title: { type: String, locale: true, track: true },
		description: { type: String, locale: true, track: true },
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
		title: { type: String, locale: true, track: true },
		description: { type: String, locale: true, track: true },
		vocabulary: [String],
		visible: Boolean,
		blocks: [{ type: Schema.Types.ObjectId, ref: 'Block' }],
		meta: {
			ex_counter: Number
		},
		date: {type: Date, default: Date.now}
});

var blockSchema = new Schema({
		title: { type: String, locale: true, track: true },
		description: { type: String, locale: true, track: true },
		studys: [{ type: Schema.Types.ObjectId, ref: 'Stydy' }],
		test: { type: Schema.Types.ObjectId, ref: 'Set' },
		date: {type: Date, default: Date.now}
});

var studySchema = new Schema({
		title: { type: String, locale: true, track: true },
		exercise_sets: [{ type: Schema.Types.ObjectId, ref: 'Set' }],
		content_sets: [{ type: Schema.Types.ObjectId, ref: 'Set' }],
		date: {type: Date, default: Date.now}
});

var setSchema = new Schema({
		title: { type: String, locale: true, track: true },
		statistic: Boolean,
		exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
		content: [{ type: Schema.Types.ObjectId, ref: 'Content' }]
});

var contentSchema = new Schema({
		title: { type: String, locale: true, track: true },
		body: { type: String, locale: true, track: true },
		date: {type: Date, default: Date.now}
});

var exerciseSchema = new Schema({
		task: { type: String, locale: true, track: true },
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


courseSchema.plugin(mongooseLocale, {lang_override: 'lg', value_override: 'value'});
blockSchema.plugin(mongooseLocale, {lang_override: 'lg', value_override: 'value'});
studySchema.plugin(mongooseLocale, {lang_override: 'lg', value_override: 'value'});
contentSchema.plugin(mongooseLocale, {lang_override: 'lg', value_override: 'value'});
lessonSchema.plugin(mongooseLocale, {lang_override: 'lg', value_override: 'value'});
setSchema.plugin(mongooseLocale, {lang_override: 'lg', value_override: 'value'});
// lessonSchema.plugin(deepPopulate);


// ------------------------
// *** Exports Block ***
// ------------------------


module.exports.User = mongoose.model('User', userSchema);
module.exports.Course = mongoose.model('Course', courseSchema);
module.exports.Lesson = mongoose.model('Lesson', lessonSchema);
module.exports.Block = mongoose.model('Block', blockSchema);
module.exports.Stydy = mongoose.model('Study', studySchema);
module.exports.Set = mongoose.model('Set', setSchema);
module.exports.Content = mongoose.model('Content', contentSchema);
module.exports.Exercise = mongoose.model('Exercise', exerciseSchema);