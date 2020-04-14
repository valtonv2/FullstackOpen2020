const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')

const BlogHandler = require('../models/blog')

const api = supertest(app)

beforeEach(async ()=>{

    await BlogHandler.Blog.deleteMany({})

    let singleBlog = new BlogHandler.Blog(helper.someBlogs[0])
    await singleBlog.save()

    singleBlog = new BlogHandler.Blog(helper.someBlogs[1])
    await singleBlog.save()


} )

test('Blogs return as JSON', async () =>{

    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

})

test('The right number of blogs are returned', async () => {

    const res = await api.get('/api/blogs')

    expect(res.body.length).toBe(2)
})

test('Id field should be called id', async () => {

    const res = await api.get('/api/blogs')
    const resid = res.body.map(blog => blog.id)

    resid.forEach(id => expect(id).toBeDefined())

})

test('Blogs should be added', async () => {

    const firstRes = await api
                .get('/api/blogs')

    const sendRes = await api
                .post('/api/blogs')
                .send(helper.someBlogs[2])
    
    const secondRes = await api
                .get('/api/blogs')

    expect(secondRes.body.length).toBe(firstRes.body.length + 1)
    

})

test('No likes-field equals zero likes', async () => {

    const sendRes = await api
                .post('/api/blogs')
                .send(helper.someBlogs[6]) //Blog without field "likes"

    expect(sendRes.body.likes).toBe(0)

})

test('Bad request without title and url gives 400', async () => {

    const sendRes = await api
                .post('/api/blogs')
                .send(helper.someBlogs[7]) //Blog without title or url
                .expect(400)

})

test('Deletion is possible', async () => {

    const firstRes = await api
                .get('/api/blogs')
    
    const target = firstRes.body[0]

    const deleteRes = await api
                .delete('/api/blogs/' + target.id)
                .expect(200)
            
    
    const secondRes = await api
                .get('/api/blogs')

    expect(secondRes.body.length).toBe(firstRes.body.length - 1)

})

test('Update is possible', async () => {

    const firstRes = await api
                .get('/api/blogs')
    
    const target = firstRes.body[0]

    target.likes = 42

    const updateRes = await api
                .put('/api/blogs/' + target.id)
                .send(target)
                .expect(200)
            
    
    const secondRes = await api
                .get('/api/blogs')

    expect(secondRes.body[0].likes).toBe(42)

})

afterAll(() => {

    mongoose.connection.close()

})