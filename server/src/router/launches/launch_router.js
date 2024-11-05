const express=require('express');
const {
httpGetAllLaunches,
httpAddNewLaunches,
httpAbortLaunch

}=require('./launch.controller');
const launchRouter=express.Router();

launchRouter.get('/',httpGetAllLaunches);
launchRouter.post('/',httpAddNewLaunches);
launchRouter.delete('/:id',httpAbortLaunch);



module.exports=launchRouter;