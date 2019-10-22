import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { DroneResolver } from "./drone-resolver";

const port = 3000

console.log('Connecting to database')
createConnection().then(async connection => {

	console.log('Building schemas')
	const gqlschema = await buildSchema({ resolvers: [DroneResolver] });

	console.log('Creating express app')
	const app = express();
	app.use('*', cors());

	console.log('Initializing server')
	const server = new ApolloServer({ schema: gqlschema });
	server.applyMiddleware({ app, path: '/graphql' });

	console.log('Starting http server')
	const httpServer = createServer(app);
	httpServer.listen({ port: port })

}).catch((error: any) => {
	console.error(error)
})
