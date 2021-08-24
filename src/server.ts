import { ApolloServer } from 'apollo-server-express';
import { schema } from './schema';
import express from 'express';
import http from 'http';
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

// const server = new ApolloServer({ schema, context: context });
// server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });