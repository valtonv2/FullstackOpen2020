const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose')
const Book = require('./dbmodels/book')
const Author = require('./dbmodels/author')
const User = require('./dbmodels/user')
const jwt = require('jsonwebtoken')

const SECRET = 'salfkghjaoödshgaöogvhaöodsfvhasdfuo1345124'


//Database connection
mongoose.connect('mongodb+srv://librarian:guiltyspark@cluster0-sjkt7.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
.then(console.log('Connect to database'))
.catch(error => console.log(error.message))


const typeDefs = gql`

  type User {
    username: String!,
    favoriteGenre: String!,
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String,
    published: Int,
    author: Author,
    id: String,
    genres: [String]
   }

   type Author {
    name: String,
    id: String,
    born: Int,
    bookCount: Int
   }

   type Mutation {

    addBook(
        title: String!,
        author: String!,
        published: Int!,
        genres: [String]!
    ):Book

    editAuthor(
        name: String!,
        setBornTo: Int!
    ):Author

    createUser(
      username: String!,
      favoriteGenre: String!
    ):User

    login(
      username: String!,
      password: String!
    ):Token

   }


  type Query {
      bookCount: Int!,
      authorCount: Int!,
      allBooks(author: String, genre: String): [Book]!,
      allAuthors: [Author!]!,
      me: User
  }
`

const resolvers = {
  Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {

        const books = await Book.find({}).populate('author')

         let result = args.author ? books.filter(b => b.author.name === args.author):books //Check author
         result = args.genre ? result.filter(b => b.genres.includes(args.genre)): result //Check genre
         return result
      },
      allAuthors: () => {
        return Author.find({})
      },

      me: (root, args, context) => {
        return(context.currentUser)
      }
  },

  Mutation: {
  //#############################################################################
    addBook: async (root, args, context) => {
        const book = new Book({...args})

        if(!context.currentUser) throw new AuthenticationError("not authenticated")

        console.log(context.currentUser)
        const authors = await Author.find({})
        //Add unknown author
        if(!authors.map(a => a.name).includes(args.author)) {
          const author = new Author({name: args.author})

          try {
            await author.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
          
          book.author = author._id
        }else{
          book.author = authors.find(a => a.name === args.author)._id
        }

        try {
          await book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

        return Book.findOne({title: book.title}).populate('author')
    },
    //#############################################################################
    editAuthor: async (root, args, context) => {

        const author = await Author.findOne({name: args.name})

        if(!context.currentUser) throw new AuthenticationError("not authenticated")

        if(!author) return null

        author.born = args.setBornTo

        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
       
        return author
    },
    //#############################################################################
    createUser: (root, args) => {

      const user = new User({username: args.username, favoriteGenre: args.favoriteGenre})

      return user.save().catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    //#############################################################################
    login: async (root, args) => {

      const usercandidate = await User.findOne({username: args.username})

      if(!usercandidate || args.password !== 'test') {
        throw new UserInputError("wrong credentials")
      }
    
      const tokenuser = {username: usercandidate.username, id: usercandidate._id}

      return {value: jwt.sign(tokenuser, SECRET)}
    },
    //#############################################################################


  },

  Author: {
      bookCount: async (root) => {
       const books = await Book.find({}).populate('author')
       return books.filter(b => b.author.name === root.name).length
  }
}
}



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), SECRET
      )
      
      const currentUser = await User
        .findById(decodedToken.id)

      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})