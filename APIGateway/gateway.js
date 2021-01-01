const express = require('express');
const helmet = require('helmet');
const jwtAuth  = require('./helpers/JWTHelper')
const cookieParser = require("cookie-parser");
//Define your routes in a new file for each use
const routes = require('./routes');
const authRoutes = require('./routes/auth');
const DomainAuth = require('./helpers/DomainBindingHelper');
const bodyParser = require('body-parser');



const app = express(); 
app.use(helmet());
app.use(cookieParser());
app.use(DomainAuth);

console.log(global.channel);
app.use(bodyParser.urlencoded({ extended: true })); 
//Add The JWT Auth
app.use(jwtAuth);
//Add Error Handling
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(403).send('Invalid Credentials Please Login');
    }
  });
//Then Add the routes to the gateway here
app.use('/', routes);
app.use('/', authRoutes);

//when running locally
app.listen(3001, () => console.log(`Listening on: 3001`));
//When deploying serverless 
//module.exports.handler = serverless(app);