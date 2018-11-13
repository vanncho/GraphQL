const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://vancho:test123@ds113936.mlab.com:13936/gql-playlist', { useNewUrlParser: true });
mongoose.connection.once('open', () => {

    console.log('Connected to DB!');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {

    console.log('Server started at port 4000.');
});