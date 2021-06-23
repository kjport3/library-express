const startupDebugger = require('debug')('app:startup');
const databaseDebugger = require('debug')('app:db');
const Joi = require("joi");
const logger = require('./middleware/logger');
const books = require('./routes/books');
const home = require('./routes/home');
const config = require('config');
const express = require("express");
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'));
app.use(helmet());
app.use('/api/books', books);
app.use('/', home);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  startupDebugger('Morgan enabled...');
}

// Database work...
databaseDebugger('Connected to the database...');

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

app.use(logger);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port ${port}`));
