const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')



blogRouter.get('/', async (request, response) => {
    
    const blogs = await Blog.Blog.find({}).populate('user', {userName: 1, name: 1, _id: 1}).populate('comments', {_id: 1, content: 1})
    if(blogs) response.json(blogs.map(blog => blog.toJSON()))
    else response.status(404).end()
      
  })



  
  blogRouter.post('/', async (request, response) => {

    const token = jwt.verify(request.token, process.env.SECRET)
  
    if(!token || !token.id) return(response.status(401).json({error: "No token or invalid token"}))

    const author = await User.User.findById(token.id)

    if(!author) return(response.status(401).json({error: "Token does not correspond to any user. Log in again."}))

    const jsonauthor = author.toJSON()
    const jsonblog = request.body

    const blog = new Blog.Blog({
      title: jsonblog.title,
      author: jsonblog.author,
      url: jsonblog.url,
      likes: jsonblog.likes,
      user: author._id,
      comments: jsonblog.comments
    })

    const saveResult = await blog.save()

    jsonauthor.blogs = jsonauthor.blogs.concat(saveResult._id)
    const updateResult = await User.User.findByIdAndUpdate(jsonauthor.id, jsonauthor)
    const finalResult = await Blog.Blog.findById(saveResult._id).populate('user', {userName: 1, name: 1, _id: 1}).populate('comments', {_id: 1, content: 1})

    response.status(201).json(finalResult.toJSON())
   
  })




  blogRouter.delete('/:id', async(request, response) => {

    const deleteId = request.params.id
    const deleteTarget = await Blog.Blog.findById(deleteId)

    const token = jwt.verify(request.token, process.env.SECRET)
    if(!token || !token.id || token.id.toString() !== deleteTarget.user.toString()) return(response.status(401).json({error: "No token or invalid token"}))

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
      likes: body.likes,
      comments: body.comments
    }

    const result = await Blog.Blog.findByIdAndUpdate(targetId, updatedBlog, {new: true}).populate('user', {userName: 1, name: 1, _id: 1}).populate('comments', {_id: 1, content: 1})

    response.status(200).json(result.toJSON()).end()
})

blogRouter.post('/:id/comments', async(request, response) => {

  const targetId = request.params.id
  const comment = new Comment.Comment({content: request.body.content})

  const saveResult = await comment.save()

  const searchResult = await Blog.Blog.findById(targetId)
  const oldBlog = searchResult.toJSON()

  const updatedBlog = {
    title: oldBlog.title,
    author: oldBlog.author,
    url: oldBlog.url,
    likes: oldBlog.likes,
    comments: oldBlog.comments.concat(saveResult._id)
  }

  const result = await Blog.Blog.findByIdAndUpdate(targetId, updatedBlog, {new: true}).populate('user', {userName: 1, name: 1, _id: 1}).populate('comments', {_id: 1, content: 1})

  response.status(200).json(result.toJSON()).end()
})




  module.exports = blogRouter
