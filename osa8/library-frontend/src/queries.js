import { gql} from '@apollo/client'

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author{name}
      published
      genres
      }
  }
`
export const ALL_GENRES = gql`
query {
  allBooks  {
    genres
  }
}
`

export const GENRE_BOOKS = gql`
query genreBooks($genre: String!){
  allBooks(genre: $genre)  {
    title
    author{name}
    published
    genres
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks{
    title
    author{name}
    published
    genres
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
    name
    born
    bookCount
  }
}
`

export const UPDATE_YEAR = gql`
  mutation updateYear($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ){
      name
      born
      }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password){
      value
    }

  }
`

export const CURRENT_USER = gql`
  query{
    me{
      username
      favoriteGenre
      }
  }
`

export const BOOK_ADDED = gql`
  subscription{
    bookAdded{
      title
      author{name}
      published
      genres
      }
  }
`