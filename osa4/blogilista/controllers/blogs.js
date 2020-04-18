const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')



blogRouter.get('/', async (request, response) => {
    
    const blogs = await Blog.Blog.find({}).populate('user', {userName: 1, name: 1, _id: 1})
    if(blogs) response.json(blogs.map(blog => blog.toJSON()))
    else response.status(404).end()
      
  })
  
  blogRouter.post('/', async (request, response) => {

    const allUsers = await User.User.find({})

    const author = allUsers[0]

    const jsonauthor = author.toJSON()
    const jsonblog = request.body

    const blog = new Blog.Blog({
      title: jsonblog.title,
      author: jsonblog.author,
      url: jsonblog.url,
      likes: jsonblog.likes,
      user: author._id
    })

    const saveResult = await blog.save()

    jsonauthor.blogs = jsonauthor.blogs.concat(saveResult._id)
    const updateResult = await User.User.findByIdAndUpdate(jsonauthor.id, jsonauthor)

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
