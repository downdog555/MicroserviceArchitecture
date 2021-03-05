# MicroserviceArchitecture
This project is a baseline for a microservice architecture using nodejs and rabbitmq as well as mongodb

The general concept is of a multitenented intranet type system.
The current setup allows for a db connection string to be specified on a per domain basis, allow for potential clients to host their own db's etc.

this project current consists of two main services as well as a blank starting point for others to come.


The APIGateway project, is the interface between frontend calls and the larger backend, this provides authentication on each request as well as allowing for the number of calls made from a users perspective to be reduced.
For example, if you were to have a product in a store you might have a  service for the product info and a service for the reviews, you can with this gate allow the client to only make 1 call to recieve data from both services.

The users project contains just one consumer, which allows for a get user request from which ever is the db connection string for the current request.
