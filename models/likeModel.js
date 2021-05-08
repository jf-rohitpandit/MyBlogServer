const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
	postId: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	users: {
		type: [mongoose.Types.ObjectId],
	},
});

module.exports = mongoose.model('likes', likeSchema);
