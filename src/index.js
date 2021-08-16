const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const fs = require('fs');

var todoList = [];
fs.readFile('./src/data.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let parsedData = JSON.parse(data);
  todoList = parsedData;
});

// Locally adds todo and writes todo into JSON file
function addWriteTodo(todo) {
  todoList.list.push(todo);
  writeTodo();
}

function deleteTodoHelper(id) {
  todoList.list = todoList.list.filter(todo => todo.id !== id);
  writeTodo();
}

function writeTodo() {
  fs.writeFile('./src/data.json', JSON.stringify(todoList), err => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

const resolvers = {
  Query: {
    getTodoList: () => todoList.list
  },
  Mutation: {
    addTodo: (_, { todo }) => {
      addWriteTodo(todo);
      return todo;
    },
    deleteTodo: (_, { id }) => {
      deleteTodoHelper(id);
      return id;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});