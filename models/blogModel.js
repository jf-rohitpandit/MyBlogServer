const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		writer: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		views: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('blog', blogSchema);
