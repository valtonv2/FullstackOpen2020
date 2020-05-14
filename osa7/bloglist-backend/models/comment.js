const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
   content: {type: String, required: true}
  })

  commentSchema.set('toJSON', {

    transform: (doc, ret) => {

      ret.id = ret._id.toString()
      delete ret._id
      delete ret.__v

    }

  })

const Comment = mongoose.model('Comment', commentSchema)

module.exports = {Comment}