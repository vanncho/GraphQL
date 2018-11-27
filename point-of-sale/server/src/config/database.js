const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const options = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000,
    useCreateIndex: true,
    useNewUrlParser: true
};

module.exports = config => {

    mongoose.connect(config.dbPath, options);
    mongoose.connection.once('open', () => {

        console.log('Connected to MongoDB!');
    });
};