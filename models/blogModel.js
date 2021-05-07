const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
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
});

module.exports = mongoose.model('blog', blogSchema);
