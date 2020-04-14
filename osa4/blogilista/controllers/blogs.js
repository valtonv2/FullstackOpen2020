const blogRouter = require('express').Router()
const Blog = require('../models/blog')



blogRouter.get('/', async (request, response) => {
    
    const blogs = await Blog.Blog.find({})
    if(blogs) response.json(blogs.map(blog => blog.toJSON()))
    else response.status(404).end()
      
  })
  
  blogRouter.post('/', async (request, response) => {
    const blog = new Blog.Blog(request.body)
    
    const saveResult = await blog.save()
    response.status(201).json(saveResult.toJSON())
   
  })

  module.exports = blogRouter
