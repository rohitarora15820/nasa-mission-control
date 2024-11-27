const express=require('express');
const planetsRouter=require('../router/planets/planets.router');
const launcheRouter=require('../router/launches/launch_router');


const api=express.Router();

api.use('/planets',planetsRouter);
api.use('/launches',launcheRouter);

module.exports = api;