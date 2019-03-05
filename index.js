const express = require('express')
const {  ApolloServer, gql } = require('apollo-server-express')
const { books, authors } = require('./lib/data')

// The GraphQL schema in string form
const typeDefs = gql`

  type Query { 
    books: [Book]
    book(id: Int): Book
  }
  
  type Book {
    title: String!
    author: Author!
  }
  
  type Author {
    name: String!
  }

`

// The resolvers
const resolvers = {

    Query: {
      books: () => {
        return Object.values(books)
      },
      book: (root, { id }) => {
        return books[id]
      }
  },

  Book: {
    author: (book) => {
      return authors[book.author]
    }
  }

}

// Initialize the app
const app = express()

const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Go to http://localhost:3000${server.graphqlPath} to run queries!`)
})