const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')

const BlogHandler = require('../models/blog')
const UserHandler = require('../models/user')

const api = supertest(app)

beforeEach(async ()=>{

    await BlogHandler.Blog.deleteMany({})
    await UserHandler.User.deleteMany({})

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



test('Users can be created and got', async () => {

    const testUser = helper.someUsers[0]

    const firstRes = await api.post('/api/users')
                    .send(testUser)
                    .expect(201)

    const secondRes = await api.get('/api/users')
                    .expect(201)
    
    console.log(secondRes.body)

    expect(secondRes.body[0].name).toBeDefined
    expect(secondRes.body[0].name).toBe(testUser.name)

})

test('False users are not accepted', async () => {

    const shortUsername = await api.post('/api/users')
                        .send(helper.someUsers[1])
                        .expect(400)

    const shortPassword = await api.post('/api/users')
                        .send(helper.someUsers[2])
                        .expect(400)

    const notUnique = await api.post('/api/users')
                        .send(helper.someUsers[3])
                        .expect(400)

})

afterAll(() => {

    mongoose.connection.close()

})

