const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const routes = require('./routes');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3002;
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
});