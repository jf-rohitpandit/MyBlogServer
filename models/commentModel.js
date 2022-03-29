const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  text: {
    type: String,
    required: true,
  },
})

const commentsSchema = mongoose.Schema({
  postId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  commentList: [{ type: commentSchema }],
})

module.exports = mongoose.model('comments', commentsSchema)
