const blogRouter = require('express').Router()
const Blog = require('../models/blog')



blogRouter.get('/', (request, response) => {
    Blog.Blog
      .find({})
      .then(blogs => {
        response.json(blogs.map(blog => blog.toJSON()))
      })
  })
  
  blogRouter.post('/', (request, response) => {
    const blog = new Blog.Blog(request.body)
    
    blog
      .save()
      .then(result => {
        response.status(201).json(result.toJSON())
      })

  })

  module.exports = blogRouter
