const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  text: {
    type: String,
    required: true,
  },
})

const commentsSchema = mongoose.Schema({
  postId: {
    type: mongoose.Types.ObjectId,
    ref: 'blog',
  },
  commentList: [{ type: commentSchema }],
})

module.exports = mongoose.model('comments', commentsSchema)
