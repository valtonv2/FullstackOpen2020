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

  blogRouter.delete('/:id', async(request, response) => {

    const deleteId = request.params.id

    await Blog.Blog.deleteOne({_id: deleteId}, (err) => {
      if(err){ 
        console.error(err)
        response.status(400).end()
      }
    })
    console.log("Delete blog id ", deleteId)
    response.status(200).end()
  })

  blogRouter.put('/:id', async(request, response) => {

    const targetId = request.params.id
    const body = request.body

    const updatedBlog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    const result = await Blog.Blog.findByIdAndUpdate(targetId, updatedBlog, {new: true})

    response.status(200).json(result.toJSON).end()
})

  module.exports = blogRouter
