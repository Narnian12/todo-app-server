const { gql } = require('apollo-server');

const typeDefs = gql`
  type Todo {
    id: String!,
    name: String!,
    info: String
  }

  input TodoInput {
    id: String!,
    name: String!,
    info: String
  }

  type Query {
    getTodoList: [Todo]
  }

  type Mutation {
    addTodo(todo: TodoInput): Todo
    deleteTodo(id: String): String
  }
`;

module.exports = typeDefs;