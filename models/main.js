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
		lessons: [{
			title: String,
			description: String,
			visible: Boolean,
			blocks: [{ type: Schema.Types.ObjectId, ref: 'Block' }],
		}],
		visible: Boolean,
		authors: [{ type: Schema.Types.ObjectId, ref: 'User' }],
		langs: {
			languages: [String],
			def: String
		},
		date: {type: Date, default: Date.now},
});

var blockSchema = new Schema({
		title: String,
		description: String,
		vocabulary: [String],
		study: [{
			title: String,
			statistic: Boolean,
			exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
		}],
		content: [{
			title: String,
			statistic: Boolean,
			content: [{
				title: String,
				body: String
			}]
		}],
		test: {
			title: String,
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


// ------------------------
// *** Exports Block ***
// ------------------------


module.exports.User = mongoose.model('User', userSchema);
module.exports.Course = mongoose.model('Course', courseSchema);
module.exports.Block = mongoose.model('Block', blockSchema);
module.exports.Exercise = mongoose.model('Exercise', exerciseSchema);