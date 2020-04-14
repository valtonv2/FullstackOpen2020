const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: {type: Number, default: 0}
  })

  blogSchema.set('toJSON', {

    transform: (doc, ret) => {

      ret.id = ret._id.toString()
      delete ret._id
      delete ret._v

    }

  })

const Blog = mongoose.model('Blog', blogSchema)

module.exports = {Blog}