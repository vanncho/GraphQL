const express = require('express');
const env = process.env.NODE_ENV || 'development';

const config = require('./src/config/config')[env];
require('./src/config/database')(config);

const app = express();
require('./src/config/express')(app, config);