var mongooseLocale = require('mongoose-locale');
var mongooseTrackable = require('mongoose-trackable');
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
		date: {type: Date, default: Date.now},
});

lessonSchema = new Schema({
		title: { type: String, locale: true },
		description: { type: String, locale: true },
		visible: Boolean,
		blocks: [{ type: Schema.Types.ObjectId, ref: 'Block' }]
});

var blockSchema = new Schema({
		title: { type: String, locale: true },
		description: { type: String, locale: true },
		vocabulary: [String],
		study: [{
			title: { type: String, locale: true },
			statistic: Boolean,
			exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
		}],
		content: [{
			title: { type: String, locale: true },
			statistic: Boolean,
			content: [{
				title: { type: String, locale: true },
				body: { type: String, locale: true }
			}]
		}],
		test: {
			title: { type: String, locale: true },
			exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]
		},
		date: {type: Date, default: Date.now},
});

var exerciseSchema = new Schema({
		task: String,
		columns: [{
			blocks: [{
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
			}]
		}],
		date: {type: Date, default: Date.now},
});


// ------------------------
// *** Plugins Block ***
// ------------------------


courseSchema.plugin(mongooseLocale);
blockSchema.plugin(mongooseLocale);
lessonSchema.plugin(mongooseLocale);


// ------------------------
// *** Exports Block ***
// ------------------------


module.exports.User = mongoose.model('User', userSchema);
module.exports.Course = mongoose.model('Course', courseSchema);
module.exports.Lesson = mongoose.model('Lesson', lessonSchema);
module.exports.Block = mongoose.model('Block', blockSchema);
module.exports.Exercise = mongoose.model('Exercise', exerciseSchema);