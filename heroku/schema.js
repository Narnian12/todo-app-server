"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.schema = void 0;
var schema_1 = require("@graphql-tools/schema");
var context_1 = require("./context");
var gql = require('apollo-server').gql;
var typeDefs = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Todo {\n    id: String!,\n    name: String!,\n    info: String,\n    updating: Boolean!\n  }\n\n  input TodoInput {\n    id: String!,\n    name: String!,\n    info: String\n  }\n\n  type Query {\n    getTodoList: [Todo]\n  }\n\n  type Mutation {\n    addTodo(todo: TodoInput): Todo\n    setUpdating(id: String, updating: Boolean): Todo\n    updateTodo(todo: TodoInput): Todo\n    deleteTodo(id: String): Todo\n  }\n"], ["\n  type Todo {\n    id: String!,\n    name: String!,\n    info: String,\n    updating: Boolean!\n  }\n\n  input TodoInput {\n    id: String!,\n    name: String!,\n    info: String\n  }\n\n  type Query {\n    getTodoList: [Todo]\n  }\n\n  type Mutation {\n    addTodo(todo: TodoInput): Todo\n    setUpdating(id: String, updating: Boolean): Todo\n    updateTodo(todo: TodoInput): Todo\n    deleteTodo(id: String): Todo\n  }\n"])));
var resolvers = {
    Query: {
        getTodoList: function () { return context_1.context.prisma.todo.findMany(); }
    },
    Mutation: {
        addTodo: function (_, args, context) {
            return context.prisma.todo.create({ data: { id: args.todo.id, name: args.todo.name, info: args.todo.info, updating: false } });
        },
        setUpdating: function (_, args, context) {
            return context.prisma.todo.update({ where: { id: args.id }, data: { updating: args.updating } });
        },
        updateTodo: function (_, args, context) {
            return context.prisma.todo.update({ where: { id: args.todo.id }, data: { id: args.todo.id, name: args.todo.name, info: args.todo.info, updating: false } });
        },
        deleteTodo: function (_, args) { return context_1.context.prisma.todo["delete"]({ where: { id: args.id } }); }
    }
};
exports.schema = schema_1.makeExecutableSchema({
    resolvers: resolvers,
    typeDefs: typeDefs
});
var templateObject_1;
