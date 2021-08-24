import { ApolloServer } from 'apollo-server-express';
import { schema } from './schema';
const express = require('express');
import * as http from 'http';
import { GraphQLSchema } from 'graphql';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core/dist/plugin/drainHttpServer';

async function startApolloServer(schema: GraphQLSchema) {
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    });

    await server.start();
    server.applyMiddleware({
        app,
        path: '/'
    });
    await new Promise(resolve => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
}

startApolloServer(schema);