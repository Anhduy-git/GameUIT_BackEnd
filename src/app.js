const express = require('express');
const cors = require('cors');
const Emitter = require('events');
const routes = require('./api/routes');
const { errorHandlerMiddleware } = require('./api/middlewares');
const { NotFoundError } = require('./utils/errors');

const API_PREFIX = '/api';

const app = express();

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(
	express.urlencoded({
		extended: true
	})
);
// CORS
app.use(cors());

// Event emitter
const eventEmitter = new Emitter();
app.set('eventEmitter', eventEmitter);

// Routes
app.use(API_PREFIX, routes());

// No route is found
app.use((req, res, next) => {
	throw new NotFoundError('URL not found!');
});

// Common Error Handler
app.use(errorHandlerMiddleware);

module.exports = app;
