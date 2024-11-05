const {
    getAllLaunches,
    addNewLaunches,
    existLaunhWithId,
    abortLaunchById,
}=require('../../models/launches.model');

function httpGetAllLaunches(req,res){
    return res.status(200).json(getAllLaunches());

}

function httpAddNewLaunches(req,res){
    const launch=req.body;

    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target ){
        return res.status(400).json({error: 'Missing required fields'});
    }

    launch.launchDate = new Date(launch.launchDate);

    if(isNaN(launch.launchDate)){
        return res.status(400).json({error: 'Invalid launch date'});
    }

    addNewLaunches(launch);

    return res.status(201).json(launch);
 
}

function httpAbortLaunch(req,res){
    const launchId = Number(req.params.id);
    console.log(launchId);

    if(!existLaunhWithId(launchId)){
        return res.status(404).json({error: 'Launch not found'});
    }

    const aborted=abortLaunchById(launchId);
    return res.status(200).json(aborted);


}

module.exports ={ httpGetAllLaunches,httpAddNewLaunches,httpAbortLaunch}