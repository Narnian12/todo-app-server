import { makeExecutableSchema } from '@graphql-tools/schema';
import { Context, context } from './context';
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
    deleteTodo(id: String): Todo
  }
`;

const resolvers = {
  Query: {
    getTodoList: () => context.prisma.todo.findMany()
  },
  Mutation: {
    addTodo: (_: any, args: { todo: TodoInput }, context: Context) => {
      return context.prisma.todo.create({ data: { id: args.todo.id, name: args.todo.name, info: args.todo.info }});
    },
    deleteTodo: (_: any, args: { id: string }) => context.prisma.todo.delete({ where: { id: args.id }})
  }
};

interface TodoInput {
  id: string,
  name: string,
  info: string
}

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs
})