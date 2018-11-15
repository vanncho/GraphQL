const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/schema/schema');
const cors = require('cors');
const port = 4000;
const mongoose = require('mongoose');
const options = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useNewUrlParser: true
};

const app = express();

app.use(cors());

mongoose.connect('mongodb://localhost:27017/point-of-sale', options);
mongoose.connection.once('open', () => {

    console.log('Connected to MongoDB!');
});

app.use('/api', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, () =>{

    console.log('Server started at port: ' + port);
});