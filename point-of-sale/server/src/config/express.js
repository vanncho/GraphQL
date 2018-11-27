const cors = require('cors');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const jwt = require('jsonwebtoken');

const SECRET = 'somegf745supe235rd2534yghfupersecret';
const Token = require('../models/token');


const addUser = async (req) => {

    try {
        const tokenHeader = req.headers.authorization;

        if (tokenHeader !== 'null') {

            const tokenDB = await Token.findOne({ token: tokenHeader });
            let { user } = await jwt.verify(tokenHeader, SECRET);

            if (tokenDB) {
                user = null;
            }

            req.user = user;
        }

    } catch (err) {
        console.log('ERROR: ' + err.message);
    }

    req.next();
};


module.exports = (app, config) => {

    app.use(cors());
    app.use(addUser);

    app.use('/api', bodyParser.json(), graphqlHTTP(req => ({
        schema,
        graphiql: true,
        context: {
            SECRET,
            user: req.user
        }
    })));

    app.listen(config.port, () => {

        console.log('Server started at port: ' + config.port);
    });
};
