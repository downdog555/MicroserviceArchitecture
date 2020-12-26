const express = require('express');
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const jwte = require('express-jwt');
//Define your routes in a new file for each use
const routes = require('./routes');
const authRoutes = require('./routes/auth');

const app = express(); 
app.use(helmet());
//Then Add the routes to the gateway here
app.use('/', routes);
app.use('/', authRoutes);

//when running locally
app.listen(3001, () => console.log(`Listening on: 3001`));
//When deploying serverless 
//module.exports.handler = serverless(app);