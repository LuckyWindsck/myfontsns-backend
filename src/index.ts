import Server from './server';

const server = new Server({ port: process.env.PORT });

server.listen();
