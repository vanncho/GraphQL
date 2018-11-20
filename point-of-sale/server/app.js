const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/schema/schema');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const PORT = 4000;
const options = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useCreateIndex: true,
    useNewUrlParser: true
};
const SECRET = 'somegf745supe235rd2534yghfupersecret';

const app = express();

const addUser = async (req) => {

    try {
        const token = req.headers.authorization;

        if (token !== 'null') {
            const { user } = await jwt.verify(token, SECRET);
            req.user = user;
        }

    } catch (err) {
        console.log('ERROR: ' + err.message);
    }

    req.next();
};

// cors
app.use(cors());

app.use(addUser);

// MongoDB
mongoose.connect('mongodb://localhost:27017/point-of-sale', options);
mongoose.connection.once('open', () => {

    console.log('Connected to MongoDB!');
});

// GraphQL
app.use('/api', bodyParser.json(), graphqlHTTP(req => ({
    schema,
    graphiql: true,
    context: {
        SECRET,
        user: req.user
    }
})));

app.listen(PORT, () => {

    console.log('Server started at port: ' + PORT);
});