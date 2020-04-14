const dummy = (blogs) => {

    return 1

}

const totalLikes = (blogs) => {

    if(blogs.length == 0){
        return 0
    }else{
    const likes = blogs.map(blog => blog.likes).reduce((a,b) => a+b, 0)
        return likes
    }

}

const favoriteBlog = (blogs) => {

    if(blogs.length == 0) {
        console.log('The correct if is run')
        return 0
    }else{
        const likes = blogs.map(blog => blog.likes)
        const max = Math.max(...likes)
        console.log('Max index is ', likes.indexOf(max))
        return blogs[likes.indexOf(max)]
    }

}

const someBlogs = [

{
  id: "5a422a851b54a676234d17f7",
  title: "React patterns",
  author: "Michael Chan",
  url: "https://reactpatterns.com/",
  likes: 7,
  __v: 0
},
{
  id: "5a422aa71b54a676234d17f8",
  title: "Go To Statement Considered Harmful",
  author: "Edsger W. Dijkstra",
  url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  likes: 5,
  __v: 0
},
{
  id: "5a422b3a1b54a676234d17f9",
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  likes: 12,
  __v: 0
},
{
  id: "5a422b891b54a676234d17fa",
  title: "First class tests",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
  likes: 10,
  __v: 0
},
{
  id: "5a422ba71b54a676234d17fb",
  title: "TDD harms architecture",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  likes: 0,
  __v: 0
},
{
  id: "5a422bc61b54a676234d17fc",
  title: "Type wars",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  likes: 2,
  __v: 0
},
{
  id: "5a422bc61b54a676234d17fc",
  title: "Type wars",
  author: "Robert C. Martin",
  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
  __v: 0
}  
]


module.exports = {

    dummy,
    totalLikes,
    favoriteBlog, 
    someBlogs
}